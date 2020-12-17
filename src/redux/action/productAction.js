import Axios from 'axios';
import { API_URL } from '../../helpers/api-url';

const fetchProductsAction = () => {
  return (dispatch) => {
    Axios.get(`${API_URL}/products`)
      .then((response) => {
        console.log(response, 'FETCH_DATA_SUCCESS');
        dispatch({
          type: 'FETCH_PRODUCTS',
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error, 'FETCH_DATA_FAIL');
      });
  };
};
const fetchProductByIdAction = (id) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/products/${id}`)
      .then((res) => {
        dispatch({
          type: 'FETCH_BY_ID',
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export { fetchProductsAction, fetchProductByIdAction };
