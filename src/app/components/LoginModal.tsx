"use client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import React from "react";
import { TextField } from "@mui/material";

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

export default function LoginModal({ isSignedIn }: { isSignedIn: boolean }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let classNameButton = isSignedIn ? "bg-blue-400 text-white" : "";

  const renderContent = (signedInContent: string, signUpContent: string) => {
    return isSignedIn ? signUpContent : signedInContent;
  };

  const formCreateAccount = () => {
    return (
      <>
        <TextField
          className="w-full"
          margin="dense"
          id="standard-basic"
          label="First Name"
          variant="standard"
        />
        <TextField
          className="w-full"
          margin="dense"
          id="standard-basic"
          label="Last Name"
          variant="standard"
        />
        <TextField
          className="w-full"
          margin="dense"
          id="standard-basic"
          label="Email"
          variant="standard"
        />
        <TextField
          className="w-full"
          margin="dense"
          id="standard-basic"
          label="Password"
          variant="standard"
        />
        <TextField
          className="w-full"
          margin="dense"
          id="standard-basic"
          label="Confirm Password"
          variant="standard"
        />
        <Button
          className="w-full"
          onClick={handleClose}
          type="submit"
          variant="contained"
          style={{ marginTop: "10px" }}
        >
          Create Account
        </Button>
      </>
    );
  };
  const formLogin = () => {
    return (
      <>
        <TextField
          className="w-full"
          margin="dense"
          id="standard-basic"
          label="Email"
          variant="standard"
        />
        <TextField
          className="w-full"
          margin="dense"
          id="standard-basic"
          label="Password"
          variant="standard"
        />
        <Button
          className="w-full mt-3"
          onClick={handleClose}
          type="submit"
          variant="contained"
          style={{ marginTop: "10px" }}
        >
          Login
        </Button>
      </>
    );
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className={`${classNameButton} border p-1 px-4 rounded mr-3`}
      >
        {renderContent("Sign out", "Sign in")}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-center">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {renderContent("Create an account", "Sign in")}
            </Typography>
          </div>
          {isSignedIn ? formLogin() : formCreateAccount()}
        </Box>
      </Modal>
    </div>
  );
}
