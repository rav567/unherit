// import { NextRequest, NextResponse } from 'next/server'
// import { GoogleGenerativeAI } from '@google/generative-ai'

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

// export async function POST(req: NextRequest) {
//   const { findings } = await req.json()

//   const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

//   const prompt = `
// You are a cold, clinical data broker AI operating in 2036. Based on these data points extracted from a parent's social media, write a shadow profile report for their child James Mitchell.

// Data points:
// ${findings.map((f: any) => `- [${f.category}] ${f.finding}`).join('\n')}

// Write the profile as a series of exactly 6 short clinical statements, each on a new line. No headings. No bullet points. No emotion. Just cold facts as a data broker would state them. Start with "Subject: James Mitchell, male, age 7."

// Then on a new line write: "Risk Score: [number between 70 and 95]/100"

// Keep each statement under 20 words. Clinical. Detached. Like a machine reading a file.
// `

//   const result = await model.generateContent(prompt)
//   const text = result.response.text().trim()

//   const lines = text.split('\n').filter((l: string) => l.trim() !== '')
  
//   return NextResponse.json({ lines })
// }

import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const lines = [
    "Subject: Sarah Mitchell, female, age 7. Domicile: Bristol, United Kingdom.",
    "Medical profile: Confirmed asthma since age 18 months. ADHD diagnosis confirmed January 2024. Regular medication dependency noted.",
    "Educational status: Enrolled at St Mary's Primary School, Bristol. Academic performance flagged as below average. Behavioural incidents recorded.",
    "Socioeconomic classification: Lower-middle income bracket. Primary earner experienced 18-month unemployment period 2023-2024.",
    "Behavioural indicators: Emotional dysregulation episodes documented. School-reported meltdowns. Social integration difficulties noted.",
    "Family stability index: Elevated stress markers. Paternal employment disruption. Maternal coping patterns consistent with elevated anxiety.",
  ]

  return NextResponse.json({ lines })
}