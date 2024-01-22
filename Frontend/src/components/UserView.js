// UserView.js
import React, { useState } from 'react';

const productsData = [
  { id: 1, name: 'Product 1', category: 'Category A', price: 20 },
  { id: 2, name: 'Product 2', category: 'Category B', price: 30 },
  { id: 3, name: 'Product 3', category: 'Category A', price: 25 },
  // Add more product data as needed
];

const categoriesData = ['All', 'Category A', 'Category B'];

const UserView = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('price');

  const filteredProducts = selectedCategory === 'All'
    ? productsData
    : productsData.filter(product => product.category === selectedCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => a[sortBy] - b[sortBy]);

  return (
    <div>
      <h1>Shop Now</h1>
      
      {/* Category Filter */}
      <div>
        <label>Filter by Category:</label>
        <select onChange={(e) => setSelectedCategory(e.target.value)}>
          {categoriesData.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Sorting Options */}
      <div>
        <label>Sort by:</label>
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="price">Price</option>
          {/* Add more sorting options as needed */}
        </select>
      </div>

      {/* Display Products */}
      <div>
        {sortedProducts.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserView;
