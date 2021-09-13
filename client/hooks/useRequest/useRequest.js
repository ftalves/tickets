import { useState } from 'react';
import axios from 'axios';

const useRequest = () => {
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const request = async ({ url, method, body }) => {
    setLoading(true);

    try {
      const response = await axios[method](url, body);
      setErrors([]);
      setData(response.data);
    } catch (err) {
      setData(null);
      setErrors(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  return { request, data, errors, loading };
};

export { useRequest };
