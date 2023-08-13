import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { IProduct } from '../../types/product';
import { Button, Form, Input } from 'antd';
import { getOneProduct } from '../../api/product';
interface IProps {
  onUpdate: (product: IProduct) => void;
}

const UpdateProductPage = (props: IProps) => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [form] = Form.useForm();

  useEffect(() => {
    getOneProduct(id!).then(({ data }) => {
      form.setFieldsValue({
        id: data?.id,
        name: data?.name,
        price: data?.price,
      });
    });
  }, []);

  const onFinish = (values: any) => {
    props.onUpdate(values);
    navigate('/admin/products');
  };

  return (
    <div>
      <Form form={form} style={{ maxWidth: 600 }} onFinish={onFinish}>
        <Form.Item label='' name='id'>
          <Input type='hidden' />
        </Form.Item>

        <Form.Item
          label='Product Name'
          name='name'
          rules={[
            {
              required: true,
              transform: (value) => value.trim(),
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Product Price'
          name='price'
          rules={[
            {
              required: true,
              transform: (value) => value.trim(),
              message: 'Please input your password!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Update Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateProductPage;
