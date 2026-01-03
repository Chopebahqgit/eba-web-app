'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { getImageSrcOrFallback, safeImageSrc } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ProductImage } from '@/types/products';

interface ProductGalleryProps {
	images: ProductImage[];
	selectedImage: number;
	onSelectImage: (index: number) => void;
	productName: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({
	images = [],
	selectedImage,
	onSelectImage,
	productName,
}) => {
	const normalizedImages = useMemo(() => {
		const valid = Array.isArray(images)
			? images.map(img => safeImageSrc(img?.url)).filter((src): src is string => !!src)
			: [];
		return valid.length > 0 ? valid : ['/placeholder.svg'];
	}, [images]);

	const clampedIndex = Math.min(Math.max(selectedImage ?? 0, 0), normalizedImages.length - 1);

	useEffect(() => {
		if (selectedImage !== clampedIndex) {
			onSelectImage(clampedIndex);
		}
	}, [normalizedImages.length, clampedIndex, selectedImage, onSelectImage]);

	const [mainImageError, setMainImageError] = useState(false);
	const [thumbErrors, setThumbErrors] = useState<Record<number, boolean>>({});

	const handleThumbError = (index: number) => {
		setThumbErrors(prev => ({ ...prev, [index]: true }));
	};

	const mainImage = useMemo(() => {
		const src = normalizedImages[clampedIndex];
		return mainImageError ? '/placeholder.svg' : getImageSrcOrFallback(src, '/placeholder.svg');
	}, [normalizedImages, clampedIndex, mainImageError]);

	const thumbClass = (active: boolean) =>
		`relative rounded-md overflow-hidden transition-all p-1 ${
			active ? 'border-2 border-eba-primary' : 'opacity-80 hover:opacity-100'
		}`;

	return (
		<div className="flex flex-col md:flex-row-reverse gap-4">
			<div className="relative w-full aspect-4/3 md:aspect-3/2 rounded-lg overflow-hidden ">
				<Image
					src={mainImage}
					alt={`${productName} - View ${clampedIndex + 1}`}
					fill
					className="object-cover"
					onError={() => setMainImageError(true)}
					priority
				/>
			</div>

			<div className="md:hidden">
				<div className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory">
					{normalizedImages.map((image, index) => {
						const thumbnailSrc = thumbErrors[index]
							? '/placeholder.svg'
							: getImageSrcOrFallback(image, '/placeholder.svg');
						const isActive = clampedIndex === index;

						return (
							<Button
								key={index}
								onClick={() => onSelectImage(index)}
								aria-label={`Select image ${index + 1}`}
								aria-selected={isActive}
								className={`${thumbClass(isActive)} w-20 h-20 shrink-0`}
							>
								<Image
									src={thumbnailSrc}
									alt={`${productName} thumbnail ${index + 1}`}
									fill
									className="object-cover"
									sizes="80px"
									onError={() => handleThumbError(index)}
								/>
							</Button>
						);
					})}
				</div>
			</div>

			{/* Desktop thumbnails */}
			<div className="hidden md:flex gap-3">
				<div className="flex flex-col gap-3 max-h-100 overflow-y-auto no-scrollbar">
					{normalizedImages.map((image, index) => {
						const thumbnailSrc = thumbErrors[index]
							? '/placeholder.svg'
							: getImageSrcOrFallback(image, '/placeholder.svg');
						const isActive = clampedIndex === index;

						return (
							<Button
								key={index}
								type="button"
								onClick={() => onSelectImage(index)}
								aria-label={`Select image ${index + 1}`}
								aria-selected={isActive}
								className={`${thumbClass(isActive)} w-20 h-20`}
								variant="ghost"
							>
								<div className="relative w-full h-full">
									<Image
										src={thumbnailSrc}
										alt={`${productName} thumbnail ${index + 1}`}
										fill
										className="object-cover"
										sizes="64px"
										onError={() => handleThumbError(index)}
									/>
								</div>
							</Button>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default ProductGallery;
