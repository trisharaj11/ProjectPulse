import api from './axiosConfig';

export const addSuggestion = (data) => api.post('/suggestions', data);
export const voteSuggestion = (id) => api.post(`/suggestions/${id}/vote`);
export const getSuggestions = (projectId) => api.get(`/suggestions/project/${projectId}`);
