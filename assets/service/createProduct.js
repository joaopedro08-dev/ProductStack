import { API_BASE_URL } from  '../api/api.js';

export const createProduct = async (productData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });
        if (!response.ok) {
            throw new Error('Failed to create product');
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};