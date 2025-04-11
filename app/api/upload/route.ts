import { NextResponse } from 'next/server'
import { storage } from '@/lib/firebase'
import { v4 as uuidv4 } from 'uuid'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    const fileName = `${uuidv4()}-${file.name}`
    const fileRef = storage.bucket().file(fileName)
    
    await fileRef.save(buffer)
    await fileRef.makePublic()
    
    const publicUrl = `https://storage.googleapis.com/${storage.bucket().name}/${fileName}`
    
    return NextResponse.json({ url: publicUrl })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}