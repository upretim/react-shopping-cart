import * as actionTypes from './actionTypes';

export const loadApiData = () =>   {
  return (dispatch)=> {
    fetch('http://localhost:8000/products/')
      .then((response) => response.json())
      .then((data) => {
        console.log('Data from action', data);
        dispatch({ type: actionTypes.GET_PRODUCT_DATA_SUCCESS, payload: data });
      });
  }; 
}


/*export const loadApiData = () => (dispatch) => {
  fetch("http://localhost:8000/products").then(res => res.json())
    .then(data => {
      return dispatch({ type: actionTypes.GET_PRODUCT_DATA, payload: data });
    });
 }*/


export const getApiData = (data) => {
  console.log('data form App is', data)
  return (disptach) => {
    disptach(loadApiData());
  };
};

export const filterData = (data) => {
  console.log('Filtered data in action', data);
  return (dispatch)=> {
    dispatch({ type: actionTypes.FILTER_ITEMS, payload:data }); 
  }; 
    
};