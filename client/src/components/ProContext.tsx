/* ─────────────────────────────────────────────────────
   ProContext : gestion de l’état d’auth d’un professionnel
───────────────────────────────────────────────────────*/
import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
  } from 'react';
  import { useNavigate } from 'react-router-dom';
  
  /* ═════════════ Interfaces ═════════════ */
  export interface Professional {
    professional_id?: number;
    full_name?: string;
    clinic_address?: string;
    city?: string;
    country?: string;
    email?: string;
    phone_number?: string;
    specialization?: string;
    practice_tenure?: string;
    practice_start_date?: string;   // ISO string (yyyy-mm-dd)
    is_premium?: boolean;
    created_at?: string;
    /* photo_url, réseaux sociaux, etc. si besoin */
  }
  
  interface ProContextType {
    /* état */
    professional: Professional | null;
    proToken: string | null;
  
    /* mutateurs */
    updateProfessional: (p: Professional | null, remember?: boolean) => void;
    setProToken: (t: string | null, remember?: boolean) => void;
    proLogout: () => Promise<void>;
  }
  
  /* ═════════════ Helpers stockage ═════════════ */
  const STORAGE_KEY_PRO   = 'pro';          // données professionnel
  const STORAGE_KEY_PRTOK = 'pro-token';    // JWT pro
  
  const setInStorage = (key: string, value: any, remember = true) => {
    const store = remember ? localStorage : sessionStorage;
    if (value === null) {
      store.removeItem(key);
    } else {
      if (key === STORAGE_KEY_PRTOK) {
        // Pour le token, on stocke *directement* la chaîne, sans JSON.stringify
        store.setItem(key, value as string);
      } else {
        store.setItem(key, JSON.stringify(value));
      }
    }
  };
  

  
  const getFromStorage = (key: string) => {
    const raw = localStorage.getItem(key) ?? sessionStorage.getItem(key);
    if (!raw) return null;
    if (key === STORAGE_KEY_PRTOK) return raw;   // token = string
    try { return JSON.parse(raw); } catch { return raw; }
  };
  
  /* ═════════════ Contexte & hooks ═════════════ */
  export const ProContext = createContext<ProContextType>({} as ProContextType);
  export const usePro     = () => useContext(ProContext);
  
  /* ═════════════ Provider ═════════════ */
  export const ProProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
  
    const [professional, setProfessional] = useState<Professional | null>(
      () => getFromStorage(STORAGE_KEY_PRO)
    );
    const [proToken, setProTokenState] = useState<string | null>(
      () => getFromStorage(STORAGE_KEY_PRTOK)
    );
  
    /* ─── mutateurs persistants ─── */
    const updateProfessional = (p: Professional | null, remember = true) => {
      setProfessional(p);
      setInStorage(STORAGE_KEY_PRO, p, remember);
    };
  
    const setProToken = (t: string | null, remember = true) => {
      setProTokenState(t);
      setInStorage(STORAGE_KEY_PRTOK, t, remember);
    };
  
    /* ─── LOGOUT pro ─── */
    const proLogout = async () => {
      try {
        await fetch('/api/professional/logout', { method: 'POST', credentials: 'include' });
      } catch { /* ignorer côté client */ }
  
      updateProfessional(null);
      setProToken(null);
      navigate('/loginPro', { replace: true });
    };
  
    /* synchro inter-onglets */
    useEffect(() => {
      const listener = (e: StorageEvent) => {
        if (e.key === STORAGE_KEY_PRO)   setProfessional(getFromStorage(STORAGE_KEY_PRO));
        if (e.key === STORAGE_KEY_PRTOK) setProTokenState(getFromStorage(STORAGE_KEY_PRTOK));
      };
      window.addEventListener('storage', listener);
      return () => window.removeEventListener('storage', listener);
    }, []);
  
    return (
      <ProContext.Provider value={{
        professional,
        proToken,
        updateProfessional,
        setProToken,
        proLogout
      }}>
        {children}
      </ProContext.Provider>
    );
  };
  