// src/components/UserContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
    patient_id?: number;
    first_name?: string;
    last_name?: string;
    photo_url?: string;
    birth_date?: Date; // ou Date si tu les convertis
    address?: string;
    city?: string;
    country?: string;
    email?: string;
    password?: string;
    phone_number?: string;
    allergies_to_medicine?: string;
    blood_group?: string;
    height_cm?: number;
    weight_kg?: number;
    gender?: string;
    favorite_specialization?: string;
    created_at?: string; // ou Date
  }
  

  interface UserContextType {
    user: User | null;
    updateUser: (user: User | null) => void;
  }
  
  export const UserContext = createContext<UserContextType>({
    user: null,
    updateUser: () => {},
  });
  
  export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
  
    useEffect(() => {
      const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }, []);
  
    const updateUser = (newData: any) => {
      setUser(newData);
      localStorage.setItem('user', JSON.stringify(newData)); // ou sessionStorage selon besoin
    };
  
    return (
      <UserContext.Provider value={{ user, updateUser }}>
        {children}
      </UserContext.Provider>
    );
  };
export const useUser = () => useContext(UserContext);
