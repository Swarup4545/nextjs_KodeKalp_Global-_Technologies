import { NextRequest,NextResponse } from '../../../../node_modules/next/server';  
import User from '@/models/userModel';
import { connect } from '@/dbConfig/dbConfig' // Connect to MongoDB
import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken'; 


connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

   
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials', success: false }, { status: 400 });
    }

   
    if (!user.verified) {
      return NextResponse.json({ message: 'Please verify your email first', success: false }, { status: 400 });
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid credentials', success: false }, { status: 400 });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });


    return NextResponse.json({ token, message: 'Login successful', success: true }, { status: 200 });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ message: 'Server error', success: false }, { status: 500 });
  }
}
