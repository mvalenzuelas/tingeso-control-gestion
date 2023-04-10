import axios from './axios';
import { User } from '../context/AuthContext';

type LoginRequest = {
  email: string,
  firstName: string,
  lastName: string,
  password: string,
}

function formDataToObject(data: FormData) {
  let obj: Record<string, string> = {};
  for (let [key, value] of data.entries()) {
    if (typeof value == 'string') {
      obj[key] = value;
    }
  }
  return obj;
}

export function getAuth() {
  return axios
    .get<User>("/auth/user")
    .then(response => response.data);
}

export function login(data: FormData) {
  // const authToken = btoa(`${data.get('email')}:${data.get('password')}`);
  // const authorization = `Basic ${authToken}`;

  return axios
    .post<User>(
      "/auth/login", 
      formDataToObject(data),
      // { headers: { 'Authorization': authorization } }
    )
    .then(response => response.data);
}

export function logout() {
  return axios
    .post<User>(
      "/auth/logout"
    )
    .then(response => response.data);
}

export function register(data: FormData) {
  return axios.post<User>("/users", formDataToObject(data))
    .then(response => response.data);
}
