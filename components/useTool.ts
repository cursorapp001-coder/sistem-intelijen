import { useState } from 'react';

export const useTool = <TData, TQuery>(
  apiCall: (query: TQuery) => Promise<TData>
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TData | null>(null);

  const execute = async (query: TQuery) => {
    if (!query) {
      setError("Input tidak boleh kosong.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setData(null);
    try {
      const result = await apiCall(query);
      setData(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Terjadi kesalahan yang tidak diketahui.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, data, execute };
};
