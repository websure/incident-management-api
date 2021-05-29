/*
  Custom hook for async data fetching.
  Handles all fetching states like : error, data, loading
*/
import { useState } from 'react';

const useAsync = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setError(false);
    setLoading(false);
    setData({});
  };

  const fetch = (async) => {
    setLoading(true);
    async
      .then((res = {}) => {
        setData(res);
      })
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  };

  return { fetch, loading, data, reset, error };
};

export default useAsync;
