/*
  React Context Api for State Provider
  updates and dispatches success/error Messages
*/
import React, { createContext, useState } from 'react';

export const AppStateContext = createContext();

const AppStoreProvider = ({ children }) => {
  const [data, setData] = useState({
    successMsg: {
      msg: '',
      show: false,
    },
    errorMsg: {
      msg: '',
      show: false,
    },
  });

  const updateData = (object) => setData({ ...data, ...object });
  return (
    <AppStateContext.Provider
      value={{
        StoreData: data,
        updateData,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStoreProvider;
