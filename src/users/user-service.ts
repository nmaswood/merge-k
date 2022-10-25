export namespace UserId {
  export const of = (id: number) => id as UserId;
}
export type UserId = number & { _userBrand: "" };

export interface User {
  id: UserId;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: Date;
  tel: string;
  city: string;
}

export interface UserService {
  get: (id: UserId) => Promise<User>;
  list: (args: ListUserArgs) => Promise<User[]>;
  create: (args: CreateUserArgs) => Promise<void>;
  delete: (id: UserId) => Promise<void>;
  update: (args: UpdateUserArgs) => Promise<User>;
}

export interface CreateUserArgs {
  email: string;
  firstName: string;
  lastName: string;
  tel: string;
  city: string;
  role: UserRole;
}

export type ListUserArgs = { role: UserRole } & Partial<{
  page: number;
  perPage: number;
  name: string;
  email: string;
}>;

export interface UpdateUserArgs {
  id: UserId;
  role: UserRole;
}

export type UserRole = "admin" | "employee";
