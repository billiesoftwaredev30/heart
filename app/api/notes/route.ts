import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export interface UserMemoryNote {
  id: string;
  sender: string;
  content: string;
  date: string;
  stamp: string;
  createdAt?: number;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const NOTES_FILE = path.join(DATA_DIR, 'notes.json');

function getNotesFromFile(): UserMemoryNote[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(NOTES_FILE)) {
      const initialNotes: UserMemoryNote[] = [
        {
          id: 'note-init-1',
          sender: 'Billie',
          content: 'Hi my love! I created this little digital sanctuary for us so we can write notes and keep all our memories safe forever. I love you so much, Cora ko! 🌷💖',
          date: 'Sep 19, 2026',
          stamp: '🌷',
          createdAt: 1789776000000,
        },
        {
          id: 'note-init-2',
          sender: 'Cora',
          content: 'Thank you for this sweetest surprise, my Billie! You always know how to make me feel so cherished and loved. Forever and always! ✨🥰',
          date: 'Sep 20, 2026',
          stamp: '💖',
          createdAt: 1789862400000,
        },
      ];
      fs.writeFileSync(NOTES_FILE, JSON.stringify(initialNotes, null, 2), 'utf-8');
      return initialNotes;
    }
    const raw = fs.readFileSync(NOTES_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error reading notes file:', error);
    return [];
  }
}

function saveNotesToFile(notes: UserMemoryNote[]): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const tempFile = `${NOTES_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(notes, null, 2), 'utf-8');
    fs.renameSync(tempFile, NOTES_FILE);
    return true;
  } catch (error) {
    console.error('Error saving notes file:', error);
    return false;
  }
}

export async function GET() {
  const notes = getNotesFromFile();
  return NextResponse.json({ success: true, notes }, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sender, content, stamp } = body;

    if (!sender || !content) {
      return NextResponse.json(
        { success: false, error: 'Sender and content are required' },
        { status: 400 }
      );
    }

    const currentNotes = getNotesFromFile();
    const newNote: UserMemoryNote = {
      id: `note-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      sender: String(sender).trim(),
      content: String(content).trim(),
      stamp: String(stamp || '🌷').trim(),
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      createdAt: Date.now(),
    };

    const updatedNotes = [newNote, ...currentNotes];
    const saved = saveNotesToFile(updatedNotes);

    if (!saved) {
      return NextResponse.json(
        { success: false, error: 'Failed to write to storage' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      note: newNote,
      notes: updatedNotes,
    });
  } catch (error) {
    console.error('Error processing note submission:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
