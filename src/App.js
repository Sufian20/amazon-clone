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
import Payment from './conponents/Payment/Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

function App() {

  const promise = loadStripe("pk_test_51H30t6EgeRexmKh6jTLhd6sZp3KfMl81aDDQdZlsluHGRJ1jYjdbm7mB3ZnIMEZnlb8vtpLskgsRpjYR7EDvOByN00gymsmdWI");

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
          <Route path="/payment">
            <Header />
            <Elements stripe={promise} >
              <Payment />
            </Elements>
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
