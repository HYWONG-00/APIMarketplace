import { BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Signup from './components/Signup';
import Login from './components/Login';
import Pricing from './components/Pricing';

//by Ryan
import Payment from './components/Payment';
import Success from './components/Success';
import Cancel from './components/Cancel';
//by Ryan

//import Profile from './components/Profile';
import Customers from './components/Customers';
import Addcustomer from './components/AddCustomer';
import EditProduct from './components/EditProduct';
import ProductList from './components/ProductList';
import Landing from './components/Landing';

//by huiying
import Layout from './components/Layout';
import Payment_History from './overview/Payment_history';
import Dashboard from './components/Dashboard';
import Account from './overview/Account';
import Subscription from './overview/Subscription';
import PaymentHistory from "./overview/PaymentHistory";
import { Server, accountID, loginAccountID, paymentMethodsID } from './appwrite/config';
//by huiying

import { useGetUser } from "./hooks";
import Home from "./components/Home";


function App() {
  console.log('app')
  const [{ user, isLoading, isError }, dispatch] = useGetUser();

  return (
    
    // <BrowserRouter>
    // <Routes>
    //   <Route path='/login' element={<Login/>}/>
    //   <Route path='/signup' element={<Signup/>}/>
    //   <Route path='/pricing' element={<Pricing/>}/>
    //   <Route path='/payment' element={<Payment/>}/>
    //   <Route path='/success' element={<Success/>}/>
    //   <Route path='/cancel' element={<Cancel/>}/>
      
    //   {/* <Route path='/profile' element={<Profile/>}/> */}
    //   <Route path='/customers' element={<Customers/>}/>
    //   <Route path='/addcustomer' element={<Addcustomer/>}/>
    //   <Route path='/productList' element={<ProductList/>}/>
    //   <Route path='/editProduct' element={<EditProduct/>}/>
      
    //   <Route path='/paymenthistory' element={<Layout><Payment_History/></Layout>}/>
    //   <Route path='/' element={<Layout><Dashboard/></Layout>}/>
    //   <Route path='/account' element={<Layout><Account/></Layout>}/>
    //   <Route path='/subscription' element={<Layout><Subscription/></Layout>}/>
    //   <Route path='/paymentmethod' element={<Layout><Payment_Method documentID={paymentMethodsID}/></Layout>}/>
    // </Routes>
    // </BrowserRouter>
    <BrowserRouter>
      <Routes>
        <Route path ="/auth" element = {user ? <Navigate to="/home" /> : <Login dispatch={dispatch}/>}/>
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<Navigate to="/" />} />

        <Route path="/home" element={<Home user={user} dispatch={dispatch}/>} />
        <Route path='/account' element={<Account user={user} dispatch={dispatch}/>}/>
        <Route path='/pricing' element={<Pricing user={user} dispatch={dispatch}/>}/>
        <Route path='/subscriptions' element={<Subscription user={user} dispatch={dispatch}/>}/>
        <Route path='/paymentHistory' element={<PaymentHistory user={user} dispatch={dispatch}/>}/>
        <Route path='/success' element={<Success/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;