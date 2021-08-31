import './App.css';
import Header from './conponents/Header/Header';
import Home from './conponents/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Checkout from './conponents/Checkout/Checkout';
import Login from './conponents/Login/Login';
import { useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { useStateValue } from './conponents/StateProvider/StateProvider';


function App() {

  const [{ }, dispatch] = useStateValue();

  useEffect(() => {
    // will only run onces when the app componts load..............
    const auth = getAuth();
    auth.onAuthStateChanged(authUser => {
      console.log('THE USER IS >>>>>', authUser);
      if (authUser) {
        // the user just logged in / the user was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })

      } else {
        // the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }

    })

  }, []);

  return (
    <div className="app">
      {/*HEADR */}

      <Router>

        <Switch>
          <Route exact path="/">
            <Header />
            <Home />
          </Route>
          <Route path="/home">
            <Header />
            <Home />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
