import { useState, useContext, createContext, useMemo } from 'react';

//Context 
export const AppContext = createContext(null);

//Provider
export const AppContextProvider = ({ children }) => {
  const [openTodoModalAbm, setOpenTodoModalAbm] = useState(false);

  const values = useMemo(
    () => ({
      openTodoModalAbm,
      setOpenTodoModalAbm,
    }),
    [
      openTodoModalAbm
    ]
  ); // States que serán visibles en el contexto.

  // Interface donde será expuesto como proveedor y envolverá la App.
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

// Custom hook.
export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    console.error('Error deploying App Context!!!');
  }

  return context;
}

export default useAppContext;
