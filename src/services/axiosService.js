import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://tarry-plastic-purple.glitch.me",
  timeout: 60 * 1000,
});

export async function find(url) {
  return await axiosInstance.get(url);
}

export async function remove(url) {
  return await axiosInstance.delete(url);
}

export async function update(url, data) {
  return await axiosInstance.patch(url, data);
}

export async function insert(url, data) {
  return await axiosInstance.post(url, data);
}
