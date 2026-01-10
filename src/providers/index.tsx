import { CartProvider } from '@/context/cart/cartContext';

export default function Provider({ children }: { children: React.ReactNode }) {
	return <CartProvider>{children}</CartProvider>;
}
