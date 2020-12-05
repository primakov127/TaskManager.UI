import axios from "axios";
import authHeader from "../helpers/auth-header";

const API_TASK_URL = "http://localhost:8075/myTasks";

class MyTaskService {
  getAllMyTasks() {
    return axios.get(API_TASK_URL + "/allMy", { headers: authHeader() });
  }

  getAllUserTask(userId) {
    return axios.get(API_TASK_URL + `/allUser?userId=${userId}`, {
      headers: authHeader(),
    });
  }

  addTask(task) {
    return axios.post(API_TASK_URL + "/addTask", task, {
      headers: authHeader(),
    });
  }

  deleteTask(taskId) {
    return axios.delete(API_TASK_URL + `/deleteTask?taskId=${taskId}`, {
      headers: authHeader(),
    });
  }
}

export default new MyTaskService();
