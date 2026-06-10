import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, name, googleId, image } = await req.json();

    // Store user info in session/cookie
    const response = NextResponse.json({
      success: true,
      user: { email, name, googleId, image }
    });

    response.cookies.set('auth_token', googleId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 400 }
    );
  }
}
