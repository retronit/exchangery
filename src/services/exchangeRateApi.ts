import axios from 'axios';

const API_URL = 'https://open.er-api.com/v6/latest';
export const getExchangeRates = async (baseCurrency: string) => {
    try {
        const response = await axios.get(`${API_URL}/${baseCurrency}`);
        return response.data.rates;
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        throw error;
    }
};
