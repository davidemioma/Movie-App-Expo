import { useEffect, useState } from "react";

type Props = {
  fetchAction: <T>() => Promise<T>;
  autoFetch: boolean;
};

const useFetch = <T>({ fetchAction, autoFetch = true }: Props) => {
  const [data, setData] = useState<T | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setLoading(true);

    setError(null);

    try {
      const res = await fetchAction();

      setData(res as T);
    } catch (err) {
      console.log(err);

      setError(err instanceof Error ? err : new Error("Something went wrong!"));
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);

    setLoading(false);

    setError(null);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [autoFetch]);

  return { data, loading, refetch: fetchData, error, reset };
};

export default useFetch;
