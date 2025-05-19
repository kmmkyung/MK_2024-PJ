"use client";

import React from "react";
import { UserContext, userContextType } from "@/context/userContext";

interface UserProviderProps {
  value: userContextType;
  children: React.ReactNode;
}

export default function UserProvider({value, children}: UserProviderProps) {
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}