import React, { useState, useEffect } from 'react';
import VendorNavbar from './VendorNavbar';

const VendorHomePage = (props) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategory, setNewCategory] = useState('');
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductReturnable, setNewProductReturnable] = useState('No');
  const [newProductCount, setNewProductCount] = useState(1);
  const [vendor, setVendor] = useState([]);
  const [vendorname, setVendorName] = useState('');
  const [shopname, setShopName] = useState('');
  const [categories, setCategories] = useState([]);
  const [showcategoryPopup, setShowcategoryPopup] = useState(false);
  const [showproductPopup, setShowproductPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [photo, setPhoto] = useState('');
  useEffect(() => {
    const fetchShopData = async () => {
      const utoken = localStorage.getItem("token");
      try {
        const response = await fetch('http://localhost:27017/api/v1/allProductperCategoryShop', {
          method: 'GET',
          headers: { Authorization: `Bearer ${utoken}` }
        });
        const data = await response.json();
        setVendor(data.vendor);
        setVendorName(data.vendor.name);
        setShopName(data.vendor.shop.name);
        setCategories(data.vendor.shop.categories);
      } catch (error) {
        console.error('Error fetching shops:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShopData();
  }, []);

  const handleAddCategory = async () => {
    const utoken = localStorage.getItem("token");

    try {
      const payload = {
        [newCategory]: {
          [newProductName]: {
            "price": newProductPrice, "returnable": newProductReturnable, "count": newProductCount
          }
        }
      };

      const response = await fetch('http://localhost:27017/api/v1/vendor/addcategoryproduct', {
        method: 'POST',
        headers: { Authorization: `Bearer ${utoken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (data.success === true) {
        alert("category added successfully");
        setCategories([...categories, { id: newCategory, name: newCategory }]);
      }
      if (data.success === false) {
        alert("category not added");
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleAddProduct = async () => {
    const utoken = localStorage.getItem("token");

    try {
      const formData = new FormData();
      // Append text fields to FormData
      formData.append('cat_id', selectedCategory);
      formData.append(selectedCategory+'[name]', newProductName);
      formData.append(selectedCategory+'[price]', newProductPrice);
      formData.append(selectedCategory+'[returnable]', newProductReturnable);
      formData.append(selectedCategory+'[count]', newProductCount);

      // Append image file to FormData
      formData.append('image', photo);
      for (const entry of formData.entries()) {
        console.log(entry);
      }
      const response = await fetch('http://localhost:27017/api/v1/vendor/add-product', {
        method: 'POST',
        headers: { Authorization: `Bearer ${utoken}` },
        body: formData
      });

      const data = await response.json();
      if (data.success === true) {
        alert("product added successfully");

        // Update categories state with the new product
        const updatedCategories = categories.map(category => {
          if (category.id === selectedCategory) {
            return {
              ...category,
              products: [...category.products, { id: data.productId, name: newProductName, price: newProductPrice }]
            };
          }
          return category;
        });
        setCategories(updatedCategories);
      }
      if (data.success === false) {
        alert("product not added");
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleAddProductpopup = () => {
    setShowproductPopup(true);
  }

  const handleAddCategorypopup = () => {
    setShowcategoryPopup(true);
  }

  const handlePopupClose = () => {
    setShowcategoryPopup(false);
    setShowproductPopup(false);
  };

  const handleUpdateProduct = async (productId) => {
    console.log(productId)
    try {
      const payload = {
        "product_id": productId
      };
      const utoken = localStorage.getItem("token");
      const response = await fetch('http://localhost:27017/api/v1/vendor/delete-item', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${utoken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
  
      const data = await response.json();
      if (data.success === true) {
        alert("Product deleted successfully");
        // Remove the deleted product from the state
        const updatedCategories = categories.map(category => {
          if (category.id === selectedCategory) {
            return {
              ...category,
              products: category.products.filter(product => product.id !== productId)
            };
          }
          return category;
        });
        setCategories(updatedCategories);
      }
      if (data.success === false) {
        alert("product not deleted");
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  
  return (
    <div>
      <VendorNavbar name={vendorname} shop={shopname} />
      <h1>Manage Your Shop</h1>
      <h3>Categories:</h3>
      <select value={selectedCategory} onChange={(e) => { if (e.target.value !== "Select a Category") { setSelectedCategory(e.target.value) } }}>
        <option value={null}>Select a Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      {selectedCategory && (
        <>
          <div>
            <h4>{categories.find((c) => c.id === selectedCategory)?.name}</h4>
            <div className="product-list">
              {categories.find((c) => c.id === selectedCategory)?.products.map((product) => (
                <div key={product.id} className="product-card" >
                  {product.image ? <img src={product.image} alt={product.name} className='product-image' /> :
                    <img src="images/defaultproduct.png" alt="not here" className='product-image' />}
                  <h5>{product.name}</h5>
                  <p>Rs.{product.price}</p>
                  <button5 type="submit"onClick={() => handleUpdateProduct(product.id)}>remove</button5>
                </div>
              ))}
            </div>
          </div>
          <br />

          <button type="button" onClick={handleAddProductpopup}>
            Add Product
          </button>
          {showproductPopup && (
            <div className="popup">
              <div className="popup-content">
                <span className="close" onClick={handlePopupClose}>&times;</span>
                <form className='container'>
                  <label>
                    New Product Name:
                    <input type="text" value={newProductName} onChange={(e) => setNewProductName(e.target.value)} />
                  </label>
                  <label>
                    New Product Price:
                    <input type="text" value={newProductPrice} onChange={(e) => setNewProductPrice(e.target.value)} />
                  </label>
                  <label>
                    New Product Returnable:
                    <select value={newProductReturnable} onChange={(e) => setNewProductReturnable(e.target.value)}>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </label>
                  <label>
                    New Product Count:
                    <input type="number" value={newProductCount} onChange={(e) => setNewProductCount(e.target.value)} />
                  </label>
                  <label>
                    Logo Or Photo:
                    <input
                      className='fileselector'
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        console.log(e.target.files[0]);
                        setPhoto(e.target.files[0]);
                      }}
                    />
                  </label>
                  <button type="button" onClick={handleAddProduct}>
                    Add Product
                  </button>
                </form>
              </div>
            </div>
          )}
        </>
      )}

      <h3>Add new Categories of Product</h3>
      <button type="button" onClick={handleAddCategorypopup}>
        Add Category
      </button>
      {showcategoryPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={handlePopupClose}>&times;</span>
            <form className='container'>
              <label>
                New Category Name:
                <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
              </label>
              <label>
                New Product Name:
                <input type="text" value={newProductName} onChange={(e) => setNewProductName(e.target.value)} />
              </label>
              <label>
                New Product Price:
                <input type="text" value={newProductPrice} onChange={(e) => setNewProductPrice(e.target.value)} />
              </label>
              <label>
                New Product Returnable:
                <select value={newProductReturnable} onChange={(e) => setNewProductReturnable(e.target.value)}>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </label>
              <label>
                New Product Count:
                <input type="number" value={newProductCount} onChange={(e) => setNewProductCount(e.target.value)} />
              </label>
              <button type="button" onClick={handleAddCategory}>
                Add Category
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorHomePage;
