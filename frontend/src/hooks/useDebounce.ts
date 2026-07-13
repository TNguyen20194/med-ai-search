import { useEffect, useState } from 'react';

export default function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay || 300)

    return () => {
      clearTimeout(handler);
    }
  })

  return debouncedValue;
}

/**
 * example to use generic with useDebounce
 * 
 * 
 * const [results, setResults] = useState(null);
 * const debouncedSearchTerm = useDebounce(searchTerm, 500);
 * 
**/