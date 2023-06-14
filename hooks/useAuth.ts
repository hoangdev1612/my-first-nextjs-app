import axios from "axios";
import { useContext } from "react";
import AuthContext, { AuthenticationContext } from "../context/AuthContext";
import { deleteCookie, getCookie } from "cookies-next";

const useAuth = () => {
  const { setAuthState } = useContext(AuthenticationContext);
  const signin = async ({
    email,
    password,
    handleClose,
  }: {
    email: string;
    password: string;
    handleClose: () => void;
  }) => {
    setAuthState({
      data: null,
      loading: true,
      error: null,
    });
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signin",
        {
          email,
          password,
        }
      );
      setAuthState({
        data: response.data,
        loading: false,
        error: null,
      });
      handleClose();
    } catch (error: any) {
      console.log(error.response.data.message);

      setAuthState({
        data: null,
        loading: false,
        error: error.response.data.message,
      });
    }
  };
  const signup = async ({
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
    city,
    handleClose,
  }: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    city: string;
    handleClose: () => void;
  }) => {
    setAuthState({
      data: null,
      loading: true,
      error: null,
    });
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        {
          email,
          password,
          firstName,
          lastName,
          phoneNumber,
          city,
        }
      );
      setAuthState({
        data: response.data,
        loading: false,
        error: null,
      });
      handleClose();
    } catch (error: any) {
      console.log(error.response.data.message);

      setAuthState({
        data: null,
        loading: false,
        error: error.response.data.message,
      });
    }
  };

  const signout = async () => {
    deleteCookie("jwt");
    setAuthState({
      data: null,
      loading: false,
      error: null,
    });
  };

  return {
    signin,
    signup,
    signout,
  };
};

export default useAuth;
