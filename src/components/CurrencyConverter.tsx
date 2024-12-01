import React, { useEffect, useState } from 'react';
import { getExchangeRates } from '../services/exchangeRateApi';
import CurrencySelector from './CurrencySelector';

const CurrencyConverter: React.FC = () => {
    const [currencies, setCurrencies] = useState<string[]>([]);
    const [baseCurrency, setBaseCurrency] = useState<string>('USD');
    const [targetCurrency, setTargetCurrency] = useState<string>('EUR');
    const [amount, setAmount] = useState<string>('1');
    const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
    const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        const fetchRates = async () => {
            const rates = await getExchangeRates(baseCurrency);
            setExchangeRates(rates);
            setCurrencies(Object.keys(rates));
        };
        fetchRates();
    }, [baseCurrency]);

    useEffect(() => {
        if (exchangeRates[targetCurrency]) {
            setConvertedAmount(Number(amount) * exchangeRates[targetCurrency]);
        }
    }, [amount, targetCurrency, exchangeRates]);

    const handleAmountChange = (value: string) => {
        let sanitizedValue = value.replace(/^0+/, '');
        if (sanitizedValue === '' || Number(sanitizedValue) < 0) {
            sanitizedValue = '0';
        }
        setAmount(sanitizedValue);
    };

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-blue-600">Currency Converter</h1>
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => handleAmountChange((e.target.value))}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">From:</label>
                    <CurrencySelector
                        currencies={currencies}
                        selectedCurrency={baseCurrency}
                        onCurrencyChange={setBaseCurrency}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">To:</label>
                    <CurrencySelector
                        currencies={currencies}
                        selectedCurrency={targetCurrency}
                        onCurrencyChange={setTargetCurrency}
                    />
                </div>
                <div className="text-center mt-6">
                    {convertedAmount !== null && (
                        <p className="text-xl font-semibold text-gray-800">
                            {amount} {baseCurrency} ={' '}
                            <span className="text-blue-600">{convertedAmount.toFixed(2)}</span> {targetCurrency}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CurrencyConverter;
