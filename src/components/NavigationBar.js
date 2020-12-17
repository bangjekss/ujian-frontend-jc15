import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutAction, getCartByUserIdAction } from '../redux/action';
import YuchaseLogo from '../sprites/logo.png';
import Ava from '../sprites/ava-icon.png';
import ShoppingCartLogo from '../sprites/shopping-cart-logo.png';

class NavigationBar extends Component {
  state = {
    isOpen: false,
  };
  // componentDidMount() {
  //   const { getCartByUserIdAction, userID } = this.props;
  //   getCartByUserIdAction(userID);
  // }
  // componentDidUpdate(prevProps) {
  //   const { getCartByUserIdAction, userID } = this.props;
  //   if (prevProps.userID !== userID) {
  //     getCartByUserIdAction(userID);
  //   }
  // }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleLogout = () => {
    return localStorage.removeItem(this.props.id);
  };
  renderNavIsLogin = () => {
    if (this.props.email !== '') {
      return (
        <Collapse
          isOpen={this.state.isOpen}
          navbar
          className="justify-content-between px-4"
          style={{ backgroundColor: 'rgba(255,202,0,1', borderRadius: '20px', height: '100px' }}
        >
          <Nav className="mr-auto" navbar>
            <div className="d-flex">
              <Link to="/">
                <NavItem className="navText" style={{ padding: '7px 10px' }}>
                  <NavLink>BLOG</NavLink>
                </NavItem>
              </Link>
              <Link to="/">
                <NavItem className="navText" style={{ padding: '7px 10px' }}>
                  <NavLink>ALL PRODUCTS</NavLink>
                </NavItem>
              </Link>
              <UncontrolledDropdown
                nav
                inNavbar
                className="navText"
                style={{ padding: '7px 10px' }}
              >
                <DropdownToggle nav caret>
                  USER
                </DropdownToggle>
                <DropdownMenu right>
                  <Link to="/">
                    <DropdownItem>Profile</DropdownItem>
                  </Link>
                  <Link to="/history">
                    <DropdownItem>History</DropdownItem>
                  </Link>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </Nav>
          {this.renderLogInfo()}
        </Collapse>
      );
    } else {
      return (
        <Collapse
          isOpen={this.state.isOpen}
          navbar
          className="justify-content-between px-4"
          style={{ backgroundColor: 'rgba(255,202,0,1', borderRadius: '20px', height: '100px' }}
        >
          <Nav className="mr-auto" navbar>
            <div className="d-flex">
              <Link to="/">
                <NavItem className="navText" style={{ padding: '7px 10px' }}>
                  <NavLink>BLOG</NavLink>
                </NavItem>
              </Link>
              <Link to="/">
                <NavItem className="navText" style={{ padding: '7px 10px' }}>
                  <NavLink>ALL PRODUCTS</NavLink>
                </NavItem>
              </Link>
            </div>
          </Nav>
          <Nav navbar>
            <div className="d-flex">
              <Link to="/login">
                <Button color="warning" style={{ borderRadius: '20px' }} className="px-3 py-2 mr-2">
                  <b>Login</b>
                </Button>
              </Link>
              <Link to="/register">
                <Button color="warning" style={{ borderRadius: '20px' }} className="px-3 py-2">
                  <b>Register</b>
                </Button>
              </Link>
            </div>
          </Nav>
        </Collapse>
      );
    }
  };
  badgeIcon = () => {
    const { cart } = this.props;
    let output = cart.length;
    return (
      <div style={{ color: 'black', position: 'relative', top: '-10px', fontWeight: 'bold' }}>
        {output}
      </div>
    );
  };
  renderLogInfo = () => {
    if (this.props.email !== '') {
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className="mr-4 navText d-flex" style={{ padding: '20px 10px' }}>
            <Link to="/cart">
              <img src={ShoppingCartLogo} alt="ERR:file_not_found" height="30" width="30" />
            </Link>
            <div>{this.badgeIcon()}</div>
          </div>
          <NavbarText
            style={{
              color: 'black',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            <div>Welcome, {this.props.username}</div>
          </NavbarText>
          <div className="mx-3 mr-4">
            <Link>
              <img src={Ava} alt="ERR:file_not_found" height="50" width="50" />
            </Link>
          </div>
          <Button
            color="danger"
            onClick={this.props.logoutAction}
            className="my-2"
            style={{ borderRadius: '20px' }}
          >
            Logout
          </Button>
        </div>
      );
    }
  };

  render() {
    // const { getCartByUserIdAction, userID } = this.props;
    // getCartByUserIdAction(userID);

    return (
      <div>
        <Navbar
          expand="md"
          light
          style={{
            height: '100px',
            // color: 'black',
            backgroundColor: 'rgba(245,245,245)',
            boxShadow: '0 1px 10px rgba(0,0,0,0.25)',
            fontWeight: 'bold',
            color: 'white',
          }}
          className="px-5"
        >
          <Link to="/">
            <NavbarBrand>
              <img src={YuchaseLogo} alt="ERR:file_not_found" height="60" width="75" />
            </NavbarBrand>
          </Link>
          <NavbarToggler onClick={this.toggle} />
          {this.renderNavIsLogin()}
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = ({ user, cart }) => {
  return {
    email: user.email,
    username: user.username,
    id: user.id,
    cart: cart.cart,
  };
};

export default connect(mapStateToProps, { logoutAction, getCartByUserIdAction })(NavigationBar);
