
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import nodemailer from 'nodemailer'; 
import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest,NextResponse } from "../../../../node_modules/next/server";


export async function POST(req: NextRequest) {

  await connect();

  try {
  
    const reqBody = await req.json();
    const { email, password } = reqBody;

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }


    const hashedPassword = await bcrypt.hash(password, 12);

   
    const verification = crypto.randomBytes(32).toString('hex');
    console.log("veri user",verification)

    const user = await User.create({
      verification,
      email,
      password: hashedPassword,
     
    });
    const savedUser =await user.save()
    console.log("saver user",savedUser);
  
 
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Confirm your email',
      text: `Please confirm your email by clicking the following link: ${process.env.NEXT_PUBLIC_APP_URL}/verify-email/${verification}`,
    };

    const mailresponse =await transporter.sendMail(mailOptions);
    console.log(mailresponse)
    return NextResponse.json({
      message: 'Signup successful! Check your email for verification.',
    }, { status: 201 });
  } catch (error: unknown) {
    console.error('Error during signup:', error);
    
    // Use type assertion to handle the error
    const errorMessage = (error as Error).message || 'Unknown error occurred';
  
    return NextResponse.json({ message: 'Server error', error: errorMessage }, { status: 500 });
  }
}
