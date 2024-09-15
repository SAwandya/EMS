import { APIClient } from "./api-client";

const apiClient = new APIClient("/employee");

class EmployeeService {
  Create(user) {
    return apiClient.post(user);
  }
}

export default new EmployeeService();
