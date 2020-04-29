import React from 'react';
import * as utils from '../utils';

const shoppingCartComponent = (props) => {
  console.log(props.cartItems);
  let { cartItems } = props;
  let sum = 0;
  return (
    <div className='alert alert-info'>
      {cartItems.length == 0
        ? 'Your cart is empty'
        : `you have ${cartItems.length} items in your cart`}

      {cartItems.length > 0 && (
        <div>
          <ul style={{ marginLeft: -25 }}>
            {cartItems.map((item) => (
              <li key={item.id}>
                <b>{item.title}</b>
                <button
                  style={{ float: 'right' }}
                  className='btn btn-danger btn-xs'
                  onClick={(event) => props.handleRemoveFromCart(event, item)}
                >
                  X
                </button>
                <br />
                {item.count} X {utils.formatPrice(item.price)}
              </li>
            ))}
          </ul>
          Sum :{' '}
          {utils.formatPrice(
            cartItems.reduce((a, b) => a + b.price * b.count, 0)
          )}
        </div>
      )}
    </div>
  );
};

export default shoppingCartComponent;
