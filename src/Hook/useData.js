import { useEffect, useState } from "react";
import apiClient from "../utils/api-client";

const useData = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // 로딩중인지 아닌지

  useEffect(() => {
    setIsLoading(true);
    apiClient
      .get(url)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  return { data, error, isLoading };
};

export default useData;
