"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cartSlice"; // Adjust the import path as necessary
import Loader from "../../components/Loader";
import Image from "next/image";

export default function Page({ params }) {
  const { id } = params;
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`/api/get_product/${id}`);
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        if (!data || !data.name || !data.imgSrc || !data.price) {
          console.error("Incomplete product data:", data);
          throw new Error("Incomplete product data");
        }
        setProduct(data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchProduct();
  }, [id]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-2xl font-bold text-red-500">Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!product) {
    return <Loader />;
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  return (
    <div className="flex flex-col md:flex-row items-center max-w-5xl mx-auto p-5 gap-8 mt-10 bg-white shadow-lg rounded-lg">
      {/* Product Image */}
      <div className="w-full md:w-1/2">
        <Image
          src={product.imgSrc}
          alt={product.name}
          width={500}
          height={500}
          className="rounded-lg shadow-md object-cover"
          crossOrigin="anonymous"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col w-full md:w-1/2 gap-6">
        <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
        <p className="text-lg text-gray-600">
          {product.description ||
            "This is a placeholder description. Add your product details here."}
        </p>
        <p className="text-2xl font-bold text-gray-900">
          Price: ${product.price}
        </p>

        <div className="flex gap-4">
          <button
            className="bg-blue-500 text-white py-2 px-6 rounded-lg transition-all hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          <button className="bg-green-500 text-white py-2 px-6 rounded-lg transition-all hover:bg-green-600 focus:ring-4 focus:ring-green-300">
            Pay
          </button>
        </div>
      </div>
    </div>
  );
}
