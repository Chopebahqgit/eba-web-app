'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { ProductProps } from '@/types/products';

type CartContextType = {
	cartProducts: ProductProps[];
	cartCount: number;
	isCartOpen: boolean;
	addToCart: (product: ProductProps) => void;
	removeFromCart: (id: string) => void;
	openCart: () => void;
	closeCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
	const [cartProducts, setCartProducts] = useState<ProductProps[]>([]);
	const [isCartOpen, setIsCartOpen] = useState(false);

	const addToCart = (product: ProductProps) => setCartProducts(prev => [...prev, product]);

	const removeFromCart = (id: string) => setCartProducts(prev => prev.filter(p => p.id !== id));

	return (
		<CartContext.Provider
			value={{
				cartProducts,
				cartCount: cartProducts.length,
				isCartOpen,
				addToCart,
				removeFromCart,
				openCart: () => setIsCartOpen(true),
				closeCart: () => setIsCartOpen(false),
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

export function useCart() {
	const ctx = useContext(CartContext);
	if (!ctx) throw new Error('useCart must be used within CartProvider');
	return ctx;
}
