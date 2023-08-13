import React, { useEffect, useState } from 'react';
import { IProduct } from '../types/product';
interface IProps {
  // định nghĩa kiểu dữ liệu cho props truyền vào component
  products: IProduct[]; // định nghĩa kiểu dữ liệu cho mảng products
  onRemove: (id: number | string) => void; // định nghĩa kiểu dữ liệu cho hàm onRemove
}

const ProductPage = (props: IProps) => {
  function removeProduct(id: number | string) {
    props.onRemove(id);
  }
  return (
    <div>
      {props.products.map((item) => {
        return (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <button onClick={() => removeProduct(item.id!)}>Remove</button>
          </div>
        );
      })}
    </div>
  );
};

export default ProductPage;
