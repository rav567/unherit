import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { text } = await req.json()

  const response = await fetch(
    'https://api.elevenlabs.io/v1/text-to-speech/pNInz6obpgDQGcFmaJgB',
    {
      method: 'POST',
      headers: {
        'xi-api-key': process.env.ELEVENLABS_API_KEY!,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_turbo_v2_5',
        voice_settings: {
          stability: 0.9,
          similarity_boost: 0.5,
        },
      }),
    }
  )

  if (!response.ok) {
    const error = await response.text()
    console.error('ElevenLabs error:', error)
    return NextResponse.json({ error }, { status: 500 })
  }

  const audioBuffer = await response.arrayBuffer()
  
  return new NextResponse(audioBuffer, {
    headers: {
      'Content-Type': 'audio/mpeg',
    },
  })
}