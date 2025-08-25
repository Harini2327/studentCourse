import axios from 'axios';

const API_URL = 'http://localhost:8080/api/courses';

export const getCourses = () => axios.get(API_URL);
export const getCourse = (id) => axios.get(`${API_URL}/${id}`);
export const addCourse = (course) => axios.post(API_URL, course);
export const updateCourse = (id, course) => axios.put(`${API_URL}/${id}`, course);
export const deleteCourse = (id) => axios.delete(`${API_URL}/${id}`);
