import { NextResponse } from 'next/server';
import { ConnectDB } from '@/lib/config/db';
import TodoModel from '@/lib/models/TodoModel';

const LoadDB = async () => {
  await ConnectDB();
};

LoadDB();

export async function PUT(request) {
  console.log('Undo Completed PUT handler hit');
  const mongoId = request.nextUrl.searchParams.get('mongoId');
  await TodoModel.findByIdAndUpdate(mongoId, {
    $set: {
      isCompleted: false,
    },
  });

  return NextResponse.json({ msg: 'Todo completion undone' });
}
