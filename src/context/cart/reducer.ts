import { CartAction, CartItem } from '@/types/context';

export function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
	switch (action.type) {
		case 'ADD_ITEM': {
			const { product, quantity } = action.payload;

			const existing = state.find(item => item.id === product.id);

			if (existing) {
				return state.map(item =>
					item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
				);
			}

			return [...state, { ...product, quantity }];
		}

		case 'REMOVE_ITEM':
			return state.filter(item => item.id !== action.payload.id);

		case 'SET_QUANTITY':
			return state.map(item =>
				item.id === action.payload.id
					? { ...item, quantity: action.payload.quantity }
					: item,
			);

		case 'INCREASE_QTY':
			return state.map(item =>
				item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
			);

		case 'DECREASE_QTY':
			return state
				.map(item =>
					item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item,
				)
				.filter(item => item.quantity > 0);

		case 'CLEAR_CART':
			return [];

		default:
			return state;
	}
}
