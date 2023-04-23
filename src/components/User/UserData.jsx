import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cl from "./profile.module.scss";
import { sendUserData } from "../../store/user/user-actions";
import { userDataStruct } from "../../utils/userDataStruct";
import EditProfileForm from "./EditProfileForm";

const UserData = () => {
  const [isEdit, setIsEdit] = useState(false);

  const user = useSelector((state) => state.user);
  const [userData, setUserData] = useState({
    ...user.profile,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.changed) dispatch(sendUserData(user));
  }, [user, dispatch]);

  return (
    <div>
      {!isEdit ? (
        <div className={"basic-wrap " + cl["user-data-text"]}>
          <button onClick={() => setIsEdit(true)}>✎Edit</button>
          {Object.values(userDataStruct).map((el) => (
            <div key={el.id}>
              <span>{el.label}</span>:{" "}
              {el.id === "password" ? "*****" : userData[el.id]}
            </div>
          ))}
        </div>
      ) : (
        <EditProfileForm
          finalCallBack={() => setIsEdit(false)}
          userData={userData}
          setUserData={setUserData}
          isBackBtn={true}
        />
      )}
    </div>
  );
};

export default UserData;
