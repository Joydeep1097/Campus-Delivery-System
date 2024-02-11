import React, { useState, useEffect } from 'react';

const Popup = (props) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 2000); // Hide message after 10 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {show && <div className="popup-message">{props.message}</div>}
    </>
  );
};

export default Popup;
