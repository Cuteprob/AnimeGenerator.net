import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { useAuth } from "@clerk/nextjs";
export async function POST(req: Request) {
  const { userId } = useAuth();
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { priceId } = await req.json();

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?canceled=true`,
      metadata: {
        userId,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}