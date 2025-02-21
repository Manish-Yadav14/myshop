import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import { Route } from "react-router-dom";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Signup from "./components/Signup";
import MyCart from "./components/MyCart";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./app/store";
import { Provider } from "react-redux";
import Products from "./components/Products";
import Success from "./components/Success";
import Failed from "./components/Failed";
// import Payment from './components/Payment'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="mycart" element={<MyCart />} />
        <Route path="products" element={<Products />} />
      </Route>
      <Route path="success" element={<Success />} />
      <Route path="failed" element={<Failed />} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
