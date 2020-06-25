import { useState, useEffect } from 'react';

/**
 *
 * useApi
 *
 * Accepts:
 * - apiCallback, param
 *
 * Returns:
 * - isLoading
 * - error
 * - data
 */

const useApi = (apiCallback, param = null) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await apiCallback(param);
        if (res.status === 'error') setError(res.message);
        else setData(res.data);
      } catch (err) {
        setError('Request failed');
      }
      setIsLoading(false);
    };

    getData();
  }, []);

  return [isLoading, error, data];
};

export default useApi;
