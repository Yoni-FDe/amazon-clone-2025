import React, {createContext, useReducer} from 'react'

export const DataContext = createContext()


 export const DataProvider = ({ children, reducer, initialState }) => {
  return (
    // Providing the state and dispatch function to any child components via DataContext
    <DataContext.Provider value={useReducer(reducer, initialState)}>
      {children} {/* Rendering any child components inside the provider */}
    </DataContext.Provider>
  );
};



// const [state,dispatch] = useReducer(reducer,initialState)
// This dataProvider export to main.jsx