import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:8000' });

export const signIn = (formData) => API.post("/users/signin", formData);