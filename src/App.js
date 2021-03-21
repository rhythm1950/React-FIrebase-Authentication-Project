import './App.css';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import CreateAccount from './Components/CreateAccount/CreateAccount';
import Mismatch from './Components/Mismatch/Mismatch';
import Contact from './Components/Contact/Contact';
import { createContext, useState } from 'react';
import Pick from './Components/Pick/Pick';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Summary from './Components/Summary/Summary';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});


  // repo link : https://github.com/Porgramming-Hero-web-course/react-auth-Rhythm1950



  return (
    <UserContext.Provider value = {[loggedInUser, setLoggedInUser]}>
      
      <Router>
      <Header></Header>
        <Switch>
          <Route path="/home">
            <Home></Home>
          </Route>
          <PrivateRoute path="/pick">
            <Pick></Pick>
          </PrivateRoute>
          <Route path="/contact">
            <Contact></Contact>
          </Route>
          <Route path="/destination">
            <CreateAccount></CreateAccount>
          </Route>
          <Route path="/summary">
            <Summary></Summary>
          </Route>
          <Route path="/login">
            <CreateAccount></CreateAccount>
          </Route>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="*">
            <Mismatch></Mismatch>
          </Route>
        </Switch>
      </Router>

      </UserContext.Provider>
  );
}

export default App;
