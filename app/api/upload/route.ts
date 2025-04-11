import { NextResponse } from 'next/server';
import storage from '@/lib/firebase'; // This should be your Firebase Admin storage setup
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Convert the file to a Node.js Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Create a unique file name using uuid
    const fileName = `${uuidv4()}-${file.name}`;
    // Get a reference to the file in the Firebase Storage bucket
    const fileRef = storage.bucket().file(fileName);

    // Save the file buffer into the bucket and make it public
    await fileRef.save(buffer);
    await fileRef.makePublic();

    const publicUrl = `https://storage.googleapis.com/${storage.bucket().name}/${fileName}`;

    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
