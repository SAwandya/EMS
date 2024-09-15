import axios, { CanceledError } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
});

class APIClient {
  endpoint;

  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  post = (config) => {
    
    return axiosInstance.post(this.endpoint, config).then((res) => res.data);
  };

  getAll = () => {
    
    return axiosInstance.get(this.endpoint).then((res) => res.data);
  };
}

export { CanceledError, APIClient };
