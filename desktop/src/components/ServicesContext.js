// // ServicesContext.js
// import React, { createContext, useContext, useState } from 'react';

// const ServicesContext = createContext(undefined);

// export const ServicesProvider = ({ children }) => {
//     const [services, setServices] = useState(null);

//     const updateServices = (newServices) => {
//         setServices(newServices);
//     };

//     return (
//         <ServicesContext.Provider value={{ services, updateServices }}>
//             {children}
//         </ServicesContext.Provider>
//     );
// };

// export const useServices = () => {
//     const context = useContext(ServicesContext);
//     if (context === undefined) {
//         throw new Error('useServices must be used within a ServicesProvider');
//     }
//     return context;
// };
