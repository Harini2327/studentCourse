import axios from 'axios';

const API_URL = 'http://localhost:8080/api/enrollments';

export const getEnrollmentsByStudent = (studentId) => axios.get(`${API_URL}/student/${studentId}`);
export const enrollCourse = (enrollment) => axios.post(API_URL, enrollment);
export const unregisterCourse = (id) => axios.delete(`${API_URL}/${id}`);
