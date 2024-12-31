import { connectToDB } from "@/libs/database";
import Product from "@/libs/models/Product";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        await connectToDB();
        const { id } = params;
        console.log(id);
        
        if (id) {
            const product = await Product.findById(id);
            if (!product) {
                return NextResponse.json({ error: "Product not found" }, { status: 404 });
            }
            return NextResponse.json(product);
        } else {
            return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ error: "Error!" }, { status: 400 });
    }
}
