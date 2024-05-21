import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  userInfo: null,
  activeTab: "Today",
  updateResponse: false,
};

const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const setUserInfo = (userInfo) => {
    dispatch({
      type: "SET_USER_INFO",
      payload: userInfo,
    });
  };
  const setActiveTab = (activeTab) => {
    dispatch({
      type: "SET_ACTIVE_TABS",
      payload: activeTab,
    });
  };
  const setUpdateResponse = (updateResponse) => {
    dispatch({
      type: "SET_UPDATE_RESPONSE",
      payload: updateResponse,
    });
  };
  return (
    <GlobalContext.Provider
      value={{
        userInfo: state.userInfo,
        setUserInfo,
        activeTab: state.activeTab,
        setActiveTab,
        updateResponse: state.updateResponse,
        setUpdateResponse,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
