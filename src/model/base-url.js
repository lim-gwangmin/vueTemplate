const API_URL = import.meta.env.VITE_APP_API_URL || 'https://matt.cnu.ac.kr';

console.log('API_URL : ', API_URL);

export const baseUrl = {
    // apiUrl: 'http://localhost:8080',
    // apiUrl: 'http://10.188.4.211:8080',
    apiUrl: API_URL,
};
