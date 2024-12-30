"use client"
import Popup from "@/app/components/admin/Popup";
import ProductRow from "@/app/components/admin/ProductRow";
import { setLoading } from "@/app/redux/features/loadingSlice";
import { useAppDispatch } from "@/app/redux/hooks";
import axios from "axios";
import React, { useEffect, useState } from "react";

export interface IProduct{
  _id:string;
  imgSrc:string;
  fileKey:string;
  name:string;
  price:string;
  category:string;
}

const Dashboard = () => {
  const [products,setProducts]=useState([]);
  const [openPopup,setOpenPopup]=useState(false);
  const [updateTable,setUpdateTable]=useState(false);

  const dispatch = useAppDispatch()

  useEffect(()=>{
    dispatch(setLoading(true))
    axios.get("/api/get_products").then((res)=>setProducts(res.data)).catch((err)=>console.log(err)).finally(()=>dispatch(setLoading(false)))
  },[updateTable])


  return <div className="bg-gray-100 w-full h-[calc(100vh)] rounded-lg p-4">
    <h2 className="font-bold text-3xl">All Products</h2>
    <div className="mt-4 h-[calc(100vh-180px)] overflow-y-auto">
      <table className="w-full">
        <thead>
          <tr className="text-gray-500 border-t border-[#ececec]">
            <th>SR NO.</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>PICTURE</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product:IProduct,index)=>(
            <ProductRow key={product._id} srNo={index+1} setOpenPopup={setOpenPopup} setUpdateTable={setUpdateTable} product={product}/>
          ))}
        </tbody>
      </table>
    </div>
    {openPopup && (<Popup setOpenPopup={setOpenPopup} setUpdateTable={setUpdateTable}/>)}
  </div>
};

export default Dashboard;
