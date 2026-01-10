'use client';

import { createContext, useContext, useReducer, useState, ReactNode } from 'react';
import { ProductProps } from '@/types/products';
import { cartReducer } from './reducer';
import { CartContextType } from '@/types/context';

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
	const [cartProducts, dispatch] = useReducer(cartReducer, []);
	const [isCartOpen, setIsCartOpen] = useState(false);

	const addToCart = (product: ProductProps, quantity = 1) =>
		dispatch({
			type: 'ADD_ITEM',
			payload: { product, quantity },
		});

	const removeFromCart = (id: string) => dispatch({ type: 'REMOVE_ITEM', payload: { id } });

	const updateQuantity = (id: string, quantity: number) =>
		dispatch({ type: 'SET_QUANTITY', payload: { id, quantity } });

	const increaseQuantity = (id: string) => dispatch({ type: 'INCREASE_QTY', payload: { id } });

	const decreaseQuantity = (id: string) => dispatch({ type: 'DECREASE_QTY', payload: { id } });

	const clearCart = () => dispatch({ type: 'CLEAR_CART' });

	const cartCount = cartProducts.length;

	const getCartTotal = () =>
		cartProducts.reduce((total, item) => total + (item.price || 0) * item.quantity, 0);

	return (
		<CartContext.Provider
			value={{
				cartProducts,
				cartCount,
				isCartOpen,
				addToCart,
				removeFromCart,
				updateQuantity,
				increaseQuantity,
				decreaseQuantity,
				clearCart,
				getCartTotal,
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
