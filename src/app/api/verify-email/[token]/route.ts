import { NextRequest, NextResponse } from '../../../../../node_modules/next/server';
import User from '@/models/userModel';
import { connect } from '@/dbConfig/dbConfig';

connect();

export async function GET(req: NextRequest, { params }: { params: { token: string } }) {
  try {
    const { token } = params;
    const trimmedToken = token.trim(); 
    console.log("Token type:", typeof (trimmedToken), "Token value:", trimmedToken);
    
    const user = await User.findOne({ verification: trimmedToken });
    console.log("User found:", user);

    if (!user) {
      return NextResponse.json({ message: 'User not found or invalid token', success: false }, { status: 404 });
    }

    user.verified = true; 
      const updatedUser = await user.save();
      console.log("User verified successfully:", updatedUser);
      return NextResponse.json({ message: 'Email verified successfully 1!', success: true, user: updatedUser }, { status: 200 });

  } catch (error: any) {
    console.error("Verification failed:", error);
    return NextResponse.json({ message: 'Verification failed', success: false }, { status: 500 });
  }
}