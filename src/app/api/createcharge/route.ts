import { NextResponse, NextRequest } from 'next/server';
import { COMMERCE_API_URL } from 'src/links';

export async function POST(request: NextRequest) {
  try {
    const chargeDetails = await request.json();
    console.log('API Route - Received charge details:', chargeDetails);
    console.log(
      'API Route - Using API key:',
      process.env.COINBASE_COMMERCE_API_KEY
    );

    const res = await fetch(`${COMMERCE_API_URL}/charges`, {
      method: 'POST',
      body: JSON.stringify(chargeDetails),
      headers: {
        'Content-Type': 'application/json',
        'X-CC-Api-Key': process.env.COINBASE_COMMERCE_API_KEY || '',
      },
    });

    const data = await res.json();
    console.log('API Route - Coinbase response:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Route - Error:', error);
    return NextResponse.json(
      { error: 'Failed to create charge' },
      { status: 500 }
    );
  }
}
