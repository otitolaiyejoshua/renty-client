// src/utils/getUserData.js
export const getUserData = () => {
    return JSON.parse(localStorage.getItem('userData')); // Assuming userData is stored in JSON format
};
