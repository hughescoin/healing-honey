import { NextResponse, NextRequest } from 'next/server';
import { COMMERCE_API_URL } from 'src/links';

export async function POST(request: NextRequest) {
  try {
    const chargeDetails = await request.json();

    const res = await fetch(`${COMMERCE_API_URL}/charges`, {
      method: 'POST',
      body: JSON.stringify(chargeDetails),
      headers: {
        'Content-Type': 'application/json',
        'X-CC-Api-Key': process.env.COINBASE_COMMERCE_API_KEY || '',
      },
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create charge' },
      { status: 500 }
    );
  }
}
