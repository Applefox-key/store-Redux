import "./styles/index.scss";
import "./styles/App.scss";
import "./styles/animations.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartData, sendCartData } from "./store/cart/cart-actions";
import { Route, Routes } from "react-router-dom";
import { privateRoutes } from "./routes/routes";
import { getUserData } from "./store/user/user-actions";
import Cart from "./components/Cart/Cart";
import Header from "./components/Header";
import Notification from "./components/UI/Notification";
let isFistRendering = 0;

function App() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(getUserData());
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isFistRendering < 2) {
      isFistRendering += 1;
      return;
    }
    if (cart.changed) dispatch(sendCartData(cart));
  }, [cart, dispatch]);

  return (
    <div>
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
      <div className="wrapper p-40">
        <Cart />
        <Header isMainPage={window.location.pathname === "/home"} />
        <Routes>
          {privateRoutes.map((item, i) => (
            <Route path={item.path} element={item.element} key={i} />
          ))}
        </Routes>{" "}
      </div>
    </div>
  );
}

export default App;
