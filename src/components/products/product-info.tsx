import { ProductProps } from '@/types/products';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Handbag } from 'lucide-react';

interface ProductInfoProps {
	product: ProductProps;
	quantity: number;
	onQuantityChange: (quantity: number) => void;
	onAddToCart: () => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
	product,
	quantity,
	onQuantityChange,
	onAddToCart,
}) => {
	const hasDiscount = product.originalPrice && product.originalPrice > product.price;

	return (
		<div>
			<h1 className="text-xl md:text-xl font-medium text-foreground mb-1">{product.name}</h1>

			<div className="flex items-center mb-2">
				<div className="flex ">
					{[...Array(5)].map((_, i) => (
						<svg
							key={i}
							xmlns="http://www.w3.org/2000/svg"
							className={`h-4 w-4 ${
								i < Math.floor(Number(product.rating))
									? 'fill-current'
									: 'stroke-current'
							}`}
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
							/>
						</svg>
					))}
				</div>
				<span className="text-xs text-gray-400 ml-2">
					{product.rating} ({product.reviewCount} reviews)
				</span>
			</div>

			<div className="mb-4">
				<div className="flex items-center gap-3">
					{hasDiscount && (
						<span className="text-xs text-gray-500 line-through">
							₦{product.originalPrice!.toLocaleString()}
						</span>
					)}
					<span className="text-xl font-bold ">₦{product.price.toLocaleString()}</span>
				</div>
				{hasDiscount && (
					<div className="text-green-500 text-sm mt-1">
						Save ₦{(product.originalPrice! - product.price).toLocaleString()} (
						{Math.round(
							((product.originalPrice! - product.price) / product.originalPrice!) *
								100,
						)}
						%)
					</div>
				)}
				<Separator />
			</div>

			<p className="text-mute-foreground text-sm mb-8">{product.description}</p>
			<Separator />

			<div className="mb- space-y-2">
				<div className="flex gap-2 items-center">
					<label htmlFor="quantity" className="block text-m/ute-foreground">
						Quantity
					</label>
					<span className="text-sm text-gray-500 dark:text-gray-400">
						(Only {product.inStock ? 'limited' : 'no'} stock left)
					</span>
				</div>

				<div className="mb-8 flex gap-4 items-center flex-wrap md:flex-nowrap">
					<div className="flex items-center">
						<button
							onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
							className="w-10 h-10 flex items-center justify-center border border-gray-300 dark:border-gray-700 rounded-l-lg bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
						>
							−
						</button>
						<div className="w-16 h-10 flex items-center justify-center border-y border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-medium">
							{quantity}
						</div>
						<button
							onClick={() => onQuantityChange(quantity + 1)}
							className="w-10 h-10 flex items-center justify-center border border-gray-300 dark:border-gray-700 rounded-r-lg bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
						>
							+
						</button>
					</div>
					<div className="w-full flex items-end">
						<Button
							onClick={onAddToCart}
							disabled={!product.inStock}
							className={`w-full py-5 rounded-2xl  md:text-lg transition-colors duration-300 ${
								product.inStock
									? 'bg-eba-primary text-white'
									: 'bg-gray-700 text-gray-500 cursor-not-allowed'
							}`}
							label={product.inStock ? 'Add to Cart' : 'Out of Stock'}
							icon={Handbag}
							iconPosition="end"
						/>
					</div>
				</div>
			</div>
			<Separator />

			{product.tags && product.tags.length > 0 && (
				<div className="mt-2">
					<span className="text-gray-400 mr-2">Tags:</span>
					{product.tags.map((tag, index) => (
						<span
							key={tag.id ?? index}
							className="inline-block text-sm px-3 py-1 rounded-full mr-2 mb-2"
						>
							{typeof tag === 'string' && tag}
						</span>
					))}
				</div>
			)}
		</div>
	);
};

export default ProductInfo;
