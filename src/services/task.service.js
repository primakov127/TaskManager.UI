import axios from "axios";
import authHeader from "../helpers/auth-header";

const API_TASK_URL = "http://localhost:8075/tasks";

class TaskService {
  getAllTasks() {
    return axios.get(API_TASK_URL + "/all", { headers: authHeader() });
  }

  getTasksByText(text) {
    return axios.get(API_TASK_URL + `/search?text=${text}`, {
      headers: authHeader(),
    });
  }

  addTask(newTask) {
    return axios.post(API_TASK_URL + "/add", newTask, {
      headers: authHeader(),
    });
  }

  updateTask(updateTask) {
    return axios.put(API_TASK_URL + "/update", updateTask, {
      headers: authHeader(),
    });
  }

  deleteTask(id) {
    return axios.delete(API_TASK_URL + `/delete?id=${id}`, {
      headers: authHeader(),
    });
  }
}

export default new TaskService();
