import React, { useState, useEffect, useCallback } from 'react';
import Cart from './Cart';
//import ShowProduct from './ShowProduct';
const UserShopPage = (props) => {
  const [searchString, setSearchString] = useState('')
  const [flag, setFlag] = useState(0);
  const [searchResult, setSearchResult] = useState('')
  const [shop, setShop] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartback, setCartback] = useState([]);
  const [input1, setInput1] = useState('');
  const [product, setProduct] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [currentPagecategory, setCurrentPagecategory] = useState(1);
  const [productCounts, setProductCounts] = useState({}); // Track counts for each product
  const itemsPerPagecategory = 5;
  const getCartback = (cartback) => {
    setCartback(cartback);
    setFlag(1);
    console.log(cartback)
  };
  const handleIncrement = (productId) => {
    setProductCounts(prevCounts => ({
      ...prevCounts,
      [productId]: (prevCounts[productId] || 0) + 1 // Increment count for the product
    }));
  };

  const handleDecrement = (productId) => {
    if (productCounts[productId] && productCounts[productId] > 0) {
      setProductCounts(prevCounts => ({
        ...prevCounts,
        [productId]: prevCounts[productId] - 1 // Decrement count for the product
      }));
    }
  };
  const resetall = () => {
    setSelectedCategory(null);
    paginate(1);
    setProduct([]);
    setSearchString('');
    setSearchResult('');
    setFlag(1);
  };
  useEffect(() => {
    setSearchString(input1)
  }, [input1]);
  useEffect(() => {
    const cartdata = async () => {
      // Implement logic to fetch from cart
      const utoken = localStorage.getItem("token");
      try {
        const response = await fetch('http://43.204.192.134:27017/api/v1/getUserCartProducts', {
          method: 'GET',
          headers: { Authorization: `Bearer ${utoken}`, 'Content-Type': 'application/json' },

        });
        const data = await response.json();
        setCart(data.shop.products);
        setFlag(0);
        console.log(data.shop.products.length);
      } catch (error) {
        console.error('Error fetching shops:', error);
      }
    };
    cartdata();
  }, [flag]);
  useEffect(() => {
    const fetchShopData = async () => {
      const utoken = localStorage.getItem("token");
      const payload = {
        "shopId": props.id
      };
      try {
        const response = await fetch('http://43.204.192.134:27017/api/v1/shop', {
          method: 'POST',
          headers: { Authorization: `Bearer ${utoken}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await response.json();
        setShop(data.shop.shop);
        setFlag(1);
      } catch (error) {
        console.error('Error fetching shops:', error);
      }
    };
    fetchShopData();
  }, [props.id]);
  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Function to change the current page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const search = () => {
    setSelectedCategory(null);
    console.log(selectedCategory)
    setSearchString(input1)
    console.log(searchString)
    search1();
  }
  const search1 = async () => {
    // Implement logic to add the product to the cart
    const utoken = localStorage.getItem("token");
    const payload = {
      "shopId": shop.id,
      "searchString": searchString
    };
    if (searchString != '') {
      try {
        const response = await fetch('http://43.204.192.134:27017/api/v1/searchProduct', {
          method: 'POST',
          headers: { Authorization: `Bearer ${utoken}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await response.json();
        setSearchResult(data.shop.shop)
        setSearchString(null)
        console.log(searchResult.categories)
      } catch (error) {
        console.error('Error fetching shops:', error);
      }
    }
  };
  const goBack = () => {
    setProduct([]);
  };
  const addToCart = async (_id) => {
    // Implement logic to add the product to the cart
    const quantity = productCounts[_id] || 1;
    console.log('Adding product to cart:', product, 'Quantity:', quantity);
    const payload = {
      "productID": _id,
      "productQuantity": quantity,
      "shopID": props.id
    }
    console.log(payload);
    const utoken = localStorage.getItem("token");
    try {
      const response = await fetch('http://43.204.192.134:27017/api/v1/addToCart', {
        method: 'POST',
        headers: { Authorization: `Bearer ${utoken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      console.log(data);
      if (data.success === true) {
        setFlag(1);
        alert("product added to cart")
      }
      else if (data.message === "Invalid token") {
        alert("session expired. please login again");
      }
    } catch (error) {
      console.error('Error fetching shops:', error);
    }
  };
  const indexOfLastItemcategory = currentPagecategory * itemsPerPagecategory;
  const indexOfFirstItemcategory = indexOfLastItemcategory - itemsPerPagecategory;
  // Function to change the current page
  const paginatecategory = (pageNumbercategory) => setCurrentPagecategory(pageNumbercategory);
  return (
    <>
      <div>
        <div className="side-panel">
          <header>
            <h1 onClick={resetall} style={{ cursor: "pointer", color: "blueviolet" }}>{shop.name}</h1>
          </header>
          <div className="search-bar">
            <input onChange={(e) => { e.preventDefault(); setInput1(e.target.value) }} type="text" placeholder="Search..." />
            <button type="button" onClick={search} >🔍Search</button>
          </div>
          <Cart cart={cart} onSubmit={getCartback} />
          <div>
            <h3>Categories</h3>
            <select value={selectedCategory} onChange={(e) => { if (e.target.value !== "All") { setSelectedCategory(e.target.value); paginate(1); setProduct([]); setSearchString(''); setSearchResult('') } else { setSelectedCategory(null); paginate(1); setProduct([]); setSearchString(''); setSearchResult('') } }}>
              <option value={null}>All</option>
              {shop.categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>

          <div>
            <div className="pagination">
              <p>Pages</p>
              {Array.from({ length: Math.ceil(shop.categories?.length / itemsPerPagecategory) }, (_, index) => index + 1).map((pageNumbercategory) => (
                <button2 key={pageNumbercategory} onClick={() => paginatecategory(pageNumbercategory)}>
                  {pageNumbercategory}
                </button2>
              ))}
            </div>

            <div className='page'>
              <main>
                {searchResult && searchResult.categories ? (
                  searchResult.categories.slice(indexOfFirstItemcategory, indexOfLastItemcategory).map((category) => (
                    <div key={category.id}>
                      <h2>{category.name}</h2>
                      <div className='product-list'>
                        {category.products
                          .slice(indexOfFirstItem, indexOfLastItem)
                          .map((product) => (
                            <div key={product.id} className="product-card" onClick={() => setProduct(product)} >
                              <div>
                                {product.image ? <img src={product.image} alt={product.name} className='product-image' /> :
                                  <img src="images/defaultproduct.png" alt="not here" className='product-image' />}
                                <h3>{product.name}</h3>
                                <span className="price">Rs.{product.price}</span>
                                <div className='quantity'>
                                  <p>Quantity</p>
                                  <button2 onClick={() => handleDecrement(product.id)}>-</button2>
                                  <span>{productCounts[product.id] || 1}</span>
                                  <button2 onClick={() => handleIncrement(product.id)}>+</button2>
                                </div>
                              </div>
                              <button onClick={() =>addToCart(product.id)}>🛒 Add to Cart</button>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    {selectedCategory && (
                      <>
                        <div>
                          <h4>{shop.categories.find((c) => c.id === selectedCategory)?.name}</h4>
                          <div className="pagination">
                            <p>Pages</p>
                            {Array.from({ length: Math.ceil(shop.categories.find((c) => c.id === selectedCategory)?.products.length / itemsPerPage) }, (_, index) => index + 1).map((pageNumber) => (
                              <button2 key={pageNumber} onClick={() => paginate(pageNumber)}>
                                {pageNumber}
                              </button2>
                            ))}
                          </div>
                          <div className="product-list">
                            {shop.categories.find((c) => c.id === selectedCategory)?.products
                              .slice(indexOfFirstItem, indexOfLastItem)
                              .map((product) => (
                                <div key={product.id} className="product-card" onClick={() => setProduct(product)} >
                                  <div>
                                    {product.image ? <img src={product.image} alt={product.name} className='product-image' /> :
                                      <img src="images/defaultproduct.png" alt="not here" className='product-image' />}
                                    <h3>{product.name}</h3>
                                    <span className="price">Rs.{product.price}</span>
                                    <div className='quantity'>
                                      <p>Quantity</p>
                                      <button2 onClick={() => handleDecrement(product.id)}>-</button2>
                                      <span>{productCounts[product.id] || 1}</span>
                                      <button2 onClick={() => handleIncrement(product.id)}>+</button2>
                                    </div>
                                  </div>
                                  <button onClick={() =>addToCart(product.id)}>🛒 Add to Cart</button>
                                </div>
                              ))}
                          </div>
                        </div>
                      </>
                    )}

                    {!selectedCategory && shop.categories?.slice(indexOfFirstItemcategory, indexOfLastItemcategory).map((category) => (
                      <div key={category.id}>
                        <h2>{category.name}</h2>
                        <div className='product-list'>
                          {category.products
                            .slice(indexOfFirstItem, indexOfLastItem)
                            .map((product) => (
                              <div key={product.id} className="product-card" onClick={() => setProduct(product)} >
                                <div>
                                  {product.image ? <img src={product.image} alt={product.name} className='product-image' /> :
                                    <img src="images/defaultproduct.png" alt="not here" className='product-image' />}
                                  <h3>{product.name}</h3>
                                  <span className="price">Rs.{product.price}</span>
                                </div>
                                <div className='quantity'>
                                  <p>Quantity</p>
                                  <button2 onClick={() => handleDecrement(product.id)}>-</button2>
                                  <span>{productCounts[product.id] || 1}</span>
                                  <button2 onClick={() => handleIncrement(product.id)}>+</button2>
                                </div>
                                <button onClick={() =>addToCart(product.id)}>🛒 Add to Cart</button>
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </main>
            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default UserShopPage;
