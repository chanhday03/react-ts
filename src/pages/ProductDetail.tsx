import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IProduct } from '../types/product';
import { getOneProduct } from '../api/product';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct>();
  useEffect(() => {
    getOneProduct(id!).then(({ data }) => {
      setProduct(data);
    });
  }, []);
  return (
    <div>
      <h3>{product?.name}</h3>
      <p>{product?.price}</p>
    </div>
  );
};

export default ProductDetailPage;
