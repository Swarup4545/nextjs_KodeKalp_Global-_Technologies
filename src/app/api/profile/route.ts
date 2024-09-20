import crypto from 'crypto';
import { connect } from '@/dbConfig/dbConfig';
import Resume from '@/models/resumeModel';
import { NextRequest, NextResponse } from "../../../../node_modules/next/server";

export async function POST(req: NextRequest) {

    await connect();

    try {
      
        const reqBody = await req.json();
      
        const { email, experience, education, portfolio, linkedin, github, projects,name,address,skills } = reqBody;

   
        let verification = crypto.randomBytes(32).toString('hex');
        console.log("veri user", verification)
      
        const user = await Resume.create({
            name,
            address,
            skills,
            email,
            experience,
            education,
            portfolio,
            linkedin,
            github,
            projects,
            resumeGenerated: true,
         
        });
        const savedUser = await user.save()
        console.log("saver user", savedUser);


        return NextResponse.json({
            message: 'user Details', data: savedUser
        }, { status: 201 });
    } catch (error: unknown) {
        console.error('Error during signup:', error);
        return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
    }
}
