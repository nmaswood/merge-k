import {
  UserService,
  CreateUserArgs,
  ListUserArgs,
  UpdateUserArgs,
  UserId,
  User,
  UserRole,
} from "./user-service";

import ky from "ky";

export class UserServiceImpl implements UserService {
  client: typeof ky;
  constructor() {
    this.client = ky.create({
      prefixUrl: "https://api.test-technique.smala.co/v1/984465",
    });
  }

  async get(id: UserId): Promise<User> {
    const response = await this.client
      .get(`user/${id}`)
      .json<{ data: { user: UserFromServer } }>();
    return userFromServer(response.data.user);
  }

  async list({ role }: ListUserArgs): Promise<User[]> {
    const searchParams = new URLSearchParams();
    searchParams.set("role", role);
    const response = await this.client
      .get("users", { searchParams })
      .json<{ data: UserFromServer[] }>();
    return response.data.map(userFromServer);
  }
  async create({
    email,
    firstName,
    lastName,
    tel,
    city,
    role,
  }: CreateUserArgs): Promise<void> {
    const { data } = (await this.client
      .post("users", {
        json: {
          email,
          fst_name: firstName,
          lst_name: lastName,
          tel,
          city,
          role,
        },
      })
      .json()) as any;
    console.log(data);
  }

  async delete(id: UserId): Promise<void> {
    await this.client.delete(`users/${id}`).json();
  }
  async update(_: UpdateUserArgs): Promise<User> {
    throw new Error("not implemented");
  }
}

function userFromServer({
  tel,
  id,
  fst_name,
  lst_name,
  email,
  role,
  createdAt,
  city,
}: UserFromServer): User {
  return {
    id: UserId.of(id),
    firstName: fst_name,
    lastName: lst_name,
    email,
    role,
    createdAt: new Date(createdAt),
    city,
    tel,
  };
}

interface UserFromServer {
  id: number;
  fst_name: string;
  lst_name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  city: string;
  tel: string;
}

export const USER_SERVICE = new UserServiceImpl();
