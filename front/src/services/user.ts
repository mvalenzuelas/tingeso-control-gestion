import { User } from "../context/AuthContext";
import axios from "./axios";

export function getUser(userId: number) {
  return axios.get<User>(`/users/${userId}`).then(res => res.data);
}

export function getUsers() {
  return axios.get<User[]>(`/users/`).then(res => res.data);
}