import { IProduct } from "@/app/admin/dashboard/page";
import { setLoading } from "@/app/redux/features/loadingSlice";
import { setProduct } from "@/app/redux/features/productSlice";
import { useAppDispatch } from "@/app/redux/hooks";
import { makeToast } from "@/utils/helper";
import axios from "axios";
import { Edit, IndianRupee, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";

interface PropsType {
  srNo: number;
  setOpenPopup: Dispatch<SetStateAction<boolean>>;
  setUpdateTable: Dispatch<SetStateAction<boolean>>;
  product: IProduct;
}

const ProductRow = ({
  srNo,
  setOpenPopup,
  setUpdateTable,
  product,
}: PropsType) => {
  const dispatch = useAppDispatch();
  const onEdit = () => {
    dispatch(setProduct(product));
    setOpenPopup(true);
  };

  const onDelete = () => {
    dispatch(setLoading(true));
    const payload = {
      fileKey: product.fileKey,
    };
    axios.delete("/api/uploadthing", { data: payload }).then((res) => {
      console.log(res.data);
      axios
        .delete(`/api/delete_product/${product._id}`)
        .then((res) => {
          console.log(res.data);
          makeToast("Product Deleted Successfully");
          setUpdateTable((prevstate) => !prevstate);
        })
        .catch((err) => console.log(err))
        .finally(() => dispatch(setLoading(false)));
    });
  };

  return (
    <tr>
      <td>
        <div>{srNo}</div>
      </td>
      <td>
        <Link href={`/product/${product._id}`}>{product.name}</Link>
      </td>
      <td>
        <div className="flex">
          <IndianRupee />
          {product.price}
        </div>
      </td>
      <td className="py-2">
        <Image
          className="rounded-lg"
          src={product.imgSrc}
          height={250}
          width={250}
          alt={`${product.name} Image`}
        />
      </td>
      <td>
        <div className="text-2xl flex items-center gap-2 text-gray-600">
          <Edit className="cursor-pointer hover:text-black" onClick={onEdit} />
          <Trash2
            className="cursor-pointer hover:text-black"
            onClick={onDelete}
          />
        </div>
      </td>
    </tr>
  );
};

export default ProductRow;
