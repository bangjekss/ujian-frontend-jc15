import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCartByUserIdAction, deleteCartItemAction, checkOutAction } from '../redux/action';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

class CartPage extends Component {
  state = {
    finish: false,
    // ea: false,
  };
  componentDidMount() {
    const { getCartByUserIdAction, userID, cart } = this.props;
    getCartByUserIdAction(userID);

    // this.setState({ ea: !this.state.ea });
  }
  componentDidUpdate(prevProps) {
    const { getCartByUserIdAction, userID } = this.props;
    if (prevProps.userID !== userID) {
      getCartByUserIdAction(userID);
    }
  }
  renderTableBody = () => {
    return this.props.cart.map((value, index) => {
      return (
        <tr style={{ textAlign: 'center' }}>
          <td>{index + 1}</td>
          <td>{value.name}</td>
          <td>
            <img src={value.image} alt="ERR:file_not_found" height="100" width="100" />
          </td>
          <td className="d-flex align-items-center justify-content-center">
            <Button color="primary">-</Button>
            <div className="mx-2">{value.qty}</div>
            <Button color="primary">+</Button>
          </td>
          <td>Rp {(value.qty * value.price).toLocaleString()}</td>
          <td>
            <Button color="danger" onClick={() => this.handleDeleteCart(value.id)}>
              Delete
            </Button>
          </td>
        </tr>
      );
    });
  };
  handleDeleteCart = (id) => {
    const { deleteCartItemAction, userID } = this.props;
    deleteCartItemAction(id, userID);
  };
  renderGrandTotal = () => {
    const { cart } = this.props;
    let output = null;
    // for(let i = 0; i< cartList.length ; i++){
    //     output += cartList[i].qty * cartList[i].price
    // }
    cart.forEach((value) => {
      output += value.qty * value.price;
    });
    return output;
  };
  handleCheckOut = () => {
    const { userID, username, cart, checkOutAction } = this.props;
    const { output } = this.state;
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    const checkedOutData = {
      date: `${day}-${month}-${year}`,
      userID,
      username,
      total: this.renderGrandTotal(),
      item: cart,
    };
    console.log('bayar');
    checkOutAction(checkedOutData);
    this.setState({ finish: !this.state.finish });
  };

  render() {
    const { ea } = this.state;
    const { userID } = this.props;
    getCartByUserIdAction(userID);

    return (
      <div className="bgMain" style={{ padding: '0 200px' }}>
        <Table hover>
          <thead>
            <tr style={{ textAlign: 'center' }}>
              <th>#</th>
              <th>Name</th>
              <th>Image</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.renderTableBody()}</tbody>
          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>Grand Total</td>
              <td>Rp {ea ? this.renderGrandTotal().toLocaleString() : null}</td>
              <td>
                <Button color="primary" onClick={this.handleCheckOut}>
                  Pay
                </Button>
              </td>
            </tr>
          </tfoot>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = ({ user, cart }) => ({
  userID: user.id,
  username: user.username,
  cart: cart.cart,
});

export default connect(mapStateToProps, {
  getCartByUserIdAction,
  deleteCartItemAction,
  checkOutAction,
})(CartPage);
