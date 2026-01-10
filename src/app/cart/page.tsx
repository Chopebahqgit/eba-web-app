import Cart from './cart';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Cart',
	description: 'Producte you added to cart are listed here',
};

export default function Page() {
	return <Cart />;
}
