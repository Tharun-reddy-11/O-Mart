import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const productSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  price: z.number().positive(),
  stock: z.number().int().nonnegative(),
  category: z.string().min(3),
  images: z.array(z.string().url())
})

export async function GET() {
  try {
    const products = await prisma.product.findMany()
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const validation = productSchema.safeParse(body)
    
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors },
        { status: 400 }
      )
    }

    const product = await prisma.product.create({
      data: validation.data
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}