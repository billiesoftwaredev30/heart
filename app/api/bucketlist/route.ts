import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { BucketItem, INITIAL_BUCKET_LIST } from '@/lib/bucketListData';

const DATA_DIR = path.join(process.cwd(), 'data');
const BUCKETLIST_FILE = path.join(DATA_DIR, 'bucketlist.json');

function getBucketList(): BucketItem[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(BUCKETLIST_FILE)) {
      fs.writeFileSync(BUCKETLIST_FILE, JSON.stringify(INITIAL_BUCKET_LIST, null, 2), 'utf-8');
      return INITIAL_BUCKET_LIST;
    }
    const raw = fs.readFileSync(BUCKETLIST_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error reading bucketlist file:', error);
    return INITIAL_BUCKET_LIST;
  }
}

function saveBucketList(items: BucketItem[]): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const tempFile = `${BUCKETLIST_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(items, null, 2), 'utf-8');
    fs.renameSync(tempFile, BUCKETLIST_FILE);
    return true;
  } catch (error) {
    console.error('Error saving bucketlist file:', error);
    return false;
  }
}

export async function GET() {
  const items = getBucketList();
  return NextResponse.json({ success: true, items }, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, item, id } = body;
    const current = getBucketList();

    if (action === 'toggle' && id) {
      const updated = current.map((b) => {
        if (b.id === id) {
          const nextCompleted = !b.completed;
          return {
            ...b,
            completed: nextCompleted,
            dateCompleted: nextCompleted
              ? new Date().toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })
              : undefined,
          };
        }
        return b;
      });
      saveBucketList(updated);
      return NextResponse.json({ success: true, items: updated });
    }

    if (action === 'add' && item) {
      const newItem: BucketItem = {
        id: `dream-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        title: String(item.title || '').trim(),
        category: item.category || 'Memories',
        completed: false,
        notes: item.notes ? String(item.notes).trim() : undefined,
      };
      const updated = [...current, newItem];
      saveBucketList(updated);
      return NextResponse.json({ success: true, item: newItem, items: updated });
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error updating bucket list:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
