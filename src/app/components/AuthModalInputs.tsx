import { Button, TextField } from "@mui/material";

interface AuthModalInputsProps {
  inputs: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    city: string;
    password: string;
  };
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSignedIn: boolean;
}

const AuthModalInputs = ({
  inputs,
  handleChangeInput,
  isSignedIn,
}: AuthModalInputsProps) => {
  return (
    <div>
      {!isSignedIn && (
        <div className="my-3 flex justify-between text-sm">
          <TextField
            className="p-2 py-3 w-[49%]"
            margin="dense"
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            value={inputs.firstName}
            onChange={handleChangeInput}
            name="firstName"
          />
          <TextField
            className="p-2 py-3 w-[49%]"
            margin="dense"
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            value={inputs.lastName}
            onChange={handleChangeInput}
            name="lastName"
          />
        </div>
      )}
      <div className="my-3 flex justify-between text-sm">
        <TextField
          className="p-2 py-3 w-full"
          margin="dense"
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={inputs.email}
          onChange={handleChangeInput}
          name="email"
          type="email"
        />
      </div>
      {!isSignedIn && (
        <div className="my-3 flex justify-between text-sm">
          <TextField
            className="p-2 py-3 w-[49%]"
            margin="dense"
            id="outlined-basic"
            label="Phone Number"
            variant="outlined"
            value={inputs.phoneNumber}
            onChange={handleChangeInput}
            name="phoneNumber"
          />
          <TextField
            className="p-2 py-3 w-[49%]"
            margin="dense"
            id="outlined-basic"
            label="City"
            variant="outlined"
            value={inputs.city}
            onChange={handleChangeInput}
            name="city"
          />
        </div>
      )}
      <div className="my-3 flex justify-between text-sm">
        <TextField
          className="p-2 py-3 w-full"
          margin="dense"
          id="outlined-basic"
          label="Password"
          variant="outlined"
          value={inputs.password}
          onChange={handleChangeInput}
          name="password"
          type="password"
        />
      </div>
      {/* <div className="my-3 flex justify-between text-sm">
        <TextField
          className="p-2 py-3 w-full"
          margin="dense"
          id="outlined-basic"
          label="Confirm Password"
          variant="outlined"
        />
      </div> */}
    </div>
  );
};

export default AuthModalInputs;
