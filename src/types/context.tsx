import { ProductProps } from '@/types/products';

export type CartItem = ProductProps & {
	quantity: number;
};

export type CartAction =
	| { type: 'ADD_ITEM'; payload: { product: ProductProps; quantity: number } }
	| { type: 'REMOVE_ITEM'; payload: { id: string } }
	| { type: 'SET_QUANTITY'; payload: { id: string; quantity: number } }
	| { type: 'INCREASE_QTY'; payload: { id: string } }
	| { type: 'DECREASE_QTY'; payload: { id: string } }
	| { type: 'CLEAR_CART' };

export type CartContextType = {
	cartProducts: CartItem[];
	cartCount: number;
	isCartOpen: boolean;
	addToCart: (product: ProductProps, quantity: number) => void;
	removeFromCart: (id: string) => void;
	updateQuantity: (id: string, quantity: number) => void;
	increaseQuantity: (id: string) => void;
	decreaseQuantity: (id: string) => void;
	clearCart: () => void;
	getCartTotal: () => number;
	openCart: () => void;
	closeCart: () => void;
};
