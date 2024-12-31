"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Product from "../components/ProductCard";
const page = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("/api/get_products").then((response) => {
      setProducts(response.data);
      console.log(response.data);
    });
  }, []);
  return (
    <div>
      {products.map((product) => {
        return (
          <div>
            <Product key={product._id} product={product} />
          </div>
        );
      })}
    </div>
  );
};

export default page;
