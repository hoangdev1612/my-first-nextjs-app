"use client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import React, { useContext, useEffect } from "react";
import { TextField } from "@mui/material";
import AuthModalInputs from "./AuthModalInputs";
import useAuth from "../../../hooks/useAuth";
import { AuthenticationContext } from "../../../context/AuthContext";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

export default function AuthModal({ isSignedIn }: { isSignedIn: boolean }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { signin } = useAuth();
  const { error } = useContext(AuthenticationContext);

  let classNameButton = isSignedIn ? "bg-blue-400 text-white" : "";

  const renderContent = (signedInContent: string, signUpContent: string) => {
    return isSignedIn ? signedInContent : signUpContent;
  };

  const [inputs, setInputs] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    city: "",
    password: "",
  });

  const [disabled, setDisabled] = React.useState(true);
  useEffect(() => {
    if (isSignedIn) {
      if (inputs.email && inputs.password) {
        return setDisabled(false);
      }
    } else {
      if (
        inputs.firstName &&
        inputs.lastName &&
        inputs.email &&
        inputs.phoneNumber &&
        inputs.city &&
        inputs.password
      ) {
        return setDisabled(false);
      }
    }
    setDisabled(true);
  }, [inputs]);

  const handlerClick = () => {
    if (isSignedIn) {
      signin({ email: inputs.email, password: inputs.password });
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className={`${classNameButton} border p-1 px-4 rounded mr-3`}
      >
        {renderContent("Sign in", "Sign out")}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="p-2 h-[600px]">
            <div className="flex justify-center">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {renderContent("Log Into Account", "Create Your account")}
              </Typography>
            </div>
            <AuthModalInputs
              inputs={inputs}
              handleChangeInput={handleChangeInput}
              isSignedIn={isSignedIn}
            />
            <button
              className="uppercase w-full bg-red-600 text-white p-3 rounded text-sm disabled:bg-gray-400"
              type="submit"
              disabled={disabled}
              onClick={handlerClick}
            >
              {renderContent("Sign In", "Create an account")}
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
