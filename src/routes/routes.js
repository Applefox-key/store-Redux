import Favorite from "../components/Favorite/Favorite";
import SingleItem from "../components/Items/SingleItem";
import Layout from "../components/Layout/Layout";
import OrdersPage from "../components/Orders/OrdersPage";

export const allRouts = {
  "FAVORITE": "/favorite",
  "HOME": "/home",
  PROFILE: "/profile",
};

export const privateRoutes = [
  { path: "/home", element: <Layout />, nameNav: "" },
  { path: "/favorite", element: <Favorite />, nameNav: "" },
  { path: "/*", element: <Layout />, nameNav: "" },
  { path: "/profile", element: <OrdersPage />, nameNav: "" },
  { path: "/item/:id", element: <SingleItem />, nameNav: "" },
];
