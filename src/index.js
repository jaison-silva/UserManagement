import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; 
import 'process';
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter } from 'react-router-dom';
import './input.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
  // </StrictMode>
);
