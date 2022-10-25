import "./App.css";
import { UserDisplay } from "./user-display";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { useLogin } from "./login/use-login";

import { AddUsers } from "./add-users";

export default function App() {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<UserDisplay />} />
          <Route path="userdisplays" element={<UserDisplay />} />
          <Route path="addusers" element={<AddUsers />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </Box>
  );
}

const Layout = () => {
  return (
    <Box padding={2}>
      <Box marginBottom={2} display="flex" justifyContent="space-between">
        <Typography variant="h5">Zamp</Typography>
        <LoginButton />
      </Box>
      <Outlet />
    </Box>
  );
};

const LoginButton = () => {
  const { isLoggedIn, logIn, logOut } = useLogin();
  return (
    <Button onClick={isLoggedIn ? logOut : logIn}>
      {isLoggedIn ? "Logout" : "Login"}
    </Button>
  );
};

const NoMatch = () => {
  return (
    <Box>
      <Typography>Nothing to see here!</Typography>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </Box>
  );
};
