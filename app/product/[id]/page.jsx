"use client";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cartSlice"; // Adjust the import path as necessary
import Loader from "../../components/Loader";

// Correct import using named imports
import { from } from "node-vibrant/browser";

export default function Page({ params }) {
  const { id } = params; // Get the dynamic route parameter from params
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [bgColor, setBgColor] = useState("#ffffff");
  const dispatch = useDispatch();
  const imgRef = useRef(null);

  useEffect(() => {
    // Fetch product data
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

  useEffect(() => {
    async function extractColor() {
      if (product && imgRef.current) {
        try {
          // Use the 'from' method after the correct import
          const palette = await from(product.imgSrc).getPalette();
          console.log("Extracted Palette:", palette);

          if (palette.Vibrant) {
            const { r, g, b } = palette.Vibrant.rgb;
            setBgColor(`rgb(${r}, ${g}, ${b})`);
          } else {
            console.warn("No Vibrant color found in the palette.");
          }
        } catch (err) {
          console.error("Error extracting color palette:", err);
        }
      }
    }

    extractColor();
  }, [product]);

  useEffect(() => {
    console.log("Updated Background Color:", bgColor);
  }, [bgColor]);

  if (error) {
    return <p className="text-red-500 text-lg">{error}</p>;
  }

  if (!product) {
    return <Loader />;
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  return (
    <div
      className="flex flex-col items-center p-5 rounded-lg shadow-md"
      style={{ backgroundColor: bgColor }}
    >
      <h1 className="text-2xl font-bold mb-5">{product.name}</h1>
      <img
        ref={imgRef}
        src={product.imgSrc}
        alt={product.name}
        width={500}
        height={500}
        className="rounded-lg mb-5"
        crossOrigin="anonymous"
      />
      <p className="text-lg mb-5 text-center">{product.description}</p>
      <p className="text-xl font-bold mb-5">Price: ${product.price}</p>
      <button
        className="bg-blue-500 text-white border-none py-2 px-4 rounded-md cursor-pointer m-2 transition-colors duration-300 hover:bg-blue-700"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
      <button className="bg-blue-500 text-white border-none py-2 px-4 rounded-md cursor-pointer m-2 transition-colors duration-300 hover:bg-blue-700">
        Pay
      </button>
    </div>
  );
}
