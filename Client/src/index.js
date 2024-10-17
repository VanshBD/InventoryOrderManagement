import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Constents from './Commen/Constents';
import { Path } from './Commen/Path';
import { Home, ProductDetails, Products,Checkout } from "./pages";
import LoginSignUp from './components/LoginSign/LoginSignUp';
import OrderDetails from './pages/OrderDetails';
import { Navbar } from './components';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
serviceWorkerRegistration.register()

const App = () => {
  const [Auth, setAuth] = useState(Constents.getUserDetails());

  console.log(Auth, "wdnurn");

  return (
    <BrowserRouter>
      <AppContent Auth={Auth} setAuth={setAuth} />
    </BrowserRouter>
  );
};

const AppContent = ({ Auth, setAuth }) => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== Path.login && <Navbar setAuth={setAuth} />}
      <Routes>
        <Route path={Path.homescreen} element={<Home Auth={Auth} setAuth={setAuth} />} />
        <Route path={Path.product} element={<Products />} />
        <Route path={Path.productdetails} element={<ProductDetails />} />
        <Route path={Path.login} element={<LoginSignUp Auth={Auth} setAuth={setAuth} />} />
        <Route path={Path.checkout} element={<Checkout />} />
        <Route path={Path.Orderdetails} element={<OrderDetails />} />
      </Routes>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
