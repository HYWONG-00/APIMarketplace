import {
  Routes,
  Route,
  BrowserRouter
} from 'react-router-dom';
import './App.css';
import React from 'react';

import { useGetUser } from "./hooks";

import Dashboard from './pages/dashboard';
import Orders from './pages/orders';
import Customers from './pages/customers';
import Api from './pages/api';
import Signin from './pages/signin';
import Signup from './pages/signup';


function App() {
  const [{ user }, dispatch] = useGetUser();
  console.log(user)
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={user ? <Dashboard user={user} dispatch={dispatch}/> : <Signin dispatch = {dispatch}/>} />
          <Route exact path="/signin" element={<Signin dispatch = {dispatch}/>} />
          <Route exact path="/signup" element={<Signup dispatch = {dispatch}/>} />
          <Route exact path="/dashboard" element={<Dashboard user={user} dispatch={dispatch}/>} />
          <Route exact path="/api" element={<Api user={user} dispatch={dispatch}/>} />
          <Route exact path="/customers" element={<Customers user={user} dispatch={dispatch}/>} />
          <Route exact path="/orders" element={<Orders user={user} dispatch={dispatch}/>} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
