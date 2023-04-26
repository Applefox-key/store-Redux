import axios from "axios";
import { FAKE_DB, FIRE_BASE_DB, SESSION_ID } from "./constants";

export const SERVER_API = {
  makeUrl({ categoryId, title, price_min, price_max, offset, limit, isAll }) {
    let r =
      (title || categoryId || price_min || price_max || offset || limit
        ? "?"
        : "") +
      (title ? "title=" + title + "&" : "") +
      (price_min + price_max
        ? "price_min=" +
          Math.max(1, price_min) +
          "&price_max=" +
          (price_max ? price_max : 9999999999) +
          "&"
        : "") +
      (categoryId ? "categoryId=" + categoryId + "&" : "") +
      (!isAll && offset + limit ? "offset=" + offset + "&limit=" + limit : "");

    return r;
  },
  async login(sessionid, userid) {
    try {
      //link current session with user
      await axios.put(
        FIRE_BASE_DB + "/sessions/" + sessionid + "/user.json",
        JSON.stringify(userid)
      );
    } catch (error) {
      throw new Error("Failed to link session with user");
    }
  },
  async logout(sessionid) {
    try {
      //delete userid from current session
      await axios.delete(
        FIRE_BASE_DB + "/sessions/" + sessionid + "/user.json"
      );
    } catch (error) {
      throw new Error("Failed to link session with user");
    }
  },
  async getCartData(sessionid) {
    try {
      //get cart from current session
      const res = await axios.get(
        FIRE_BASE_DB + "/sessions/" + sessionid + "/cart.json"
      );
      //return object Cart
      return res;
    } catch (error) {
      throw new Error("Failed to link session with user");
    }
  },
  async putCartData(sessionid, cart) {
    try {
      //update current session's cart
      await axios.put(
        FIRE_BASE_DB + "/sessions/" + sessionid + "/cart.json",
        JSON.stringify(cart)
      );
    } catch (error) {
      throw new Error("Failed to link session with user");
    }
  },
  async getCategories() {
    try {
      //return an categories array
      const res = await axios(FAKE_DB + "/categories");
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async getProducts(atr) {
    try {
      //return an products array array
      const res = await axios.get(
        `${FAKE_DB}/products/${this.makeUrl({ ...atr, isAll: false })}`
      );
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async getProductsTotalPages(atr) {
    //atr: {categoryId, title, price_min, price_max, offset, limit, isAll}
    try {
      //get total pages for the products pagination considering filters
      const res = await axios.get(
        `${FAKE_DB}/products/${this.makeUrl({ ...atr, isAll: true })}`
      );
      return Math.ceil(res.data.length / atr.limit);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async getUserData() {
    try {
      //get users data by session id
      const dataReq = await axios.get(
        `${FIRE_BASE_DB}/sessions/${SESSION_ID}/user.json`
      );
      if (!dataReq.data) return "";
      const userid = dataReq.data;
      const res = await axios.get(`${FIRE_BASE_DB}/users/${userid}/user.json`);
      return res.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async sendUserData(user) {
    try {
      //send users data by session id
      const userid = user.profile.id;
      await axios.put(
        `${FIRE_BASE_DB}/users/${userid}/user.json`,
        JSON.stringify(user)
      );
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async placeAnOrder(order) {
    try {
      const userid = order.shipmentSettings.id;
      const orderId = crypto.randomUUID();
      const new_order = { ...order, "id": orderId };
      //send order to the server -and get an order id from a real server
      await axios.put(
        `${FIRE_BASE_DB}/users/${
          userid ? userid + "/user" : "GUESTS"
        }/orders/${orderId}.json`,
        JSON.stringify(new_order)
      );
      return orderId;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export const adressApi = {
  async getCitysByZipCode(zipCode) {
    try {
      const response = await fetch(`https://api.zippopotam.us/us/${zipCode}`);
      if (!response.ok) {
        throw new Error("Failed to fetch city");
      }
      const data = await response.json();
      return data.places.map((place) => place["place name"]);
    } catch (error) {
      // console.error(error);
      return [];
    }
  },

  async getStatesByZipCode(zipCode) {
    try {
      const response = await fetch(`https://api.zippopotam.us/us/${zipCode}`);
      if (!response.ok) {
        throw new Error("Failed to fetch states");
      }
      const data = await response.json();
      return data.places.map((place) => place["state"]);
    } catch (error) {
      // console.error(error);
      return [];
    }
  },
};
