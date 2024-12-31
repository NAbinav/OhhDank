import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
const ProductCard = ({ product }) => {
  return (
    <div className="group flex flex-col items-center hover:shadow-xl p-4 m-4 w-max rounded-lg hover:scale-105 transition-transform">
      <Image
        src={product.imgSrc}
        width={200}
        height={500}
        className="group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all"
      ></Image>
      <div className="flex flex-col items-center">
        <p>{product.name}</p>
        <p>{product.price}</p>
        <motion.button
          className="bg-blue-400 w-24 hover:bg-blue-600 transition-all rounded-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.5 }}
        >
          <a href={"/product/" + product._id}>BUY</a>
        </motion.button>
      </div>
    </div>
  );
};

export default ProductCard;
