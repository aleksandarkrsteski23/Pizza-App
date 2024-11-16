import User from "../../../../lib/modals/users";
import connect from "../../../../lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import validator from "validator";

export const POST = async (request: any) => {
  try {
    const { email, username, password } = await request.json();

    if (!validator.isEmail(email)) {
      return new NextResponse("Invalid email format", { status: 400 });
    }
    if (!password || password.length < 6) {
      return new NextResponse("Password must be at least 6 characters long", {
        status: 400,
      });
    }

    await connect();

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return new NextResponse("Email is already in use", { status: 400 });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return new NextResponse("Username already exists", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    return new NextResponse("User is registered", { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
