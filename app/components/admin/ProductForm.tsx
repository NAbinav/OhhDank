"use client"
import { setLoading } from '@/app/redux/features/loadingSlice';
import { useAppDispatch } from '@/app/redux/hooks';
import { makeToast } from '@/utils/helper';
import { UploadButton } from '@/utils/uploadthing';
import axios from 'axios';
import { PlusCircle } from 'lucide-react';
import Image from 'next/image';
import React, { FormEvent, useState } from 'react'

interface IPayload{
    imgSrc: null |string;
    fileKey:null|string;
    name: string;
    category: string;
    price: string;
}

const ProductForm = () => {
    const [payload,setPayload]=useState<IPayload>({
        imgSrc:null,
        fileKey:null,
        name:"",
        category:"",
        price:""
    });
    
    const dispatch = useAppDispatch();
    const handleSubmit=(e:FormEvent)=>{
        e.preventDefault();
        dispatch(setLoading(true));
        axios.post("/api/add_product",payload).then(res=>{
            makeToast("Product added Successfully")
            setPayload({
                imgSrc:null,
                fileKey:null,
                name:"",
                category:"",
                price:""
            })
        }).catch(error=>console.log(error)).then(()=>{
            dispatch(setLoading(false))
        })
    }

  return (
    <div className='bg-white rounded-2xl px-20 py-10 shadow-lg'>
        <form className='flex flex-col items-center gap-4' onSubmit={handleSubmit}>
            <h2 className='font-bold text-2xl'>Add Product</h2>
            <Image className='w-48 bg-gray-200 rounded-lg' src={payload.imgSrc?payload.imgSrc:"/assets/imgplace.png"} alt='Placeholder' height={1000} width={1000}/>
            <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          setPayload({...payload,imgSrc:res[0]?.url,fileKey:res[0]?.key})
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      <input type="text" className="border-2 outline-none border-gray-400 bg-gray-100 p-2 rounded-md" placeholder='Enter Name' value={payload.name} onChange={(e)=>setPayload({...payload,name:e.target.value})} required />
      <input className="border-2 outline-none border-gray-400 bg-gray-100 p-2 rounded-md" type="text" placeholder="Enter Category" value={payload.category} onChange={(e)=>setPayload({...payload,category:e.target.value})} required/>
      <input className="border-2 outline-none border-gray-400 bg-gray-100 p-2 rounded-md" type="text" placeholder='Enter Price' value={payload.price} onChange={(e)=>{setPayload({...payload,price:e.target.value})}} required />
      <button type="submit" className='flex gap-2 bg-black text-white px-6 py-4 rounded-xl hover:bg-gray-500'><PlusCircle/> Add</button>
        </form>
    </div>
  )
}

export default ProductForm