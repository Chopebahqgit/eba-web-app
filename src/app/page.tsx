'use client';

import { SlideShow } from '@/components/slideshow';
import { slides } from '@/data';
import { products } from '@/data/product';
import ProductGrid from '@/components/products/product-grid';
import { ProductProps } from '@/types/products';

export default function Home() {
	const handleAddToCart = (product: ProductProps) => {
		console.log('Added to cart:', product);
	};
	return (
		<div className="flex flex-col items-center font-sans dark:bg-black min-h-screen">
			<div className="w-full md:w-[80%] flex-1">
				<SlideShow slides={slides} interval={6000} transitionDuration={1200} />

				<section className="p-4 md:py-8 md:px-0">
					<h2 className="text-xl font-bold mb-2">New Deals</h2>
					<ProductGrid
						products={products}
						onAddToCart={handleAddToCart}
						emptyMessage="No discounted items at the moment"
					/>
				</section>
			</div>
		</div>
	);
}
