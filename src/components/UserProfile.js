// UserProfile.js

import React from 'react';
import NavbarWithProfile from './NavbarWithProfile';
import ShopListPage from './ShopListPage';
import Footer from './Footer';
const UserProfile = (props) => {
  return (
    <div>
        <NavbarWithProfile id={props.id}/>
        {console.log(props)}
        <ShopListPage/>
        <Footer/>
    </div>
  );
};

export default UserProfile;
