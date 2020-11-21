import axios from "axios";
import authHeader from "../helpers/auth-header";

const API_TASK_URL = "http://localhost:8075/api/task";

class AdminService {
  getTasks() {
    return axios.get(API_TASK_URL + "/all", { headers: authHeader() });
  }

  addTask(newTask) {
    return axios.post(API_TASK_URL + "/add", newTask, {
      headers: authHeader(),
    });
  }

  deleteTask(id) {
    axios.delete(API_TASK_URL + `/delete?id=${id}`, { headers: authHeader() });
  }
}

export default new AdminService();
