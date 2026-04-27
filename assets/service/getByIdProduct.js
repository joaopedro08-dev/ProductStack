import { API_BASE_URL } from "../api/api.js";

export const getByIdProduct = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/list/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product by ID');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        throw error;
    }
};