import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: NextRequest) {
  const { posts } = await req.json()

  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

  const prompt = `
You are a data broker AI operating in 2036. Analyse these social media posts and extract inferences about the child and family.

Posts:
${posts.map((p: any, i: number) => `[${p.date}] ${p.caption} ${p.imageDescription ? '(Image: ' + p.imageDescription + ')' : ''}`).join('\n')}

Return a JSON array of findings. Each finding must have exactly these fields:
{
  "finding": "one specific inference in one short sentence",
  "category": "one of: Health, Location, Financial, Behavioural, Educational, Family",
  "severity": "one of: low, medium, high",
  "dataPoint": "exact word or phrase that revealed this",
  "date": "the date of the post this came from"
}

Return 8-12 findings total. Return only a valid JSON array, nothing else.
`

  const result = await model.generateContent(prompt)
  const text = result.response.text()
  const clean = text.replace(/```json|```/g, '').trim()
  const findings = JSON.parse(clean)

  return NextResponse.json({ findings })
}