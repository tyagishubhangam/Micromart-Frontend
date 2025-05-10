import React, { useEffect, useState } from 'react';
import axios from '../../services/axiosInstance.js';
import "./AddProduct.css";
import { getCategories } from '../../services/CategoryService';

const AddProduct = () => {
  const [product, setProduct] = useState({
    productName: '',
    price: '',
    productDescription: '',
    categoryId:""
  });
  //    TODO: Add Category Name
  const [categories, setCategories] = useState([]);


   useEffect(() => {
         
          const fetchCategories = async () => {
              const categoriesData = await getCategories();
              setCategories(categoriesData);
          };
          
          fetchCategories();
      }, []); // Empty dependency array ensures this runs only once

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    
    setProduct({ ...product, [e.target.name]: e.target.value });

  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    if (!image) {
      setMessage("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));
    formData.append('image', image);
   

    try {
      const response = await axios.post('product/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('Product added successfully!');
      console.log(response.data);
    } catch (error) {
      setMessage('Error adding product');
      console.error(error);
    }
  };

  return (
    <div className='addProduct-page'>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className='data-form'>
      <div className='heading'>Add New Product</div>
      {message && <p>{message}</p>}
        <div className='form-inputs'>
          <label>Name:</label><br />
          <input type="text" name="productName" value={product.name} onChange={handleChange} required />
        </div>

      <div className='form-inputs'>
        <label>Category:</label><br />
        <select name="categoryId" value={product.categoryId} onChange={handleChange} required>
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.categoryName}
            </option>
          ))}
  </select>
</div>

        <div className='form-inputs'>
          <label>Price:</label><br />
          <input type="number" name="price" value={product.price} onChange={handleChange} required />
        </div>

        <div className='form-inputs'>
          <label>Description:</label><br />
          <textarea name="productDescription" value={product.description} onChange={handleChange} required />
        </div>

        <div className='form-inputs'>
          <label>Product Image:</label><br />
          <input type="file" accept="image/*" onChange={handleImageChange} className='file-input' required  />
        </div>

        <button type="submit">Add Product</button>
      </form>
        
      
    </div>
  );
};

export default AddProduct;
