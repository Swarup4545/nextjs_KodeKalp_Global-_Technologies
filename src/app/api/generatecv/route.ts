import { connect } from '@/dbConfig/dbConfig';
import Resume from '@/models/resumeModel';
import { NextRequest, NextResponse } from '../../../../node_modules/next/server';

export async function GET(req: NextRequest) {
  await connect();
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  try {
    const user = await Resume.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ user }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Safely access error.message only if it's an instance of Error
      return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
    } else {
      // Fallback for other types of errors
      return NextResponse.json({ message: 'Unknown server error' }, { status: 500 });
    }
  }
}
