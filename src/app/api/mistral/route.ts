import MistralClient from '@mistralai/mistralai';
import { NextRequest, NextResponse } from 'next/server';

const apiKey = process.env.MISTRAL_API_KEY;

if (!apiKey) {
  throw new Error('MISTRAL_API_KEY is not defined in environment variables.');
}

const client = new MistralClient(apiKey);

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400 });
    }

    const chatResponse = await client.chat({
      model: 'mistral-small-latest',
      messages: messages,
    });

    return NextResponse.json(chatResponse.choices[0].message);
  } catch (error) {
    console.error('Mistral API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
