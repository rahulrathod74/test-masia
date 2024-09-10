import React, { useState, useEffect } from 'react';

// Simulate API call with a delay
const simulateApiCall = (query) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulated search results
            const results = [
                'Apple',
                'Apricot',
                'Application',
                'Banana',
                'Cherry',
                'Grape',
                'Lemon',
            ];
            // Filter results based on query
            resolve(results.filter(item => item.toLowerCase().includes(query.toLowerCase())));
        }, 1000); // Simulate a 1-second delay
    });
};

// Debounce function
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

const Search = () => {
    const [input, setInput] = useState('');
    const [results, setResults] = useState([]);
    const debouncedInput = useDebounce(input, 500);

    useEffect(() => {
        if (debouncedInput) {
            simulateApiCall(debouncedInput).then(setResults);
        } else {
            setResults([]);
        }
    }, [debouncedInput]);

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    return (
        <div>
            <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Type to search..."
            />
            <div id="results">
                {results.map((result, index) => (
                    <div key={index} className="result-item">
                        {result}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;
