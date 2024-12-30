import { connectToDB } from "@/libs/database";
import Product from "@/libs/models/Product";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        await connectToDB();
        const data = await Product.find();
        return NextResponse.json(data);
    }catch(error){
        return NextResponse.json({error,msg:"Error!"},{status:400})
    }
}