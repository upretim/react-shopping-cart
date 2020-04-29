import React from 'react';

const filterComponent = (props) => {
  return (
    <div className='row'>
      <div className='col-md-4'>{`${props.count} products found`}</div>
      <div className='col-md-4'>
        <label>
          Order by
          <select
            className='form-control'
            onChange={props.handleFilter}
            name='orderFilter'
          >
            <option value=''>Select</option>
            <option value='lowest'>Lowest to highest</option>
            <option value='heighest'>Heighest to lowest</option>
          </select>
        </label>
      </div>
      <div className='col-md-4'>
        <label>
          Filter Size
          <select
            className='form-control'
            onChange={props.handleFilter}
            name='sizeFilter'
          >
            <option value='all'>Select</option>
            <option value='all'>All</option>
            <option value='xs'>XS</option>
            <option value='s'>S</option>
            <option value='m'>M</option>
            <option value='l'>L</option>
            <option value='xl'>XL</option>
            <option value='xxl'>XXL</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default filterComponent;
