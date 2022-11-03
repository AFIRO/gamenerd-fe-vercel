import axiosRoot from 'axios';
import config from '../config.json';

export const axios = axiosRoot.create({
	baseURL: process.env.REACT_APP_BACKEND_BASE_URL || config.base_url_backend});

export const setAuthToken = (token:string) => {
	if (token) {
		axios.defaults.headers['Authorization'] = `Bearer ${token}`;
	} else {
	delete axios.defaults.headers['Authorization'];
	}
}