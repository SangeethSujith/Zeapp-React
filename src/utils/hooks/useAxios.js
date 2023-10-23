import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addLoader, removeLoader } from "../../redux/slices/commonSlice";

const httpClient = axios.create();

const getUrl = ({ endpoint, params, queryParams }) => {
  const url = new URL(endpoint, import.meta.env.VITE_API_URL);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.pathname = url.pathname.replace(`:${key}`, value);
    });
  }

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  return url.toString();
};

const useAxios = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const dispatch = useDispatch();

  const refreshToken = async () => {
    const refreshTokenValue = localStorage.getItem("refreshToken");
    const response = await httpClient.post("/api/token/refresh", {
      refreshToken: refreshTokenValue,
    });
    return response.data;
  };

  useEffect(() => {
    // Intercept requests to add loading state and authentication headers
    httpClient.interceptors.request.use(
      (config) => {
        const configTemp = { ...config };
        configTemp.headers.Authorization = `Bearer ${token}`;
        return configTemp;
      },
      (errorObj) => Promise.reject(errorObj)
    );

    // Intercept responses to handle authentication errors and update token
    httpClient.interceptors.response.use(
      (response) => {
        if (response.data.token) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        }
        return response;
      },
      async (errorObj) => {
        // Handle authentication error (status code 401)
        if (errorObj.response && errorObj.response.status === 401) {
          try {
            // Refresh the authentication token
            const { refreshTokenData } = await refreshToken();
            setToken(refreshTokenData.token);
            localStorage.setItem("token", token);
            return httpClient.request(errorObj.config);
          } catch (errorinst) {
            // setError(errorinst);
          }
        }

        return Promise.reject(errorObj);
      }
    );
  }, [token]);

  const httpRequest = async (
    method,
    { endpoint, params, queryParams, payload }
  ) => {
    const loaderData = `${method}_${endpoint}`;

    dispatch(addLoader(loaderData));
    const url = getUrl({ endpoint, params, queryParams });
    const response = await httpClient[method](url, payload);
    dispatch(removeLoader(loaderData));
    return response;
  };

  const get = ({ endpoint, params, queryParams }) =>
    httpRequest("get", { endpoint, params, queryParams });

  const post = ({ endpoint, payload }) =>
    httpRequest("post", { endpoint, payload });

  const put = ({ endpoint, payload }) =>
    httpRequest("put", { endpoint, payload });

  const patch = ({ endpoint, payload }) =>
    httpRequest("patch", { endpoint, payload });

  const del = ({ endpoint }) => httpRequest("delete", { endpoint });

  return {
    get,
    post,
    put,
    patch,
    del,
  };
};

export default useAxios;
