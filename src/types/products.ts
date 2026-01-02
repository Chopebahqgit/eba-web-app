export interface ProductProps {
	id: string;
	name: string;
	slug: string;
	description: string;
	price: number;
	originalPrice?: number | null;
	discountPercentage?: number;

	inStock: boolean;
	inventory: number;
	minOrderQty?: number;

	expiryDate: string; // ISO string (e.g. 2026-01-30T23:59:59Z)
	manufacturedDate?: string;
	expiryStatus?: 'fresh' | 'near-expiry' | 'expired';

	// Food & compliance
	batchNumber?: string;
	storageType?: 'ambient' | 'chilled' | 'frozen';
	supplierName?: string;

	rating: number;
	reviewCount: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	reviews?: any[];

	category: ProductCategory;
	images: ProductImage[];
	features: ProductFeature[];
	tags: ProductTag[];

	createdAt: string;
	updatedAt: string;
}

export interface ProductCategory {
	id: string;
	name: string;
}

export interface ProductTag {
	id: string;
	tag: string;
}

export interface ProductImage {
	id: string;
	url: string;
	altText?: string | null;
}

export interface ProductFeature {
	id: string;
	feature: string;
}
