import React, { Component } from 'react';

import FilterComponent from './components/FilterComponent';
import ProductTable from './components/ProductTable';
import ShoppingCart from './components/ShoppingCart';
import Modal from './components/Modal';

//Redux
import { connect } from 'react-redux';
import * as ecomActions from './store/action';
import {bindActionCreators} from 'redux';
// to start server npx json-server public/db.json --port 8000


import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      filteredProducts: [],
      cartItems: [],
      totalProducts: 0,
      showModal: false,
      filterByText: '',
      filterSizeText: '',
      discountCode: '',
    };
  }

  componentDidMount() {
    fetch('http://localhost:8000/products/')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // logic
        this.setState({
          products: data,
          filteredProducts: data,
        });
      });
  //let data = "myData";
   //this.props.getApiData(data);
   this.props.ecomActions.getApiData()
    //this.props.ecomActions.getApiData();
    // cannot write here
    // console.log('Component Did mount got called', this.state.products); //this will show empty products, b/c assync call above
  }

  handleAddToCart = (event, product) => {
    // console.log('Items passed', event, product);
    const { cartItems } = this.state;
    let productFound = false;
    cartItems.forEach((cartproduct) => {
      if (cartproduct.id === product.id) {
        productFound = true;
        cartproduct.count = cartproduct.count + 1;
      }
    });
    if (!productFound) {
      product.count = 1;
      cartItems.push(product);
    }

    this.setState(
      {
        cartItems: cartItems,
      },
      () => console.log('cart items added:', this.state.cartItems)
    );

    //After updating state, if we want to console, we need to use the above one(callback), not as below. Because setState is assync
    // console.log('Cart Items', this.state.cartItems);
  };

  handleFilter = (event) => {
    this.props.filterData();
    switch (event.target.name) {
      case 'orderFilter':
        this.handleSortChange(event);
        break;
      case 'sizeFilter':
        this.handleSizeFilterChange(event);
        break;
      default:
        break;
    }
  };

  handleSortChange = (event) => {
    console.log(event.target.value);
    let { filteredProducts } = this.state;

    let sortValue = event.target.value;
    switch (sortValue) {
      case 'lowest':
        filteredProducts.sort((a, b) => {
          if (a.price > b.price) return 1;
          return -1;
        });
        break;
      case 'heighest':
        filteredProducts.sort((a, b) => {
          if (a.price > b.price) return -1;
          return 1;
        });
        break;
      case '':
        break;
      default:
        break;
    }
    this.setState(
      {
        filteredProducts: filteredProducts,
      },
      () => console.log('sorted', this.state.products)
    );
    this.props.ecomActions.filterData(filteredProducts)
  };

  handleSizeFilterChange = (event) => {
    let sizeFilter = event.target.value;
    let { products } = this.state;
    let filteredProducts = [];
    if (sizeFilter !== 'all') {
      filteredProducts = products.filter(
        (product) =>
          product.availableSizes.indexOf(sizeFilter.toUpperCase()) > -1
      );
    } else {
      filteredProducts = products;
    }

    this.setState(
      {
        filteredProducts: filteredProducts,
      },
      () => console.log('Filtered by size', filteredProducts)
    );
    this.props.ecomActions.filterData(filteredProducts);
  };

  handleRemoveFromCart = (event, item) => {
    console.log('handleRemoveFromCart', item);

    let upatedCartItems = this.state.cartItems.filter(
      (product) => product.id !== item.id
    );

    this.setState(
      {
        cartItems: upatedCartItems,
      },
      () => console.log('Updaed  cart items', upatedCartItems)
    );
  };

  checkoutHandler = (event) => {
    console.log('Checkout handler get called');
    this.setState({
      showModal: true,
    });
  };

  checkoutConfirmHandler = (event) => {
    console.log('Checkout confirm get called');
    this.setState({
      showModal: false,
      cartItems: [],
    });
  };

  removeItem = (event) => {};

  discountCodeHandler = (event) => {
    this.setState(
      {
        discountCode: event.target.value,
      },
      () => console.log('Discount code ', this.state.discountCode)
    );
  };

  render() {
    console.log('Local state', this.state);
    console.log('Props from redux store', this.props);
    return (
      <div className='container'>
        <h1>Ecommerce shopping cart Application</h1>
        <hr />
        <div className='row'>
          <div className='col-md-9'>
            <FilterComponent
              count={this.state.filteredProducts.length}
              handleFilter={this.handleFilter}
            />
            <ProductTable
              products={this.state.filteredProducts}
              handleAddToCart={this.handleAddToCart}
            />
          </div>
          <div className='col-md-3'>
            <ShoppingCart
              cartItems={this.state.cartItems}
              handleRemoveFromCart={this.handleRemoveFromCart}
              checkoutHandler={this.checkoutHandler}
            />
          </div>
          {this.state.showModal ? (
            <Modal
              showModal={this.state.showModal}
              checkoutConfirmHandler={this.checkoutConfirmHandler}
              cartItems={this.state.cartItems}
              discountCodeHandler={this.discountCodeHandler}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (reducerState) => {
  return {
    products: reducerState.products
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
   getApiData: () => dispatch(ecomActions.getApiData("test")),
   filterData: () => dispatch(ecomActions.filterData()),
   ecomActions: bindActionCreators(ecomActions, dispatch)
    //getApiData : ecomActions.getApiData
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
