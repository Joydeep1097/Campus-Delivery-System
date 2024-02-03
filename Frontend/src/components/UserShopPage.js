import React, { useState, useEffect } from 'react';

const UserShopPage = (props) => {
  const [shop, setShop] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
 

  useEffect(() => {
    const fetchShopData = async () => {
      const utoken = localStorage.getItem("token");
      const payload = {
        "shopId": props.id
      };
      try {
        const response = await fetch('http://localhost:27017/api/v1/shop', {
          method: 'POST',
          headers: { Authorization: `Bearer ${utoken}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await response.json();
        setShop(data.shop.shop);
      } catch (error) {
        console.error('Error fetching shops:', error);
      }
    };

    fetchShopData();
  }, [props.id]);

  return (
    <div>
      <div className="side-panel">
        <header>
          <h1>{shop.name}</h1>
        </header>
        <div>
          <h3>Categories</h3>
          <select value={selectedCategory} onChange={(e) => { if (e.target.value !== "Select a Category") { setSelectedCategory(e.target.value) } }}>
            <option value={null}>Select a Category</option>
            {shop.categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='page'>
        <main>
          {selectedCategory && (
            <>
              <div>
                <h4>{shop.categories.find((c) => c.id === selectedCategory)?.name}</h4>
                <div className="product-list">
                {shop.categories.find((c) => c.id === selectedCategory)?.products.map((product) => (
                    <div key={product.id} className="product-card">
                      <h5>{product.name}</h5>
                      <p>Rs.{product.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          {!selectedCategory && shop.categories?.map((category) => (
            <div key={category.id}>
              <h2>{category.name}</h2>
              <div className='product-list'>
                {category.products.map((product) => (
                  <div key={product.id} className="product-card">
                    <h3>{product.name}</h3>
                    <span className="price">Rs.{product.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default UserShopPage;
