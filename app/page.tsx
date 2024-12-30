"use client";
import React, { useEffect, useRef } from "react";
import Navbar from "@/app/components/Navbar";
import Products from "@/app/components/Products";
import { SessionProvider } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import Im1 from "@/public/IMG_5610.png";
import Im2 from "@/public/IMG_5617.png";
import Im3 from "@/public/IMG_5613.png";
import Im4 from "@/public/all_tee.jpeg";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const images = [Im1, Im2, Im3, Im4];

const Page = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis();
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000);

    const directions = ["left", "right", "top", "bottom"];
    gsap.utils.toArray(".productCard").forEach((card, index) => {
      const direction = directions[index % directions.length];
      const x = direction === "left" ? -100 : direction === "right" ? 100 : 0;
      const y = direction === "top" ? -100 : direction === "bottom" ? 100 : 0;

      gsap.fromTo(
        card,
        { opacity: 0, x, y },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "+=500",
            scrub: true,
          },
          duration: 1,
          stagger: 0.3,
        }
      );
    });

    return () => {
      clearInterval(interval);
      lenis.destroy();
    };
  }, []);
  
  return (
    <div>
        <Navbar />
      <header className="relative flex flex-col items-center gap-10 justify-center w-screen h-screen overflow-hidden">
        <AnimatePresence>
          <motion.div
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={images[currentImage]}
              alt="Slideshow Image"
              layout="fill"
              objectFit="cover"
              quality={100}
              className="absolute inset-0 w-full h-full"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome to OhhDank
          </motion.h1>
          <motion.p
            className="text-base md:text-lg mb-6 text-white"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Your one-stop shop for the latest products
          </motion.p>
          <motion.button
            className="bg-[rgba(60,154,60,0.82)] text-white py-2 px-4 rounded-lg shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Shop Now
          </motion.button>
        </div>
      </header>

      <Products />

      <section className="py-12 bg-gray-100 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Follow Us</h2>
        <div className="flex justify-center gap-8 mb-8">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook className="text-3xl text-blue-600 hover:text-blue-800 transition-colors duration-300" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="text-3xl text-blue-400 hover:text-blue-600 transition-colors duration-300" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="text-3xl text-pink-600 hover:text-pink-800 transition-colors duration-300" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="text-3xl text-blue-700 hover:text-blue-900 transition-colors duration-300" />
          </a>
        </div>
        <p className="text-lg">Contact us at: ohhdank2@gmail.com</p>
        <p className="text-lg">Phone: +91 1234567890</p>
      </section>

      <footer className="bg-green-900 text-white py-4 text-center">
        <p>© 2024 OhhDank! All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Page;
