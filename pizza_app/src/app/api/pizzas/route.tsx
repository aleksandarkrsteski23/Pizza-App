import { NextResponse } from "next/server";
import connect from "../../../../lib/db";
import Pizza from "../../../../lib/modals/pizzas";

export const GET = async () => {
  try {
    await connect();
    const pizzas = await Pizza.find();
    return new NextResponse(JSON.stringify(pizzas), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error in fetching users: " + error.message, {
      status: 500,
    });
  }
};
