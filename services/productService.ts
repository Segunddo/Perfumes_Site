import { Product } from '../types';

export const getProducts = async (): Promise<Product[]> => {
    console.log("Fetching products from /api/products...");
    try {
        const response = await fetch('/api/products');

        console.log("Response status:", response.status);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
};
