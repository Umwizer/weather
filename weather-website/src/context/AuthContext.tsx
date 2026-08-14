import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import type { ReactNode } from 'react';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';

import { ref, set } from 'firebase/database';

import { auth, database } from '../firebase/config';

type AuthContextType = {
  currentUser: User | null;
  loading: boolean;

  register: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<void>;

  login: (
    email: string,
    password: string
  ) => Promise<void>;

  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [currentUser, setCurrentUser] =
    useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setCurrentUser(user);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  async function register(
    fullName: string,
    email: string,
    password: string
  ) {
    const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    const user = userCredential.user;

    await set(
      ref(database, `users/${user.uid}`),
      {
        uid: user.uid,
        fullName: fullName,
        email: user.email,
        createdAt: new Date().toISOString(),
      }
    );

    // After registration, go back to login.
    await signOut(auth);
  }

  async function login(
    email: string,
    password: string
  ) {
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  }

  async function logout() {
    await signOut(auth);
  }

  const value: AuthContextType = {
    currentUser,
    loading,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used inside an AuthProvider'
    );
  }

  return context;
}