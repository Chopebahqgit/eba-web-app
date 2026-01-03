'use client';

import { useState } from 'react';
import { SlideShow } from '@/components/slideshow';
import { slides } from '@/data';
import { products, STORES } from '@/data/product';
import ProductGrid from '@/components/products/product-grid';
import { ProductProps } from '@/types/products';
import StoreNavLayout from '@/components/layouts/nav-layout';

export default function Home() {
	const [activeStore, setActiveStore] = useState('shoprite');

	const handleAddToCart = (product: ProductProps) => {
		console.log('Added to cart:', product);
	};

	return (
		<div className="flex flex-col items-center font-sans dark:bg-black min-h-screen">
			<div className="w-full md:w-[80%] flex-1">
				<StoreNavLayout
					stores={STORES}
					activeStore={activeStore}
					onSelectStore={setActiveStore}
					hero={
						<SlideShow
							slides={slides}
							interval={6000}
							transitionDuration={1200}
							className="relative w-full h-100 md:h-125 overflow-hidden"
						/>
					}
					isAuthenticated={false}
				>
					<section className="p-4 md:px-0 md:py-8 overflow-x-hidden">
						<h2 className="mb-2 text-xl font-bold">New Deals</h2>

						<ProductGrid
							products={products}
							onAddToCart={handleAddToCart}
							emptyMessage="No discounted items at the moment"
						/>
					</section>
				</StoreNavLayout>
			</div>
		</div>
	);
}
