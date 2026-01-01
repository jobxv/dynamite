"use client";
import {
  getProductDetails,
  getProductReviews,
  getSellerDetails,
} from "@/app/api";
import ImagesGallery from "@/components/listing/ImagesView";
import ReviewsSection from "@/components/listing/ReviewsSection";
import SideDetails from "@/components/listing/SideDetails";
import { Product, Review, SellerInfo } from "@/data/types";
import { notFound, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const params = useParams();
  const productId = Number(params.id);
  if (!productId) {
    return notFound();
  }
  const [product, setProduct] = useState<Product>();
  const [reviews, setReviews] = useState<Review[]>();
  const [sellerInfo, setSellerInfo] = useState<SellerInfo>();
  const [productLoading, setProductLoading] = useState(true);
  const [sellerLoading, setSellerLoading] = useState(true);

  useEffect(() => {
    setProductLoading(true);
    const fetchProduct = async () => {
      const result = await getProductDetails(productId);
      // console.log(result);
      if (result.success) {
        setProduct(result.data);
      }
      setProductLoading(false);
    };
    fetchProduct();
  }, []);

  useEffect(() => {
    const fetchProductReviews = async () => {
      const result = await getProductReviews(productId);
      // console.log("product reviews for id", productId, result);
      if (result.success) {
        setReviews(result.data);
      }
    };
    fetchProductReviews();
  }, []);

  useEffect(() => {
    setSellerLoading(true);
    const fetchSellerInfo = async () => {
      if (!product) return;
      const result = await getSellerDetails(product.seller_id);
      // console.log(result);
      if (result.success) {
        setSellerInfo(result.data);
      }
      setSellerLoading(false);
    };
    fetchSellerInfo();
  }, [product]);

  if (!product && !productLoading) {
    return notFound();
  }

  return (
    <div className="min-h-fit p-4 md:p-8 max-w-[1360px] mx-auto flex gap-10 flex-col">
      <div className="flex w-full gap-10 flex-col md:flex-row">
        <span className="md:w-2/3 flex flex-col">
          <ImagesGallery data={product} loading={productLoading} />
          <span className="md:flex hidden justify-start w-full ">
            <ReviewsSection reviews={reviews} sellerInfo={sellerInfo} />
          </span>
        </span>

        {sellerLoading && (
          <div className="flex items-center justify-center h-screen">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {sellerInfo && product && (
          <span className="md:w-1/3">
            <SideDetails product={product} sellerInfo={sellerInfo} />
          </span>
        )}
      </div>
      <span className="md:hidden flex justify-start md:max-w-2/3 w-full">
        <ReviewsSection reviews={reviews} sellerInfo={sellerInfo} />
      </span>
    </div>
  );
};

export default page;
