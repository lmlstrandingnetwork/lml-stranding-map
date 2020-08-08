import React, { useEffect, useState } from "react";
import app from "./config/Fire";

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);

      app
        .auth()
        .currentUser.getIdToken(true)
        .then(function (idToken) {
          setUserToken(idToken);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }, [userToken]);

  if (pending) {
    return <>Loading...</>;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
