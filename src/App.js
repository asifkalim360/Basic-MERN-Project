// using App.css for styling in main App.js
import './App.css';

//importing  nav.js and some other important things.
import Nav from './components/Nav'
import { BrowserRouter, Routes, Route} from 'react-router-dom';

//importing  footer.js and some other important things.
import Footer from './components/Footer';

//importing  signUp.js and some other important things.
import SignUp from './components/SignUp';

//importing PrivateComponent.js and other important things
import PrivateComponent from './components/PrivateComponent'

//importing login.js 
import Login from './components/Login'

//importing AddProduct.js---
import AddProduct from './components/AddProduct';

//importing ProductList.js---
import ProductList from './components/ProductList';

//importing UpdateProduct.js---
import UpdateProduct from './components/UpdateProduct';

function App() { 
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<ProductList />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
            <Route path="/update" element={<h1>Please Select the product for Update</h1>} />
            <Route path="/logout" element={<h1>Logout Component</h1>} />
            <Route path="/profile" element={<h1>Profile Component</h1>} />
          </Route>
          
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          
        </Routes>
      </BrowserRouter> 

      <Footer />
    </div>
  );
}

export default App;
