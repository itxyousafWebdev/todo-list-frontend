import React from 'react';
import logo from './logo.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import todolist from './components/todolist';
import editTask from './components/editTask';
import addTask from './components/addTask';


function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">

          <a className="navbar-brand" href="https://todo-list-yousaf.herokuapp.com/">
            <img src={logo} width="30" alt="todo logo"/>
          </a>
          <Link to='/' className="navbar-brand"> Yousaf Todo-list</Link>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02">
              <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to='/' className="nav-link"> Tasks </Link>
              </li>
              <li className="nav-item">
                <Link to='/add' className="nav-link"> Add Task </Link>
              </li>
            </ul>
          </div>
        </nav>

        <Route path="/" exact component={todolist}></Route>
        <Route path="/add" component={addTask}></Route>
        <Route path="/edit/:id" component={editTask}></Route>
      </div>
    </Router>
  );
}

export default App;
