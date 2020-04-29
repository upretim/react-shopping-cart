import React from 'react';
import './Modal.css';
import * as utils from '../utils';

const modal = (props) => {
  console.log('props', props);
  let { cartItems } = props;
  return (
    <>
      {props.showModal ? <div className='backdrop'></div> : null}

      <div
        className='modal'
        style={{
          transform: props.showModal ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.showModal ? '1' : '0',
        }}
      >
        Please confirm the items in you Basket
        <div>
          <ul style={{ marginLeft: -25 }}>
            {cartItems.map((item) => (
              <li key={item.id}>
                <b>{item.title}</b>
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
        Discount Code{' '}
        <input
          type='text'
          value={props.discountCode}
          onChange={props.discountCodeHandler}
        ></input>
        <button
          className='btn btn-primary'
          onClick={props.checkoutConfirmHandler}
        >
          Confirmed
        </button>
      </div>
    </>
  );
};

export default modal;
