// src/components/UserContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';

/* ────────── Types ────────── */
export interface User {
  patient_id?: number;
  first_name?: string;
  last_name?: string;
  photo_url?: string;
  birth_date?: Date;          // string ISO stockée, à convertir en Date si besoin
  address?: string;
  city?: string;
  country?: string;
  email?: string;
  phone_number?: string;
  allergies_to_medicine?: string;
  blood_group?: string;
  height_cm?: number;
  weight_kg?: number;
  gender?: string;
  favorite_specialization?: string;
  created_at?: string;
  /* + vos autres champs … */
}

interface UserContextType {
  /* état */
  user: User | null;
  token: string | null;

  /* mutateurs */
  updateUser: (u: User | null, remember?: boolean) => void;
  setToken: (t: string | null, remember?: boolean) => void;
  logout: () => Promise<void>;
}

/* ────────── Helpers ────────── */
const STORAGE_KEY_USER  = 'user';
const STORAGE_KEY_TOKEN = 'token';

/** Choix du “coffre” : si remember=true ⇒ localStorage, sinon sessionStorage */
const setInStorage = (key: string, value: any, remember = true) => {
  const store = remember ? localStorage : sessionStorage;
  if (value === null) store.removeItem(key);
  else store.setItem(key, JSON.stringify(value));
};

const getFromStorage = (key: string) => {
  const raw = localStorage.getItem(key) ?? sessionStorage.getItem(key);
  if (!raw) return null;

  // Le token JWT n'est pas du JSON, on le renvoie tel quel
  if (key === STORAGE_KEY_TOKEN) return raw;

  // Pour tout le reste on tente de parser, mais en sécurité
  try {
    return JSON.parse(raw);
  } catch {
    return raw;            // valeur brute si jamais ce n’est pas du JSON
  }
};

/* ────────── Contexte ────────── */
export const UserContext = createContext<UserContextType>({} as UserContextType);
export const useUser = () => useContext(UserContext);

/* ────────── Provider ────────── */
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  /* état réactif */
  const [user,  setUser]  = useState<User  | null>(() => getFromStorage(STORAGE_KEY_USER));
  const [token, setTokenState] = useState<string | null>(() => getFromStorage(STORAGE_KEY_TOKEN));

  /* expose un mutateur qui persiste */
  const updateUser = (u: User | null, remember = true) => {
    setUser(u);
    setInStorage(STORAGE_KEY_USER, u, remember);
  };

  const setToken = (t: string | null, remember = true) => {
    setTokenState(t);
    setInStorage(STORAGE_KEY_TOKEN, t, remember);
  };

  /* ────────── LOGOUT ────────── */
  const logout = async () => {
    try {
      /* optionnel : avertir votre API pour invalider le refresh-token / cookie */
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    } catch { /* on ignore l’erreur côté UI */ }

    /* nettoyage complet */
    updateUser(null);          // supprime des storages
    setToken(null);            // idem
    navigate('/login', { replace: true });
  };

  /* ────────── Effet : synchro en cas de login “manuel” dans un autre onglet ────────── */
  useEffect(() => {
    const listener = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY_USER)  setUser(getFromStorage(STORAGE_KEY_USER));
      if (e.key === STORAGE_KEY_TOKEN) setTokenState(getFromStorage(STORAGE_KEY_TOKEN));
    };
    window.addEventListener('storage', listener);
    return () => window.removeEventListener('storage', listener);
  }, []);

  /* ────────── Fourniture du contexte ────────── */
  return (
    <UserContext.Provider value={{ user, token, updateUser, setToken, logout }}>
      {children}
    </UserContext.Provider>
  );
};
