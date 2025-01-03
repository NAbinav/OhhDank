"use client";
import { setLoading } from "@/app/redux/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { makeToast } from "@/utils/helper";
import axios from "axios";
import { CircleX, Save } from "lucide-react";
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";

interface PropsType {
  setOpenPopup: Dispatch<SetStateAction<boolean>>;
  setUpdateTable: Dispatch<SetStateAction<boolean>>;
}

const Popup = ({ setOpenPopup, setUpdateTable }: PropsType) => {
  const productData = useAppSelector((state) => state.productReducer);
  const dispatch = useAppDispatch();
  const [inputData, setInputData] = useState({
    name: productData.name,
    category: productData.category,
    price: productData.price,
  });
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));
    axios
      .put(`/api/edit_products/${productData._id}`, inputData)
      .then((res) => {
        makeToast("Product Updated Successfully");
        setUpdateTable((prevState) => !prevState);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        dispatch(setLoading(false));
        setOpenPopup(false);
      });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-[#00000070] grid place-items-center transition-all duration-300 ease-in-out">
      <div className="bg-green-100 p-16 rounded-lg text-center relative backdrop-filter backdrop-blur-lg bg-opacity-30 border border-gray-200 transition-all duration-300 ease-in-out">
        <CircleX
          className="absolute text-2xl right-0 top-0 mt-8 mr-6 cursor-pointer hover:text-red-600"
          onClick={() => setOpenPopup(false)}
        />
        <h2 className="font-bold text-2xl">Edit Product</h2>
        <form
          className="flex flex-col mt-8 items-center gap-8"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="border-2 p-4 rounded-lg outline-none bg-green-100 border-gray-300 transition-all duration-300 ease-in-out"
            placeholder="Enter Name"
            value={inputData.name}
            onChange={(e) =>
              setInputData({ ...inputData, name: e.target.value })
            }
          />
          <input
            type="text"
            className="border-2 p-4 rounded-lg outline-none bg-green-100 border-gray-300 transition-all duration-300 ease-in-out"
            placeholder="Enter Price"
            value={inputData.price}
            onChange={(e) =>
              setInputData({ ...inputData, price: e.target.value })
            }
          />
          <input
            type="text"
            className="border-2 p-4 rounded-lg outline-none bg-green-100 border-gray-300 transition-all duration-300 ease-in-out"
            placeholder="Enter Category"
            value={inputData.category}
            onChange={(e) =>
              setInputData({ ...inputData, category: e.target.value })
            }
          />
          <button
            type="submit"
            className="p-4 rounded-lg outline-none bg-green-700 text-white flex gap-2 hover:bg-green-600 transition-all duration-300 ease-in-out"
          >
            <Save /> Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Popup;
