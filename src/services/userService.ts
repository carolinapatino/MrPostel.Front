import { API_URL } from "./config";

export default {
  createUserRoute(user: {}) {
    return API_URL.post(`/user/register`, user, {
      headers: {
        Authorization: { "Content-Type": "application/json" },
      },
    });
  },
  getUser(userId: any) {
    return API_URL.get(`/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
  recoverPasswordRoute(user: {}) {
    return API_URL.put(`/user/newPassword`, user, {
      headers: {
        Authorization: { "Content-Type": "application/json" },
      },
    });
  },
  validateUserRoute(user: {}) {
    return API_URL.post(`/user/login`, user, {
      headers: {
        Authorization: { "Content-Type": "application/json" },
      },
    });
  },
};
