import { styled } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleProductItem } from "../fetchers/featchSingleProductItem";

export function SingleProductPage() {
  const { itemId } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetchSingleProductItem(itemId).then((product) => {
      setProduct(product);
    });
  }, [itemId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="singleProduct">
      <img className="singleItemImg" src={product?.mainImg} alt="singleItem" />
      <h1 className="ProductName">{product?.name}</h1>
      <div className="ProductDescription">{product?.description}</div>
      <div>{product?.price}</div>
    </div>
  );
}
