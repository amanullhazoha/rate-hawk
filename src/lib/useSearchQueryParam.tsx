import { useCallback } from "react";

const useSearchQueryParam = () => {
  const setQueryParams = useCallback(
    (searchParams: any, key: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      params.set(key, value);

      return params.toString();
    },
    [],
  );

  const deleteParams = useCallback((searchParams: any, key: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete(key);

    return params.toString();
  }, []);

  return {
    deleteParams,
    setQueryParams,
  };
};

export default useSearchQueryParam;
