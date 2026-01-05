'use client';

import { products } from '@/data/product';
import ProductGrid from '@/components/products/product-grid';
import { useCart } from '@/context/cartContext';

export default function Home() {
	const { addToCart } = useCart();

	return (
		<div className="">
			<section className="p-4 md:px-0 md:py-8 overflow-x-hidden">
				<h2 className="mb-2 text-xl font-bold">New Deals</h2>
				<ProductGrid
					products={products}
					onAddToCart={addToCart}
					emptyMessage="No discounted items at the moment"
				/>
			</section>
		</div>
	);
}
