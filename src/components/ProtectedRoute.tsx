import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import { IonSpinner } from "@ionic/react";

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
  path: string;
  exact?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
  const [user, loading] = useAuthState(auth);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (loading) {
          return (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "50%" }}>
              <IonSpinner name="crescent" />
            </div>
          );
        }

        if (!user) {
          return <Redirect to="/login" />;
        }

        return <Component {...props} />;
      }}
    />
  );
};

export default ProtectedRoute;
