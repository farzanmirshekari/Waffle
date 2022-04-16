import React from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar/NavigationBar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import './App.css';
import HomePage from './components/Index/HomePage';

function App() {
  return (
    <div className="main_container">

      <NavigationBar />

      <Router>
        <Routes>
          <Route path = '/' element = { <HomePage /> }/>
        </Routes>
      </Router>
      

    </div>
  );
}

export default App;
