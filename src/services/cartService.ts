import { Product } from '../types';


export const addToCart = async (product: Product) => {
    try {
        const response = await fetch('/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
        return response.json();
    } catch (error) {
        console.error("Error adding to cart:", error);
    }
};

export const getCart = async () => {
    try {
        const response = await fetch('/api/cart');
        return await response.json();
    } catch (error) {
        console.error("Error fetching cart:", error);
        return [];
    }
};

export const removeFromCart = async (index: number) => {
    try {
        await fetch(`/api/cart/${index}`, {
            method: 'DELETE',
        });
    } catch (error) {
        console.error("Error removing from cart:", error);
    }
};

export const updateCartQuantity = async (index: number, quantity: number) => {
    try {
        await fetch(`/api/cart/${index}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quantity }),
        });
    } catch (error) {
        console.error("Error updating cart:", error);
    }
};