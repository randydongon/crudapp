import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import AddNewProduct from './Components/AddNewProduct';
import ViewProduct from './Components/ViewProduct';
import EditProduct from './Components/EditProduct';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route exact path="/" component={App} />
      <Route path="/create/" component={AddNewProduct} />
      <Route path="/show/:id" component={ViewProduct} />
      <Route path="/edit/:id" component={EditProduct} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
