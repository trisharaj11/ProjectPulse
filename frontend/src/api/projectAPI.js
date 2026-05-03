import api from './axiosConfig';

export const uploadProject = (formData) => api.post('projects/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});

export const getProjects = () => api.get('projects');

export const getProjectById = (id) => api.get(`projects/${id}`);

export const uploadVersion = (id, formData) => api.post(`projects/${id}/version`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});

export const addSuggestion = (id, data) => api.post(`projects/${id}/suggestions`, data);

export const voteSuggestion = (projectId, suggestionId) => api.patch(`projects/${projectId}/suggestions/${suggestionId}/vote`);
