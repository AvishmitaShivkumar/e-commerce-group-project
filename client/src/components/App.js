import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./cart";
import Checkout from "./checkout";
import HomePage from "./homepage";
import CompanyPage from "./company";
import Confirmation from "./confirmation";
import Error from "./error";
import Header from "./header";
import ProductCatalog from "./productcatalog";
import ProductPage from "./productpage";
import SearchPage from "./searchpage";
import SignIn from "./signin";
import SignUp from "./signup";
import GlobalStyles from "./globalstyles";
import ContactSupport from "./contact";
import SignUpConfirmation from "./SignUpConfirmation";
import { UserContext } from "./UserContext";
import { useContext, useState } from "react";

function App() {

    const {currentUser} = useContext(UserContext);
    const [finalTotal, setFinalTotal] = useState(0)


  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/cart" element={!currentUser===null ? <Cart finalTotal={finalTotal} setFinalTotal={setFinalTotal}/> : <SignIn />}/>
        <Route path="/checkout" element={<Checkout finalTotal={finalTotal}/>} />
        <Route path="/company/:_id" element={<CompanyPage />} />
        {/* <Route path="/confirmation" element={<Confirmation />} /> */}
        <Route path="/confirmation/:orderId" element={<Confirmation />} />
        <Route path="/catalog/:category" element={<ProductCatalog />} />
        <Route path="/products/:product" element={<ProductPage />} />
        <Route path="/searchpage" element={<SearchPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signupconfirmation" element={<SignUpConfirmation />} />
        <Route path="/contactsupport" element={<ContactSupport />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
