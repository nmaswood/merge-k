import { USER_SERVICE } from "./user-service-impl";
import { User, UserRole } from "./user-service";
import { useState, useEffect } from "react";

export const useListUsers = (role: UserRole) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await USER_SERVICE.list({ role });
      setUsers(data);
    }
    fetchData();
  }, [role]);

  return {
    users,
  };
};
