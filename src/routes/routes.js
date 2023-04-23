import Favorite from "../components/Favorite/Favorite";
import SingleItem from "../components/Items/SingleItem";
import Layout from "../components/Layout/Layout";
import NewOrderPage from "../components/Orders/NewOrderPage";
import OneOrderPage from "../components/Orders/OneOrderPage";
import OrdersPage from "../components/Orders/OrdersPage";
import Auth from "../components/User/Auth";
import ProfilePage from "../components/User/ProfilePage";

export const allRouts = {
  FAVORITE: "/favorite",
  HOME: "/home",
  ORDERS: "/orders",
  PROFILE: "/profile",
  LOGIN: "/login",
  NEW_ORDER: "/orders/new",
};

export const privateRoutes = [
  { path: "/*", element: <Layout />, nameNav: "" },
  { path: "/home", element: <Layout />, nameNav: "" },
  { path: "/favorite", element: <Favorite />, nameNav: "" },
  { path: "/orders", element: <OrdersPage />, nameNav: "" },
  { path: "/orders/new", element: <NewOrderPage />, nameNav: "" },
  { path: "/login", element: <Auth />, nameNav: "" },
  { path: "/profile", element: <ProfilePage />, nameNav: "" },
  { path: "/item/:id", element: <SingleItem />, nameNav: "" },
  { path: "/orders/:id", element: <OneOrderPage />, nameNav: "" },
];
