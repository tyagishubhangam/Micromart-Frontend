import React, { useEffect, useState } from 'react';
import axios from '../../services/axiosInstance.js';
import './AddProduct.css';
import { getCategories } from '../../services/CategoryService';

const AddProduct = () => {
  const [product, setProduct] = useState({
    productName: '',
    price: '',
    productDescription: '',
    categoryId: ''
  });

  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setMessage('Please select an image.');
      setMessageType('error');
      return;
    }

    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));
    formData.append('image', image);

    try {
      setLoading(true);
      const response = await axios.post('product/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage('Product added successfully!');
      setMessageType('success');

      // Reset form
      setProduct({
        productName: '',
        price: '',
        productDescription: '',
        categoryId: ''
      });
      setImage(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error(error);
      setMessage('Error adding product');
      setMessageType('error');
    } finally {
      setLoading(false);
      // Auto-dismiss message after 2 seconds
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 2000);
    }
  };

  return (
    <div className='addProduct-page'>
      <form onSubmit={handleSubmit} encType='multipart/form-data' className='data-form'>
        <div className='heading'>Add New Product</div>

        {message && (
          <div className={`message-banner ${messageType}`}>
            {message}
          </div>
        )}

        <div className='form-inputs'>
          <label>Name:</label>
          <input
            type='text'
            name='productName'
            value={product.productName}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-inputs'>
          <label>Category:</label>
          <select
            name='categoryId'
            value={product.categoryId}
            onChange={handleChange}
            required
            className='styled-select'
          >
            <option value=''>Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.categoryName}
              </option>
            ))}
          </select>
        </div>

        <div className='form-inputs'>
          <label>Price:</label>
          <input
            type='number'
            name='price'
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-inputs'>
          <label>Description:</label>
          <textarea
            name='productDescription'
            value={product.productDescription}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-inputs'>
          <label>Product Image:</label>
          <input
            type='file'
            accept='image/*'
            onChange={handleImageChange}
            className='file-input'
            required
          />
        </div>

        {previewUrl && (
          <div className='image-preview'>
            <img src={previewUrl} alt='Preview' />
          </div>
        )}

        <button type='submit' disabled={loading} style={{ cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
