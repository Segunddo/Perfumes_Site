import { Product, Category } from '../types';

export const getCategories = async (): Promise<Category[]> => {
    console.log("Fetching categories from /api/categories...");
    try {
        const response = await fetch('/api/categories');
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

export const getProductById = async (id: number): Promise<Product | null> => {
    try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
            if (response.status === 404) return null;
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
};
