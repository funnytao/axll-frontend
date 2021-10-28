import { useCallback, useState } from 'react';
import axios, { AxiosError } from 'axios';

type baseConfigProps = {
  url?: string,
  method?: string,
  data?: object
}

/**
 * Hook that returns an axios promise with given config
 * @param baseConfig config used for axios
 * @returns {object} including data, loading state, error and the request instance
 */
const useRequest = (baseConfig: baseConfigProps) => {
  const [data, setData] = useState();
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(false);

  const request = useCallback((requestConfig = {}) => {
    if (baseConfig?.url) {
      setLoading(true);
      setData(null);
      setError(null);
      return axios({ ...baseConfig, ...requestConfig })
        .then(response => {
          setData(response as any);
          setLoading(false);
          return response;
        })
        .catch(err => {
          setError(err);
          setLoading(false);
          throw err;
        });
    }
    return Promise.resolve();
  }, [baseConfig]);

  return {
    data,
    error,
    loading,
    request,
  };
};

export default useRequest;