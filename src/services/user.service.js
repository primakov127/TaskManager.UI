import axios from "axios";
import authHeader from "../helpers/auth-header";

const API_URL = "http://localhost:8075/api/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "test/all");
  }

  getUserBoard() {
    return axios.get(API_URL + "test/user", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "test/admin", { headers: authHeader() });
  }

  getAllTasks() {
    return axios.get(API_URL + "task/all", { headers: authHeader() });
  }
}

export default new UserService();
