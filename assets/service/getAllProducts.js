import { API_BASE_URL } from "../api/api.js";

export const getAllProducts = async () => {
    try {
        const response = await fetch(API_BASE_URL + '/list');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};