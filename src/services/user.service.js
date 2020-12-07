import axios from "axios";
import authHeader from "../helpers/auth-header";

const API_URL = "http://localhost:8075/users";

class UserService {
  getAllUsers() {
    return axios.get(API_URL + "/all", { headers: authHeader() });
  }
}

export default new UserService();
