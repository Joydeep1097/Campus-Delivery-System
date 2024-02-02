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
        //console.log(name);
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
      // Create a payload with the new category and an empty product list
      const payload = {
        [newCategory]:{
          [newProductName]:{
          "price":newProductPrice,"returnable":newProductReturnable,"count":newProductCount
          }
        }
      };
       console.log(payload)
      // Make an API call to add the new category along with an empty product list
      const response = await fetch('http://localhost:27017/api/v1/vendor/addcategoryproduct', {
        method: 'POST',
        headers: { Authorization: `Bearer ${utoken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      console.log(data);
      if(data.success===true){
        alert("category added successfully");
      }
      if(data.success===false){
        alert("category not added");
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };
  const handleAddProduct = async () => {
    const utoken = localStorage.getItem("token");

    try {
      const payload = {
        "cat_id":selectedCategory,
          [selectedCategory]:{
          "name": newProductName,"price":newProductPrice,"returnable":newProductReturnable,"count":newProductCount
          }
      };
       console.log(payload)
      // Make an API call to add the new category along with an empty product list
      const response = await fetch('http://localhost:27017/api/v1/vendor/add-product', {
        method: 'POST',
        headers: { Authorization: `Bearer ${utoken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      console.log(data);
      if(data.success===true){
        alert("product added successfully");
      }
      if(data.success===false){
        alert("product not added");
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };
  const handleAddProductpopup =() =>{
    setShowproductPopup(true);
  }
  const handleAddCategorypopup =() =>{
    setShowcategoryPopup(true);
  }
  const handlePopupClose = () => {
    setShowcategoryPopup(false);
    setShowproductPopup(false);
  };


  const handleUpdateProduct = (productId) => {
    console.log('Updating product:', productId, 'with new details:');
    // Implement logic to update product details
    // Make an API call to update the product details in the backend
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
            <h4>{vendor.shop.categories.find((c) => c.id === selectedCategory)?.name}</h4>
            <div className="product-list">
              {vendor.shop.categories.find((c) => c.id === selectedCategory)?.products.map((product) => (
                <div key={product.id} className="product-card">
                  <h5>{product.name}</h5>
                  <p>Rs.{product.price}</p>
                  <button type="button" onClick={() => handleUpdateProduct(product.id)}>
                    Update
                  </button>
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
