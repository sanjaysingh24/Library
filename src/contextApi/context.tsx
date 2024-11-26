import React, { createContext, useContext, ReactNode } from "react";


interface LibraryContextType {
  exampleValue: string;
}

export const LibraryContext = createContext<LibraryContextType | null>(null);


interface LibraryProviderProps {
  children: ReactNode; 
}

const LibraryProvider: React.FC<LibraryProviderProps> = (props) => {
  const value: LibraryContextType = {
    exampleValue: "Hello, TypeScript!",
  };

  return (
    <LibraryContext.Provider value={value}>
      {props.children}
    </LibraryContext.Provider>
  );
};

export default LibraryProvider;

export const useLibraryContext = (): LibraryContextType => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error("useLibraryContext must be used within a LibraryProvider");
  }
  return context;
};
