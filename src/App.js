import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Home from './components/Home';
import Register from './components/users/Register';
import Login from './components/users/Login';
import ForgotPassword from './components/users/ForgotPassword';
import ResetPassword from './components/users/ResetPassword';
import PrivateRoute from './components/PrivateRoute';
import AddInvoice from './components/invoices/AddInvoice';
import Invoices from './components/invoices/ListInvoices';
import Dashboard from './components/Dashboard';
import AddCustomer from './components/customers/AddCustomer';
import Customers from './components/customers/ListCustomers';
import AddProduct from './components/products/AddProduct';
import Products from './components/products/ListProducts';
import Preview from './components/invoices/Preview';
import Print from './components/invoices/Print';

function App(){

  return(
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/register' component={Register}></Route>
        <Route exact path='/login' component={Login}></Route>
        <Route exact path='/forgot-password' component={ForgotPassword}></Route>
        <Route exact path='/reset-password/:token' component={ResetPassword}></Route>
        <PrivateRoute exact path='/dashboard' component={Dashboard}></PrivateRoute>
        <PrivateRoute exact path='/invoices' component={Invoices}></PrivateRoute>
        <PrivateRoute exact path='/invoices/add' component={AddInvoice}></PrivateRoute>
        <PrivateRoute exact path='/invoices/edit/:id' component={AddInvoice}></PrivateRoute>
        <PrivateRoute exact path='/customers' component={Customers}></PrivateRoute> 
        <PrivateRoute exact path='/customers/add' component={AddCustomer}></PrivateRoute>
        <PrivateRoute exact path='/customers/edit/:id' component={AddCustomer}></PrivateRoute>
        <PrivateRoute exact path='/products' component={Products}></PrivateRoute> 
        <PrivateRoute exact path='/products/add' component={AddProduct}></PrivateRoute>
        <PrivateRoute exact path='/products/edit/:id' component={AddProduct}></PrivateRoute>
        <PrivateRoute exact path='/preview' component={Preview}></PrivateRoute>
        <PrivateRoute exact path='/print' component={Print}></PrivateRoute>
        </Switch>
    </BrowserRouter>
  )
}

export default App;
