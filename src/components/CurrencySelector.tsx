import React from 'react';

interface CurrencySelectorProps {
    currencies: string[];
    selectedCurrency: string;
    onCurrencyChange: (currency: string) => void;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({ currencies, selectedCurrency, onCurrencyChange }) => {
    return (
        <select
            value={selectedCurrency}
            onChange={(e) => onCurrencyChange(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            {currencies.map((currency) => (
                <option key={currency} value={currency}>
                    {currency}
                </option>
            ))}
        </select>
    );
};

export default CurrencySelector;
