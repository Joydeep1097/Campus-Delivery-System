// VendorHomePage.js

import React, { useState } from 'react';
import VendorNavbar from './VendorNavbar';
const VendorHomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategory, setNewCategory] = useState('');
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');

  const handleAddCategory = () => {
    // Implement logic to add a new category to the vendor's shop
    // You can make an API call to add the category to the backend
    console.log('Adding new category:', newCategory);
  };

  const handleAddProduct = () => {
    // Implement logic to add a new product to the selected category
    // You can make an API call to add the product to the backend
    console.log('Adding new product:', newProductName, 'in category:', selectedCategory, 'with price:', newProductPrice);
  };

  const handleUpdateProduct = (productId) => {
    // Implement logic to update product details
    // You can make an API call to update the product details in the backend
    console.log('Updating product:', productId, 'with new details:');
  };
  const vendor= {
    "id": "65b696aad44e0cd76a674228",
    "name": "bhakti",
    "shop": {
        "id": "65b696aad44e0cd76a674226",
        "name": "joyshop",
        "categories": [
            {
                "id": "65b696c953d779fd5a2d8d67",
                "name": "Food Joy",
                "products": [
                    {
                        "id": "65b696c953d779fd5a2d8d6b",
                        "name": "New vadapav bombay",
                        "price": 204.99
                    },
                    {
                        "id": "65b696c953d779fd5a2d8d6d",
                        "name": "Noodles",
                        "price": 20.99
                    },
                    {
                        "id": "65b6a26d15255404964c9df1",
                        "name": "dhokla",
                        "price": 10.99
                    },
                    {
                        "id": "65b757aebcc209bcc6d96ead",
                        "name": "bhujiya",
                        "price": 10000
                    },
                    {
                        "id": "65b758bfbcc209bcc6d96eb2",
                        "name": "No chicken no chicken",
                        "price": 10000
                    },
                    {
                        "id": "65b76434273744223d649cd6",
                        "name": "No chicken no chicken",
                        "price": 10000
                    }
                ]
            },
            {
                "id": "65b69b4c8905369c1b164d70",
                "name": "Gloserry",
                "products": [
                    {
                        "id": "65b69b4c8905369c1b164d72",
                        "name": "hair-oil",
                        "price": 10.99
                    },
                    {
                        "id": "65b69b4c8905369c1b164d74",
                        "name": "shampoo",
                        "price": 15.99
                    },
                    {
                        "id": "65b69b4d8905369c1b164d76",
                        "name": "facewash",
                        "price": 20.99
                    }
                ]
            },
            {
                "id": "65b7560fbcc209bcc6d96e8e",
                "name": "Electronics",
                "products": [
                    {
                        "id": "65b7560fbcc209bcc6d96e90",
                        "name": "Laptop",
                        "price": 799.99
                    },
                    {
                        "id": "65b7560fbcc209bcc6d96e92",
                        "name": "Smartphone",
                        "price": 599.99
                    },
                    {
                        "id": "65b7560fbcc209bcc6d96e94",
                        "name": "Headphones",
                        "price": 89.99
                    }
                ]
            },
            {
                "id": "65b75610bcc209bcc6d96e97",
                "name": "Clothing",
                "products": [
                    {
                        "id": "65b75610bcc209bcc6d96e99",
                        "name": "T-Shirt",
                        "price": 19.99
                    },
                    {
                        "id": "65b75610bcc209bcc6d96e9b",
                        "name": "Jeans",
                        "price": 39.99
                    },
                    {
                        "id": "65b75610bcc209bcc6d96e9d",
                        "name": "Sneakers",
                        "price": 49.99
                    }
                ]
            },
            {
                "id": "65b75610bcc209bcc6d96ea0",
                "name": "Books",
                "products": [
                    {
                        "id": "65b75611bcc209bcc6d96ea2",
                        "name": "Fiction",
                        "price": 12.99
                    },
                    {
                        "id": "65b75611bcc209bcc6d96ea4",
                        "name": "Science",
                        "price": 15.99
                    },
                    {
                        "id": "65b75611bcc209bcc6d96ea6",
                        "name": "History",
                        "price": 18.99
                    }
                ]
            }
        ]
    }
};

  return (
    <div>
      <VendorNavbar name={vendor.name} shop={vendor.shop.name}/>
      <h1>Manage Your Shop</h1>
      <h3>Categories:</h3>
      <select value={selectedCategory}  onChange={(e) => {if(e.target.value!=="Select a Category"){setSelectedCategory(e.target.value)}}}>
        <option value={null}>Select a Category</option>
        {vendor.shop.categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      {selectedCategory && (
        <div>
          <h4>{vendor.shop.categories.find((c) => c.id === selectedCategory)?.name}</h4>
          <div className="product-list">
            {vendor.shop.categories
              .find((c) => c.id === selectedCategory)
              .products.map((product) => (
                <div key={product.id} className="product-card">
                  <h5>{product.name}</h5>
                  <p>${product.price}</p>
                  <button type="button" onClick={() => handleUpdateProduct(product.id)}>
                    Update
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
<br />
      {/* Add product form for the selected category */}
      {selectedCategory && (
        <form className='container'>
          <label>
            New Product Name:
            <input type="text" value={newProductName} onChange={(e) => setNewProductName(e.target.value)} />
          </label>
          <label>
            New Product Price:
            <input type="text" value={newProductPrice} onChange={(e) => setNewProductPrice(e.target.value)} />
          </label>
          <button type="button" onClick={handleAddProduct}>
            Add Product
          </button>
        </form>
      )}
<br />
      {/* Add category form */}
      <form className='container'>
        <label>
          New Category Name:
          <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
        </label>
        <button type="button" onClick={handleAddCategory}>
          Add Category
        </button>
      </form>
    </div>
  );
};

export default VendorHomePage;
