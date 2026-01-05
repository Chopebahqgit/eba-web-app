'use client';

import dynamic from 'next/dynamic';
import React, { useMemo, useState, memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductProps } from '@/types/products';
import { formatCurrency } from '@/lib/utils';
import { Handbag } from 'lucide-react';

type ProductCardProps = {
	product: ProductProps;
	onAddToCart: (product: ProductProps) => void;
};

const ProductExpiredOverlay = dynamic(
	() => import('./countdown').then(m => m.ProductExpiredOverlay),
	{ ssr: false },
);
const ProductExpiryCountdown = dynamic(
	() => import('./countdown').then(m => m.ProductExpiryCountdown),
	{ ssr: false },
);

const ProductCardComponent: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
	const [imageError, setImageError] = useState(false);

	const hasDiscount =
		typeof product.originalPrice === 'number' && product.originalPrice > product.price;

	const fallbackImage = '/placeholder.svg';
	const firstImageUrl = useMemo(
		() => (!imageError && product.images?.length ? product.images[0].url : fallbackImage),
		[imageError, product.images],
	);

	return (
		<div className="group bg-card border rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
			<Link href={`/product/${product.slug}`} prefetch={false}>
				<div className="h-60 relative overflow-hidden">
					<Image
						src={firstImageUrl}
						alt={product.images?.[0]?.altText || product.name}
						fill
						className="object-cover group-hover:scale-110 transition-transform duration-500"
						onError={() => setImageError(true)}
						loading="lazy"
					/>
					<ProductExpiredOverlay expiryDate={product.expiryDate} />
				</div>
			</Link>

			<ProductExpiryCountdown expiryDate={product.expiryDate} />

			<div className="p-2 ">
				<h3 className="text-xs font-semibold text-eba-primary">{product.store}</h3>
				<h3 className="text-sm font-semibold text-muted-foreground">{product.name}</h3>

				<div className="flex justify-between">
					<div className="flex items-center">
						<span className=" font-semibold">{formatCurrency(product.price)}</span>
						{hasDiscount && (
							<span className="text-gray-500 text-sm line-through ml-2">
								{formatCurrency(product.originalPrice as number)}
							</span>
						)}
					</div>

					<Button
						onClick={() => onAddToCart(product)}
						disabled={!product.inStock}
						className="rounded-full bg-gray-200 hover:bg-gray-300"
						size={'icon'}
						aria-label="Add to cart"
					>
						<Handbag className="text-black" aria-hidden="true" />
					</Button>
				</div>
			</div>
		</div>
	);
};

const ProductCard = memo(ProductCardComponent);
ProductCard.displayName = 'ProductCard';
export default ProductCard;
