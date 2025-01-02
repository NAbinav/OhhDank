"use client";
import { setLoading } from "@/app/redux/features/loadingSlice";
import { useAppDispatch } from "@/app/redux/hooks";
import { makeToast } from "@/utils/helper";
import { UploadButton } from "@/utils/uploadthing";
import axios from "axios";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import styles from "./ProductForm.module.css"; // Import CSS module

interface IPayload {
  imgSrc: null | string;
  fileKey: null | string;
  name: string;
  category: string;
  price: string;
  description: string;
}

const ProductForm = () => {
  const [payload, setPayload] = useState<IPayload>({
    imgSrc: null,
    fileKey: null,
    name: "",
    category: "",
    price: "",
    description: "",
  });

  const dispatch = useAppDispatch();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));
    axios
      .post("/api/add_product", payload)
      .then((res) => {
        makeToast(res.data.msg);
        setPayload({
          imgSrc: null,
          fileKey: null,
          name: "",
          category: "",
          price: "",
          description: "",
        });
      })
      .catch((error) => console.log(error))
      .then(() => {
        dispatch(setLoading(false));
      });
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Add Product</h2>
        <Image
          className={styles.image}
          src={payload.imgSrc ? payload.imgSrc : "/imgplace.png"}
          alt="Placeholder"
          height={1000}
          width={1000}
        />
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            console.log("Files: ", res);
            setPayload({
              ...payload,
              imgSrc: res[0]?.url,
              fileKey: res[0]?.key,
            });
            alert("Upload Completed");
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
        <input
          type="text"
          className={styles.input}
          placeholder="Enter Name"
          value={payload.name}
          onChange={(e) => setPayload({ ...payload, name: e.target.value })}
          required
        />
        <input
          className={styles.input}
          type="text"
          placeholder="Enter Category"
          value={payload.category}
          onChange={(e) => setPayload({ ...payload, category: e.target.value })}
          required
        />
        <input
          className={styles.input}
          type="text"
          placeholder="Enter Price"
          value={payload.price}
          onChange={(e) => {
            setPayload({ ...payload, price: e.target.value });
          }}
          required
        />
        <input
          className={styles.input}
          type="text"
          placeholder="Description"
          value={payload.description}
          onChange={(e) =>
            setPayload({ ...payload, description: e.target.value })
          }
          required
        />
        <button type="submit" className={styles.submitButton}>
          <PlusCircle /> Add
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
