import Axios from 'axios';
import { API_URL } from '../../helpers/api-url';
import swal from 'sweetalert';

const addToCartAction = (data) => {
  return (dispatch) => {
    Axios.post(`${API_URL}/cart`, data)
      .then((response) => {
        console.log(data.userID);
        swal('Success!', 'Product added to cart!', 'success');
        dispatch(getCartByUserIdAction(data.userID));
      })
      .catch((error) => {
        console.log(error);
        swal('Something went wrong', 'Please contact an Administrator', 'error');
      });
  };
};
const getCartByUserIdAction = (userID) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/cart?userID=${userID}`)
      .then(({ data }) => {
        console.log('SUCCESS_GET_DATA');
        dispatch({
          type: 'GET_CART',
          payload: data,
        });
      })
      .catch((err) => {
        console.log(err, 'FAILED_GET_DATA');
      });
  };
};
// export const getCartByIdAction = (id) => {
//   return (dispatch) => {
//     Axios.get(`${api_url}/cart?userID=${id}`)
//       .then(({ data }) => {
//         dispatch({
//           type: 'FETCH_CART',
//           payload: data,
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// };
const deleteCartItemAction = (id, userID) => {
  return (dispatch) => {
    Axios.delete(`${API_URL}/cart/${id}`)
      .then((resDel) => {
        swal('Success!', 'Product deleted from cart!', 'success');
        dispatch(getCartByUserIdAction(userID));
        // Axios.get(`${API_URL}/cart?userID=${userID}`).then((resGet) => {
        // });
      })
      .catch((err) => {
        console.log(err, 'FAILED_DELETE_CART_ITEM');
      });
  };
};
const checkOutAction = (data) => {
  return (dispatch) => {
    Axios.post(`${API_URL}/transaction`, data)
      .then((res) => {
        console.log('masuk');
        data.items.forEach((val) => {
          Axios.delete(`${API_URL}/cart/${val.id}`).then((res) => {
            console.log('deleted id', val.id);
          });
        });
        swal('Success!', 'Thank you!', 'success');
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export { addToCartAction, getCartByUserIdAction, deleteCartItemAction, checkOutAction };
