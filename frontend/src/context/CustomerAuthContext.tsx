import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { api } from "../services/api";

const CUSTOMER_TOKEN_KEY = "cad-customer-token";
const CUSTOMER_USER_KEY = "cad-customer-user";

export type CustomerUser = {
  id?: string;
  _id?: string;
  fullName: string;
  email: string;
  role?: string;
  location?: string;
};

type CustomerAuthContextValue = {
  customer: CustomerUser | null;
  isLoggedIn: boolean;
  isAuthModalOpen: boolean;
  authMode: "login" | "signup";
  openAuthModal: (mode?: "login" | "signup") => void;
  closeAuthModal: () => void;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (fullName: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const CustomerAuthContext = createContext<CustomerAuthContextValue | null>(null);

export function CustomerAuthProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<CustomerUser | null>(() => {
    try {
      const raw = localStorage.getItem(CUSTOMER_USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  const openAuthModal = useCallback((mode: "login" | "signup" = "login") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await api.login(email.trim(), password);
      if (res && res.accessToken) {
        localStorage.setItem(CUSTOMER_TOKEN_KEY, res.accessToken);
        localStorage.setItem(CUSTOMER_USER_KEY, JSON.stringify(res.user));
        setCustomer(res.user);
        setIsAuthModalOpen(false);
        return true;
      }
    } catch (err: any) {
      throw new Error(err?.message || "Invalid credentials");
    }
    return false;
  }, []);

  const signup = useCallback(
    async (fullName: string, email: string, password: string) => {
      try {
        const res = await api.signup({
          fullName: fullName.trim(),
          email: email.trim(),
          password: password.trim(),
        });

        // Also register in customer collection if not present
        await api.createCustomer({
          name: fullName.trim(),
          email: email.trim(),
          location: "United States",
        }).catch(() => null);

        // Auto login after signup
        if (res) {
          return await login(email, password);
        }
        return true;
      } catch (err: any) {
        throw new Error(err?.message || "Registration failed");
      }
    },
    [login],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(CUSTOMER_TOKEN_KEY);
    localStorage.removeItem(CUSTOMER_USER_KEY);
    setCustomer(null);
  }, []);

  return (
    <CustomerAuthContext.Provider
      value={{
        customer,
        isLoggedIn: !!customer,
        isAuthModalOpen,
        authMode,
        openAuthModal,
        closeAuthModal,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </CustomerAuthContext.Provider>
  );
}

export function useCustomerAuth() {
  const ctx = useContext(CustomerAuthContext);
  if (!ctx) {
    throw new Error("useCustomerAuth must be used within CustomerAuthProvider");
  }
  return ctx;
}
