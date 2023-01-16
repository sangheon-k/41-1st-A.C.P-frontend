import React, { useEffect, useState } from 'react';
import CartWrap from './components/CartWrap';
import CartPriceInfo from './components/CartPriceInfo/CartPriceInfo';
import { cartDataRefactor, fetchApi } from './config';
import './Cart.scss';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = async () => {
    const result = await fetchApi('/data/cart.json');
    const data = cartDataRefactor(result);
    setCartItems(data);
  };

  const totalPrice = selectedItems.reduce(
    (acc, curr) => acc + curr.itemPrice,
    0
  );

  return (
    <section className="cart">
      <div className="innerCart">
        <CartWrap
          cartItems={cartItems}
          setCartItems={setCartItems}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
        <CartPriceInfo totalPrice={totalPrice} />
      </div>
    </section>
  );
}
