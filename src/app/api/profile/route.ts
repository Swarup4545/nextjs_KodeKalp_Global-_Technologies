import crypto from 'crypto';
import { connect } from '@/dbConfig/dbConfig';
import Resume from '@/models/resumeModel';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    await connect();

    try {
        const reqBody = await req.json();
        const { email, experience, education, portfolio, linkedin, github, projects, name, address, skills } = reqBody;

        const verification = crypto.randomBytes(32).toString('hex');
        console.log("veri user", verification);

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

        const savedUser = await user.save();
        console.log("saver user", savedUser);

        return NextResponse.json({
            message: 'User details', data: savedUser
        }, { status: 201 });
    } catch (error) {
        console.error('Error during signup:', error);

        
        const errorMessage = (error as { message?: string }).message || 'Server error';
        
        return NextResponse.json({ message: errorMessage }, { status: 500 });
    }
}
