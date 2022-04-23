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
import SignIn from './components/Authentication/SignIn';
import SignUp from './components/Authentication/SignUp';
import CreateMessage from './components/Messaging/CreateMessage';
import BottomBar from './components/NavigationBar/BottomBar';

function App() {
  return (
    <div className = 'main_container overflow-y-hidden'>

      <Router>
        <NavigationBar />
          <Routes>
            <Route path = '/' element = { <HomePage /> }/>
            <Route path = '/create_message' element = { <CreateMessage /> }/>
            <Route path = '/sign_in' element = { <SignIn /> }/>
            <Route path = '/sign_up' element = { <SignUp /> }/>
          </Routes>
        <BottomBar />
      </Router>
      

    </div>
  );
}

export default App;
