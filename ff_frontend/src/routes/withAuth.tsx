import React from "react";
import { Navigate } from "react-router-dom";
import { store } from "../redux/store";

  
const withAuth = <P extends object>(Component: React.ComponentType, Error: React.ComponentType) =>
    class WithAuth extends React.Component<P> {

      isAuthenticated = () => {
        const authKey = store.getState().users.authKey;
        return authKey === "#1234";
      }
      render() {
        if(!this.isAuthenticated()){
            return <Navigate to="/errorPage" />
        }
        return <Component />;
      }
    };

export default withAuth;