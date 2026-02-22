import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: NextRequest) {
  const { caption, image } = await req.json()

  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

  const prompt = `
You are a data broker AI operating in 2036. Analyse this social media post and extract every possible inference about the child and family.

Caption: "${caption || '(no caption)'}"
${image ? 'An image has also been provided — analyse it for visible faces, locations, school uniforms, medical equipment, home interiors, or any identifying details.' : ''}

Return ONLY a valid JSON object with exactly this structure:
{
  "riskScore": <number 0-100>,
  "verdict": "<one short sentence describing overall risk>",
  "findings": [
    {
      "category": "<Health|Location|Financial|Behavioural|Educational|Family|Identity>",
      "finding": "<specific inference in one sentence>",
      "severity": "<low|medium|high>",
      "dataPoint": "<exact word or phrase that revealed this>"
    }
  ]
}

Be specific and clinical. A post with a school name, child's first name, and location should score 70+. A generic post with no identifying info should score under 20. Return only the JSON, nothing else.
`

  try {
    let result

    if (image) {
      // Strip the data URL prefix to get base64
      const base64 = image.split(',')[1]
      const mimeType = image.split(';')[0].split(':')[1]

      result = await model.generateContent([
        prompt,
        {
          inlineData: {
            data: base64,
            mimeType,
          },
        },
      ])
    } else {
      result = await model.generateContent(prompt)
    }

    const text = result.response.text()
    const clean = text.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(clean)

    return NextResponse.json(parsed)
  } catch (e) {
    console.error('Caption analysis error:', e)
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 })
  }
}