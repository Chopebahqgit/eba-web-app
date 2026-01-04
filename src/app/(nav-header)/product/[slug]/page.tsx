'use client';

import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import ProductGallery from '@/components/products/product-gallery';
import ProductInfo from '@/components/products/product-info';
import { products } from '@/data/product';
import { ProductProps } from '@/types/products';

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function ProductDetailPage() {
	const params = useParams();
	const slug = params.slug as string;

	const [selectedImage, setSelectedImage] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [activeTab, setActiveTab] = useState<'description' | 'features' | 'reviews'>(
		'description',
	);

	const product: ProductProps | undefined = useMemo(
		() => products.find(p => p.slug === slug),
		[slug],
	);

	console.log(product);

	const handleAddToCart = () => {
		console.log('Add to cart:', {
			product,
			quantity,
		});
	};

	if (!product) {
		return (
			<div className="min-h-screen flex items-center justify-center text-gray-400">
				Product not found.
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center font-sans dark:bg-black">
			<div className="w-full md:w-[80%] flex-col justify-center items-center px-4 lg:px-2 py-4">
				<div className="mb-8">
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink href="/">Home</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbLink className="text-eba-primary">
									{product.name}
								</BreadcrumbLink>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
					<ProductGallery
						images={product.images}
						selectedImage={selectedImage}
						onSelectImage={setSelectedImage}
						productName={product.name}
					/>

					<ProductInfo
						product={product}
						quantity={quantity}
						onQuantityChange={setQuantity}
						onAddToCart={handleAddToCart}
					/>
				</div>

				<div className="border-b mb-8">
					<nav className="flex space-x-8">
						{['description', 'features', 'reviews'].map(tab => (
							<button
								key={tab}
								className={`py-4 px-1 text-sm font-medium border-b-2 ${
									activeTab === tab
										? 'border-eba-primary text-eba-primary'
										: 'border-transparent text-foreground hover:text-gray-600'
								}`}
								onClick={() => setActiveTab(tab as typeof activeTab)}
							>
								{tab.charAt(0).toUpperCase() + tab.slice(1)}
							</button>
						))}
					</nav>
				</div>

				<div className="mb-8">
					{activeTab === 'description' && (
						<section>
							<h3 className="text-lg font-semibold text-foreground">
								Product Description
							</h3>
							<p className="text-mute-foreground leading-relaxed text-sm">
								{product.description}
							</p>
						</section>
					)}

					{activeTab === 'features' && (
						<section>
							<h3 className="text-lg font-semibold text-foreground">
								Features &amp; Details
							</h3>
							<ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{product.features.length > 0 ? (
									product.features.map((f, index) => (
										<li key={index} className="flex items-start">
											<svg
												className="h-5 w-5 text-gold-deep mt-0.5 mr-3 flex-shrink-0"
												viewBox="0 0 20 20"
												fill="currentColor"
											>
												<path
													fillRule="evenodd"
													d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
													clipRule="evenodd"
												/>
											</svg>
											<span className="text-gray-300">{f.feature}</span>
										</li>
									))
								) : (
									<p className="text-gray-400">No features listed.</p>
								)}
							</ul>
						</section>
					)}

					{activeTab === 'reviews' && (
						<section>
							<h3 className="text-lg font-semibold text-foreground">Reviews</h3>
							<p className="text-gray-400">Reviews will be available soon.</p>
						</section>
					)}
				</div>
			</div>
		</div>
	);
}
