import { connectToDB } from "@/libs/database";
import Product from "@/libs/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try{
        const body=await request.json();
        const {imgSrc,fileKey,name,category,price,description}=body;
        await connectToDB();
        const data= await Product.create({
            imgSrc,
            fileKey,
            name,
            category,
            price,
            description,
        })
        return NextResponse.json({msg:"Product added successfully",data});
    }catch(error){
        return NextResponse.json({error,msg:"Something went Wrong"},{status:400})
    }
}