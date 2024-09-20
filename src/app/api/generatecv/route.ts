import { connect } from '@/dbConfig/dbConfig';
import Resume from '@/models/resumeModel';
import { NextRequest, NextResponse } from '../../../../node_modules/next/server';

export async function GET(req:NextRequest) {
  await connect();
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  try {
    const user = await Resume.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ user }, { status: 200 });
  } catch (error:any) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
