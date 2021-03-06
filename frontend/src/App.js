import {Container} from 'react-bootstrap'
import { BrowserRouter as Router,Route } from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Homescreen from './Screens/Homescreen'
import ProductScreen from './Screens/ProductScreen'
import CartScreen from './Screens/CartScreen'
import LoginScreen from './Screens/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen'
import ProfileScreen from './Screens/ProfileScreen'
import ShippingScreen from './Screens/ShippingScreen'
import PaymentScreen from './Screens/PaymentScreen'
import PlaceOrderScreen from './Screens/PlaceOrderScreen'
import OrderScreen from './Screens/OrderScreen'
import UserListScreen from './Screens/UserListScreen'
import UserEditScreen from './Screens/UserEditScreen'
import ProductListScreen from './Screens/ProductListScreen'
import ProductEditScreen from './Screens/ProductEditScreen'
import OrderListScreen from './Screens/OrderListScreen'
function App() {
  return (
    <Router>
      <Header />
      <main className= "py-3">
        <Container>
        <Route path='/' component={Homescreen} exact />
        <Route path='/login' component={LoginScreen} />
        <Route path='/register' component={RegisterScreen} />
        <Route path='/profile' component={ProfileScreen} />
        <Route path='/shipping' component={ShippingScreen} />
        <Route path='/placeorder' component={PlaceOrderScreen} />
        <Route path='/orders/:id' component={OrderScreen} />
        <Route path='/payment' component={PaymentScreen} />
        <Route path='/Product/:id' component={ProductScreen}/>
        <Route path='/cart/:id?' component={CartScreen}/>

        <Route path='/admin/userlist' component={UserListScreen} />
        <Route path='/admin/user/:id/edit' component={UserEditScreen} />

        <Route path='/admin/productlist' component={ProductListScreen} />
        <Route path='/admin/product/:id/edit' component={ProductEditScreen} />

        <Route path='/admin/orderlist' component={OrderListScreen} />
      </Container>
      </main>
      <Footer />
     
      </Router>
  );
}

export default App;
