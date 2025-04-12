import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import { IonSpinner } from "@ionic/react";

// Props for the protected route
interface ProtectedRouteProps {
  component: React.ComponentType<any>;  // The component to render if authenticated
  path: string;                         // The route path
  exact?: boolean;                      // Optional: matches exact route only
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
  const [user, loading] = useAuthState(auth); // useAuthState gives us the current user and loading status
  
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
