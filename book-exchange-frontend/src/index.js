import React from 'react';
//import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './signup';
import Login from './login';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'; // Import the CSS file

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/*ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path="/" component={App} />
    </Switch>
  </Router>,
  document.getElementById('root')*/


ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<App />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
