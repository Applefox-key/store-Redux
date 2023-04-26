import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cl from "./Orders.module.scss";
import OneOrderItem from "./OneOrderItem";
import { Link, useNavigate } from "react-router-dom";
import { allRouts } from "../../routes/routes";
import Modal from "../UI/Modal/Modal";
import EditProfileForm from "../User/EditProfileForm";
import Auth from "../User/Auth";
import BtnToHome from "../UI/BtnToHome";
import { placeAnOrder } from "../../store/user/user-actions";
import { isAllValuesFilled } from "../../utils/validation";
import { orderShipmentStruct } from "../../utils/userDataStruct";
import uiSlice from "../../store/ui/ui-slice";

const NewOrderPage = () => {
  const [modal, setModal] = useState();
  const cart = useSelector((state) => state.cart);
  const isAuth = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.user);
  const { profile } = user; // useSelector((state) => state.user);
  const [userData, setUserData] = useState({
    ...profile,
  });
  const dispatch = useDispatch();
  const router = useNavigate();
  const editDone = () => {
    setModal(false);
    setUserData(profile);
  };
  const placeNewOrder = () => {
    const [isValid, errorMsg] = isAllValuesFilled(
      userData,
      orderShipmentStruct
    );
    if (!isValid) {
      dispatch(
        uiSlice.actions.showNotification({ message: errorMsg, type: "error" })
      );
      return;
    }
    dispatch(placeAnOrder({ ...cart, "shipmentSettings": userData })).then(
      (orderId) => {
        router(allRouts.ORDERS + "/" + orderId);
      }
    );
  };
  useEffect(() => {
    if (!isAuth) return;
    setModal(false);
    setUserData(profile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  return (
    <div className={cl.oneOrderPage}>
      <div className="d-flex align-items-center">
        <BtnToHome />
        <h5>back to shopping</h5>
      </div>
      {modal && (
        <Modal closeModal={() => setModal(false)}>
          <Auth />
        </Modal>
      )}
      <div className={cl.header}>
        <div className={cl.newOrderinfo + " basic-wrap"}>
          <div className="basic-flex">
            {!isAuth && (
              <>
                <h5>SHIPPING ADRESS</h5>
                <div>
                  <span>Continue as guest or </span>
                  <Link to="#" onClick={() => setModal(true)}>
                    Login
                  </Link>
                </div>
              </>
            )}
          </div>
          <div className="basic-flex ">
            <EditProfileForm
              finalCallBack={editDone}
              isBackBtn={false}
              userData={userData}
              setUserData={setUserData}
              rowClass="mb-1px"
            />
          </div>
        </div>{" "}
        <div className={cl.newOrderinfo + " basic-wrap " + cl.payment}>
          <h5>PAYMENT </h5>
          <div>
            <input type="radio" id="payPal" name="payment" value="PayPal" />
            <label htmlFor="payPal">PayPal</label>
          </div>
          <div>
            <input type="radio" id="card" name="payment" value="Card" />
            <label htmlFor="card">Card</label>
          </div>
          <div>
            <input
              type="radio"
              id="googlePay"
              name="payment"
              value="GooglePay"
            />
            <label htmlFor="googlePay">GooglePay</label>
          </div>{" "}
          <div className="filler"></div>
          <h6>Shipment ardess</h6>
          <div>
            {userData.firstName} {userData.lastName}
          </div>
          <div> {userData.phone}</div>
          <div>
            {userData.city}, {userData.state}, USA
          </div>{" "}
          <button className="colorbtn w-100 mt-3" onClick={placeNewOrder}>
            Pay {cart.totalPrice}$
          </button>
        </div>
      </div>
      <div className=" basic-wrap">
        {cart.itemsList.map((item) => (
          <OneOrderItem key={item.id} item={item}></OneOrderItem>
        ))}
        <div className="filler"> </div>
        <div className={cl.total}>
          <div>Total</div>
          <div>{cart.totalPrice}$</div>
        </div>{" "}
      </div>
    </div>
  );
};

export default NewOrderPage;
