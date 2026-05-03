import api from './axiosConfig';

export const login = (data) => {
  const endpoint = data.role === 'student' ? 'auth/student/login' : 'auth/teacher/login';
  return api.post(endpoint, data);
};

export const register = (data) => {
  const endpoint = data.role === 'student' ? 'auth/student/signup' : 'auth/teacher/signup';
  return api.post(endpoint, data);
};

export const registerStudent = (data) => api.post('auth/student/signup', data);
export const loginStudent = (data) => api.post('auth/student/login', data);
export const registerTeacher = (data) => api.post('auth/teacher/signup', data);
export const loginTeacher = (data) => api.post('auth/teacher/login', data);
export const getMe = () => api.get('auth/me');
