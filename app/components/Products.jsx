"use client";
import React from "react";
import Product from "./Product";
import Im1 from "@/public/IMG_5610.png";
import Im2 from "@/public/IMG_5617.png";
import Im3 from "@/public/IMG_5613.png";

const products = [
  { image: Im1, title: "Lana Del Rey", price: "₹1,499" },
  { image: Im3, title: "Modern Tee", price: "₹2,299" },
  { image: Im2, title: "BAKI T-Shirt", price: "₹3,099" },
];

const Products = () => {
  return (
    <section className="py-12 bg-gray-100">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Featured Products
      </h2>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <Product
            key={index}
            image={product.image}
            title={product.title}
            price={product.price}
          />
        ))}
      </div>
    </section>
  );
};

export default Products;
