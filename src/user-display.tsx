import { useState } from "react";
import { User, UserRole } from "./users/user-service";
import { useListUsers } from "./users/use-user";

import { UserId } from "./users/user-service";
import { USER_SERVICE } from "./users/user-service-impl";

import {
  Tab,
  Tabs,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Button,
  Box,
} from "@mui/material";

import { Link } from "react-router-dom";

export const UserDisplay: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>("admin");

  const { users } = useListUsers(selectedRole);
  const [selectedUserIds, setSelectedUserIds] = useState<Set<number>>(
    new Set()
  );

  const [deletedUsers, setDeletedUsers] = useState<Set<number>>(new Set());

  const deleteSelectedUsers = async () => {
    setDeletedUsers(new Set([...deletedUsers, ...selectedUserIds]));
    for (const userId of selectedUserIds) {
      await USER_SERVICE.delete(UserId.of(userId));
    }
  };

  const toggleUser = (id: number) => {
    const copy = new Set(selectedUserIds);
    if (copy.has(id)) {
      copy.delete(id);
    } else {
      copy.add(id);
    }
    setSelectedUserIds(copy);
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box display="flex" justifyContent="space-between">
        <Tabs
          value={selectedRole}
          onChange={(_, v) => setSelectedRole(v as UserRole)}
        >
          <Tab label="Admin" value="admin" />
          <Tab label="Employees" value="employee" />
        </Tabs>
        <Button component={Link} to="/addusers">
          Add a user
        </Button>
      </Box>
      <UserTable
        users={users.filter((u) => !deletedUsers.has(u.id))}
        toggleUser={toggleUser}
        selectedUserIds={selectedUserIds}
      />
      <Box display="flex" justifyContent="end">
        <Button
          disabled={selectedUserIds.size === 0}
          onClick={deleteSelectedUsers}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

const UserTable: React.FC<{
  users: User[];
  toggleUser: (id: number) => void;
  selectedUserIds: Set<number>;
}> = ({ users, toggleUser, selectedUserIds }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Full name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell>City</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>

      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell component="th" scope="row">
              {user.firstName} {user.lastName}
            </TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.tel}</TableCell>
            <TableCell>{user.city}</TableCell>
            <TableCell>
              <Checkbox
                checked={selectedUserIds.has(user.id)}
                onChange={(_) => toggleUser(user.id)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
