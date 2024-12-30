"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Heart } from "lucide-react";

const Product = ({ image, title, price }) => {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      className="group relative productCard border rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Image
        src={image}
        alt={title}
        width={250}
        height={250}
        quality={100}
        className="w-full h-auto peer"
      />
      <motion.button
        onClick={() => setLiked(!liked)}
        className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-lg"
        whileTap={{ scale: 0.8 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {liked ? (
          <Heart className="text-red-500 fill-current" />
        ) : (
          <Heart className="text-gray-500" />
        )}
      </motion.button>
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-black/0 to-black/65 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-lg font-bold text-white">{price}</p>
      </div>
    </motion.div>
  );
};

export default Product;
