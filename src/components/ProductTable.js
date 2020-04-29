import React from 'react';
import * as utils from '../utils';

const productTable = (props) => {
  const productItems = props.products.map((product) => (
    <div className='col-md-4' key={product.id}>
      <div className='thumbnail text-center'>
        <a href='#'>
          <img src={`products/${product.sku}_2.jpg`} alt={product.title} />
          <p>{product.title}</p>
        </a>
        <b>{utils.formatPrice(product.price)}</b>
        <button
          className='btn btn-primary'
          onClick={(event) => props.handleAddToCart(event, product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  ));
  return <div className='row'>{productItems}</div>;
};

export default productTable;
