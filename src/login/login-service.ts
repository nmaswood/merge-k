export interface LoginService {
  checkLogin: () => SessionInfo | undefined;
  login: (lastPage: Page) => void;
  logout: () => void;
}

interface SessionInfo {
  lastPage: "userdisplays" | "addusers";
}

type Page = "userdisplays" | "addusers";

export class LocalStorageLoginService implements LoginService {
  checkLogin(): SessionInfo | undefined {
    const loginInfo = localStorage.getItem("z-login-info");

    const value =
      loginInfo == null ? undefined : (JSON.parse(loginInfo) as SessionInfo);

    return value;
  }

  // # TODO make this defined
  login(lastPage: Page | undefined) {
    const json = JSON.stringify({ lastPage });
    localStorage.setItem("z-login-info", json);
  }

  logout() {
    localStorage.removeItem("z-login-info");
  }
}

export const LOGIN_SERVICE = new LocalStorageLoginService();
