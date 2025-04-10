import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const { messages } = body

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'nvidia/llama-3.1-nemotron-nano-8b-v1:free',
      messages,
    }),
  })

  const data = await res.json()
  return NextResponse.json(data)
}
