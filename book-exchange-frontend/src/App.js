import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import SearchBooks from './components/SearchBooks';
import Signup from './signup';
import Login from './login';
import Profile from './components/Profile';
import ExchangeRequests from './components/ExchangeRequests';
import Register from './Register';



/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

const App = () => {
  return (
    <Router>
    <div>
      <h1>Welcome to the Book Exchange Platform</h1>
      <nav>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
        <Link to="/books">Book List</Link>
        <Link to="/add-book">Add Book</Link>
        <Link to="/search-books">Search Books</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/exchange-requests">Exchange Requests</Link>
      </nav>
      <Routes>
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/books" element={<BookList />} />
          <Route exact path="/add-book" element={<AddBook />} />
          <Route exact path="/edit-book/:id" element={<EditBook />} />
          <Route exact path="/search-books" element={<SearchBooks />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/exchange-requests" element={<ExchangeRequests />} />
        </Routes>
    </div>
    </Router>
  );
};


export default App;


// const App = () => {
//   return (
//     <Router>
//       <div>
//         <h1>Welcome to the Book Exchange Platform</h1>
//         <nav>
//           <Link to="/signup">Signup</Link>
//           <Link to="/login">Login</Link>
//           <Link to="/books">Book List</Link>
//           <Link to="/add-book">Add Book</Link>
//         </nav>
//         <Switch>
//           <Route exact path="/signup" component={Signup} />
//           <Route exact path="/login" component={Login} />
//           <Route exact path="/books" component={BookList} />
//           <Route exact path="/add-book" component={AddBook} />
//           <Route exact path="/edit-book/:id" component={EditBook} />
//         </Switch>
//       </div>
//     </Router>
//   );
// };

// export default App;




