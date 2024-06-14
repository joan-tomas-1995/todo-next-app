import mongoose from "mongoose"

export const ConnectDB = async () => {
  await mongoose.connect('mongodb+srv://joantomasmiralles:t2mKZMI5KRAXUGUS@cluster0.mb5yk2b.mongodb.net/todo-next-app');
  console.log("DB CONNECTED");
}