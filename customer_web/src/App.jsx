import {
  Routes,
  Route,
  BrowserRouter
} from 'react-router-dom';
import './App.css';
import React from 'react';

import Layout from './components/ui/layout';

import { useGetUser } from "./hooks";

// Import pages
import Home from './pages/home';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import Marketplace from './pages/marketplace';
import Pricing from './pages/pricing';
import Subscriptions from './pages/subscriptions';
import PaymentHistory from './pages/payment_history';
import Profile from './pages/profile';
import Success from './pages/success';
import Cancel from './pages/cancel';
import Contact from './pages/contact';

function App() {
  const [{ user }, dispatch] = useGetUser();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Layout children={<Home />} user={user} dispatch={dispatch} />} />
          <Route exact path="/signin" element={<Layout children={<SignIn dispatch={dispatch}/>} />} />
          <Route exact path="/signup" element={<Layout children={<SignUp dispatch={dispatch} />} />} />
          
          <Route exact path="/marketplace" element={<Layout children={<Marketplace />} user={user} dispatch={dispatch} />} />
          <Route exact path="/pricing" element={<Layout children={<Pricing user={user}/>} user={user} dispatch={dispatch} />} />
          <Route exact path="/subscriptions" element={<Layout children={<Subscriptions user={user}/>} user={user} dispatch={dispatch} />} />
          <Route exact path="/payment_history" element={<Layout children={<PaymentHistory user={user} />} user={user} dispatch={dispatch} />} />
          <Route exact path="/profile" element={<Layout children={<Profile user={user} />} user={user} dispatch={dispatch} />} />
          <Route exact path="/contact" element={<Layout children={<Contact />} user={user} dispatch={dispatch} />} />

          <Route exact path="/success" element={<Layout children={<Success />} user={user} dispatch={dispatch} />} />
          <Route exact path="/cancel" element={<Layout children={<Cancel />} user={user} dispatch={dispatch} />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App;

