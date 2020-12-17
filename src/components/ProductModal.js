import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ProductCard } from './';
import Fade from 'react-reveal/Fade';
import { fetchProductByIdAction, addToCartAction, getCartByUserIdAction } from '../redux/action';
import { connect } from 'react-redux';

// class ProductModal extends Component {
//   state = {
//     isOpen: false,
//   }
// }

const ProductModal = (props) => {
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  // const { productDetails, userID, cartList, email } = this.props;
  // const { stock } = this.props.productDetails;
  // increaseQty = () => {};
  // decreaseQty = () => {};
  return (
    <div>
      <div onClick={toggle}>
        <div className="m-2">
          <ProductCard image={props.image} name={props.name} price={props.price}></ProductCard>
        </div>
      </div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>{props.name}</ModalHeader>
        <ModalBody className="d-flex">
          <div className="col-6">
            <Fade bottom>
              <img src={props.image} alt="ERR: file_not_found" height="200" width="200" />
            </Fade>
          </div>
          <div className="col-6">
            <div className="my-2">
              <h4>Rp {props.price.toLocaleString()}</h4>
            </div>
            <div className="my-2">
              <div>Stock: {props.stock}</div>
            </div>
            <div className="my-2">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate modi molestias
              doloremque distinctio unde provident alias iusto quibusdam doloribus iure iste impedit
              in, magnam totam, quaerat obcaecati sint vero perferendis!
            </div>
            <div className="d-flex my-2" style={{ alignItems: 'center' }}>
              <Button color="warning">-</Button>
              <div className="px-2">1</div>
              <Button color="warning">+</Button>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggle}>
            Cancel
          </Button>
          <Button color="warning" onClick={toggle}>
            Add to Cart
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
// }

const mapStateToProps = ({ products, user, cart }) => {
  return {
    productDetails: products.productDetails,
    userID: user.id,
    cartList: cart.cartList,
    email: user.email,
  };
};

export default connect(mapStateToProps, {
  fetchProductByIdAction,
  addToCartAction,
  getCartByUserIdAction,
})(ProductModal);
