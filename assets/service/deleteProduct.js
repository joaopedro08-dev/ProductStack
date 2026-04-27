import { API_BASE_URL } from "../api/api.js";

export const deleteProduct = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/delete/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete product');
        }

        return await response.json();
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};