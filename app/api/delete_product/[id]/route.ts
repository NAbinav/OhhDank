import { connectToDB } from "@/libs/database";
import Product from "@/libs/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, URLParams: any) {
  try {
    const id = URLParams.params.id;
    await connectToDB();
    await Product.findByIdAndDelete(id);
    return NextResponse.json({ msg: "Product Deleted Successfully" });
  } catch (error) {
    return NextResponse.json(
      {
        error,
        msg: "Something went Wrong",
      },
      { status: 400 }
    );
  }
}
