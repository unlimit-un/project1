import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import './css/style.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { legacy_createStore as createStore} from 'redux'
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(rootReducer)
root.render(
  <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
