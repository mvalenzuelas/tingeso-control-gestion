import axios from "axios";

export function getRoles() {
  return axios.get<{ id: number, name: string }[]>(`/roles/`).then(res => res.data);
}

export function addRoleToUser(roleId: string, userId: string) {
  console.log({roleId, userId});
  return axios.post(`/roles/${roleId}/${userId}`);
}

export function removeRoleFromUser(roleId: string, userId: string) {
  console.log(roleId, userId);
  return axios.delete(`/roles/${roleId}/${userId}`);;
}