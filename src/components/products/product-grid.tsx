'use client';

import React from 'react';
import { ProductProps } from '@/types/products';
import ProductCard from './product-card';

type ProductGridProps = {
	products: ProductProps[];
	onAddToCart: (product: ProductProps) => void;
	emptyMessage?: string;
};

const ProductGrid: React.FC<ProductGridProps> = ({
	products,
	onAddToCart,
	emptyMessage = 'No products available',
}) => {
	if (!products.length) {
		return <div className="py-20 text-center text-muted-foreground">{emptyMessage}</div>;
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
			{products.map(product => (
				<ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
			))}
		</div>
	);
};

export default ProductGrid;
