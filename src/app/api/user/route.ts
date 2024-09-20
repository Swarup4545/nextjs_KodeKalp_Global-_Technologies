import { NextRequest,NextResponse } from '../../../../node_modules/next/server';
import User from '@/models/userModel';
import { connect } from '@/dbConfig/dbConfig'; 

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email} = reqBody;
  
    const users = await User.findOne({email}); 

    if (!users) {
      return NextResponse.json({ message: 'No users found', success: false }, { status: 404 });
    }

    console.log("Users found:", users);


    return NextResponse.json({ message: 'Users retrieved successfully!', success: true, data: users }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ message: 'Failed to retrieve users', success: false }, { status: 500 });
  }
}
