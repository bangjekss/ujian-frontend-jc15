import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProductsAction } from '../redux/action';
import { ProductCard, ProductModal } from '../components';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
class ProductPage extends Component {
  state = {
    detail: false,
  };
  componentDidMount() {
    const { fetchProductsAction } = this.props;
    fetchProductsAction();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.detail !== this.state.detail) {
    }
  }
  productDetail = () => {
    const { email } = this.props;
    if (!email) {
      console.log(email);
      return swal('FAILED', 'not logged in', 'error');
    }
    console.log('click');

    this.setState({
      detail: !this.state.detail,
    });
    // return <ProductModal></ProductModal>;
    // document.getElementById('productModal').innerHTML = <ProductModal></ProductModal>;
  };
  renderProductList = () => {
    return this.props.productList.map((value) => {
      return (
        <ProductModal image={value.image} name={value.name} price={value.price} stock={value.stock}>
          {/* <div className="m-2">
            <ProductCard image={value.image} name={value.name} price={value.price}></ProductCard>
          </div> */}
        </ProductModal>
      );
    });
  };

  render() {
    return (
      <div className="d-flex pt-5 bgMain" style={{ padding: '0 100px', minHeight: '100vh' }}>
        <div
          className="col-12"
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}
        >
          {this.renderProductList()}
        </div>
        <div id="productModal"></div>
      </div>
    );
  }
}

const mapStateToProps = ({ products, user }) => {
  return {
    email: user.email,
    categories: products.categories,
    productList: products.productList,
    isLoading: products.isLoading,
  };
};

export default connect(mapStateToProps, {
  fetchProductsAction,
})(ProductPage);
