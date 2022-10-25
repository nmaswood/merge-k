import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Snackbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { UserRole } from "./users/user-service";
import { USER_SERVICE } from "./users/user-service-impl";

export const AddUsers: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [role, setRole] = useState<UserRole>("admin");
  const navigate = useNavigate();

  const getError = () => {
    if (firstName.length === 0) {
      return "Empty first name";
    }
    if (lastName.length === 0) {
      return "Empty last name";
    }
    if (email.length === 0) {
      return "Empty email";
    }

    if (phone.length === 0) {
      return "Empty phone";
    }
    if (city.length === 0) {
      return "Empty city";
    }
    return undefined;
  };
  const error = getError();

  const [errorOpen, setErrorOpen] = useState(false);

  const submit = async () => {
    if (error) {
      setErrorOpen(true);
    }

    await USER_SERVICE.create({
      email,
      firstName,
      lastName,
      tel: phone,
      city,
      role,
    });
    navigate("/");
  };

  return (
    <Box>
      <Snackbar
        open={errorOpen}
        autoHideDuration={6000}
        onClose={() => setErrorOpen(false)}
        message={error}
      />
      <Typography align="center" variant="h5">
        Add a user
      </Typography>

      <Box display="flex" flexDirection="column">
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
        >
          <Box>
            <TextField
              required
              label="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              inputProps={{ minLength: 1 }}
            />
            <TextField
              required
              label="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Box>
          <Box>
            <TextField
              required
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              required
              label="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Box>
          <Box display="flex" alignItems="center">
            <TextField
              required
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <Select
              required
              value={role}
              label="Role"
              onChange={(v) => setRole(v.target.value as UserRole)}
            >
              <MenuItem value={"admin"}>Admin</MenuItem>
              <MenuItem value={"employee"}>Employee</MenuItem>
            </Select>
          </Box>
        </Box>
        <Button onClick={submit}>Submit</Button>
      </Box>
    </Box>
  );
};
