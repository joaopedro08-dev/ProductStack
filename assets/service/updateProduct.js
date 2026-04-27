import { API_BASE_URL } from "../api/api.js";

export const updateProduct = async (id, productData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });
        if (!response.ok) {
            throw new Error('Failed to update product');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};