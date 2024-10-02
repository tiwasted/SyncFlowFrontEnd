import { useState, useEffect } from "react";
import api from "../services/TokenService";

export const useFetchData = (url, initialState = []) => {
  const [data, setData] = useState(initialState);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(url);
        setData(response.data || []);
      } catch (error) {
        setError("Ошибка при загрузке данных");
      }
    };

    fetchData();
  }, [url]);

  return { data, error };
};
