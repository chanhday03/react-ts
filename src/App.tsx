import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  addProduct,
  deleteProduct,
  getAllProduct,
  updateProduct,
} from './api/product';
import {
  HomePage,
  ProductPage,
  ProductDetailPage,
  AddProductPage,
  ProductManagementPage,
  UpdateProductPage,
} from './pages/index';
import { IProduct } from './types/product';

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    getAllProduct().then(({ data }) => setProducts(data));
  }, []);

  const onHandleRemove = (id: number | string) => {
    deleteProduct(id).then(() =>
      getAllProduct().then(({ data }) => setProducts(data))
    );
  };
  const onHandleAdd = (product: IProduct) => {
    addProduct(product).then(() =>
      getAllProduct().then(({ data }) => setProducts(data))
    );
  };
  const onHandleUpdate = (product: IProduct) => {
    updateProduct(product).then(() =>
      getAllProduct().then(({ data }) => setProducts(data))
    );
  };
  return (
    <div className='App'>
      <Routes>
        <Route path='/'>
          <Route index element={<HomePage />} />
          <Route
            path='products'
            element={
              <ProductPage products={products} onRemove={onHandleRemove} />
            }
          />
          <Route path='products/:id' element={<ProductDetailPage />} />
        </Route>
        <Route path='/admin'>
          <Route path='products'>
            <Route
              index
              element={
                <ProductManagementPage
                  products={products}
                  onRemove={onHandleRemove}
                />
              }
            />
            <Route
              path='add'
              element={<AddProductPage onAdd={onHandleAdd} />}
            />
            <Route
              path=':id/update'
              element={<UpdateProductPage onUpdate={onHandleUpdate} />}
            />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
