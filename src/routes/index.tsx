import { useContext, createContext, useState, useEffect,ReactElement } from "react";
import { PerferencesType } from "../constants/types";
import { auth, googleAuthProvider } from "../service/firebaseConfig";

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

  const signin = (user:any,userPreferences: PerferencesType, cb: () => void) => {
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


  const [currentUser, setCurrentUser] = useState<any>({});
  const [loading, setLoading] = useState(true);

  function signup(email: any, password: any) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function loginWithEmailPassword(email: any, password: any) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  function loginAnonymously() {
    return auth.signInAnonymously();
  }

  function loginWithGoogle() {
    return auth.signInWithPopup(googleAuthProvider);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email: any) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email: any) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password: any) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

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
    currentUser,
    loginAnonymously,
    loginWithEmailPassword,
    loginWithGoogle,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };
}
