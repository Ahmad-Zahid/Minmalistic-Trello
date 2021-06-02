import { useContext, createContext, useState, ReactElement } from "react";

const fakeAuth = {
  isAuthenticated: false,
  signin(cb: { (): void; (...args: any[]): void }) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb: { (): void; (...args: any[]): void }) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

const authContext = createContext<any>(null);

export function ProvideAuth({ children }: { children: any }): ReactElement {
   const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  let localData = localStorage.getItem("user");
  if (localData) localData = JSON.parse(localData);
  const [user, setUser] = useState<any>(localData);

  const signin = (userPreferences: any, cb: () => void) => {
    return fakeAuth.signin(() => {
      const userObject = {
        name: "testuser",
        boardTitle: userPreferences.title,
        color: userPreferences.color,
      };
      setUser(userObject);
      localStorage.setItem("user", JSON.stringify(userObject));
      cb();
    });
  };
  const signout = (cb: () => void) => {
    return fakeAuth.signout(() => {
      setUser(null);
      localStorage.clear();
      cb();
    });
  };

  return {
    user,
    signin,
    signout,
  };
}
