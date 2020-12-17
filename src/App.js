import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { NavigationBar } from './components';
import { LoginPage, CartPage, HistoryPage, Home, Coret } from './pages';
import { keepLogin } from './redux/action';
import { connect } from 'react-redux';

class App extends Component {
  state = {};

  componentDidMount() {
    const id = localStorage.getItem('id');
    if (id) {
      this.props.keepLogin(id);
    }
  }

  render() {
    return (
      <div>
        <NavigationBar></NavigationBar>
        <Route path="/" exact component={Home}></Route>
        <Route path="/login" component={LoginPage}></Route>
        <Route path="/cart" component={CartPage}></Route>
        <Route path="/history" component={HistoryPage}></Route>
        <Route path="/coret" component={Coret}></Route>
      </div>
    );
  }
}

const mapStateToProps = (state) => {};

export default connect(mapStateToProps, { keepLogin })(App);
