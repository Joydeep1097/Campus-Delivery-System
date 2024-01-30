import React from 'react';
import { useEffect } from 'react';
const UserShopPage = (props) => {
    useEffect(() => {
        const fetchShopData = async () => {
            //console.log("hi",props.id)
          const utoken = localStorage.getItem("token");
          const payload={
            "shopId":props.id
          };
          try {
            const response = await fetch('http://localhost:27017/api/v1/shop', {
                method: 'POST',
                headers: { Authorization: `Bearer ${utoken}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            console.log(data.shop)
            //setVendor(data.vendor);
            //setVendorName(data.name);
            //setShopName(data.shop.name);
            //setCategories(data.shop.categories);
            //console.log(name);
          } catch (error) {
            console.error('Error fetching shops:', error);
          } 
        };
    
        fetchShopData();
      }, []);
  return (
    <div>
      {/*<header>
        <h1>{shop.name}</h1>
      </header>

      <main>
        {shop.categories.map((category) => (
          <div key={category.id} className="category">
            <h2>{category.name}</h2>
            {category.products.map((product) => (
              <div key={product.id} className="product">
                <h3>{product.name}</h3>
                <span className="price">${product.price}</span>
              </div>
            ))}
          </div>
        ))}
            </main>*/}
    </div>
  );
};

export default UserShopPage;
