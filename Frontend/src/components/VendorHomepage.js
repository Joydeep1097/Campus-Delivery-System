// VendorHomepage.js
import React, { useState } from 'react';

const initialCategories = ['Electronics', 'Clothing', 'Books'];
const initialProducts = {
  'Electronics': [
    { id: 1, name: 'Laptop', price: 800, quantity: 10 },
    { id: 2, name: 'Smartphone', price: 400, quantity: 15 },
  ],
  'Clothing': [
    { id: 3, name: 'T-Shirt', price: 20, quantity: 50 },
    { id: 4, name: 'Jeans', price: 40, quantity: 30 },
  ],
  'Books': [
    { id: 5, name: 'React Cookbook', price: 25, quantity: 20 },
    { id: 6, name: 'JavaScript Basics', price: 15, quantity: 40 },
  ],
};

const VendorHomepage = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState(initialCategories[0]);
  const [products, setProducts] = useState(initialProducts);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleProductUpdate = (categoryId, productId, updatedProduct) => {
    const updatedProducts = { ...products };
    updatedProducts[categoryId] = updatedProducts[categoryId].map(product =>
      product.id === productId ? updatedProduct : product
    );
    setProducts(updatedProducts);
  };

  const handleProductDelete = (categoryId, productId) => {
    const updatedProducts = { ...products };
    updatedProducts[categoryId] = updatedProducts[categoryId].filter(product => product.id !== productId);
    setProducts(updatedProducts);
  };

  const handleCategoryCreate = (newCategory) => {
    setCategories([...categories, newCategory]);
    setProducts({ ...products, [newCategory]: [] });
    setSelectedCategory(newCategory);
  };

  return (
    <div>
      <h2>Welcome to Vendor Homepage</h2>
      <div>
        <h3>Categories</h3>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <button onClick={() => handleCategoryCreate(prompt('Enter new category name:'))}>
          Create New Category
        </button>
      </div>

      <div>
        <h3>Products in {selectedCategory}</h3>
        <ul>
          {products[selectedCategory].map(product => (
            <li key={product.id}>
              {product.name} - Price: ${product.price}, Quantity: {product.quantity}
              <button onClick={() => handleProductUpdate(selectedCategory, product.id, {
                ...product,
                price: parseFloat(prompt('Enter new price:')),
                quantity: parseInt(prompt('Enter new quantity:'), 10),
              })}>Update</button>
              <button onClick={() => handleProductDelete(selectedCategory, product.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VendorHomepage;
