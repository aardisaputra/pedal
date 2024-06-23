"use client";
import { createContext, useContext, useState } from "react";

const SubjectContext = createContext();

export const useSubject = () => useContext(SubjectContext);

export const SubjectProvider = ({ children }) => {
  const [selectedSubject, setSelectedSubject] = useState("");
  return (
    <SubjectContext.Provider value={{ selectedSubject, setSelectedSubject }}>
      {children}
    </SubjectContext.Provider>
  );
};
