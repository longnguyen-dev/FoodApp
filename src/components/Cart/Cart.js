import React, { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitFormHandler = (userData) => {
    setIsSubmittingForm(true);

    fetch('https://react-http-request-5b4de-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json',
      {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    setIsSubmittingForm(false);
    setDidSubmit(true);
    cartCtx.clearItem()
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalAction = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>
  )

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total} >
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onConfirm={submitFormHandler} onCancel={props.onClose} />}
      {!isCheckout && modalAction}
    </React.Fragment>
  )

  const sendSuccessRequest = (
    <React.Fragment>
      <p>Successfuly sent the order</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>Close</button>
      </div>
    </React.Fragment>
  )

  return (
    <Modal onClose={props.onClose}>
      {!isSubmittingForm && !didSubmit && cartModalContent}
      {isSubmittingForm && !didSubmit && <p>Sending orders data...!</p>}
      {!isSubmittingForm && didSubmit && sendSuccessRequest}
    </Modal>
  );
};

export default Cart;
