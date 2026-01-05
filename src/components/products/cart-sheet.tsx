import { ReusableSheet } from '@/components/sheet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ProductProps } from '@/types/products';
import Image from 'next/image';
import { X } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface CartSheetProps {
	cartProducts: ProductProps[];
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onCheckout: () => void;
	onRemoveProduct: (id: string) => void;
	isLoading?: boolean;
}

export default function CartSheet({
	cartProducts,
	open,
	onOpenChange,
	onCheckout,
	onRemoveProduct,
	isLoading = false,
}: CartSheetProps) {
	return (
		<ReusableSheet
			open={open}
			onOpenChange={onOpenChange}
			title="Cart"
			description="Products you added in cart will appear here"
			className="bg-gray-100 dark:bg-gray-700 px-5 py-4"
		>
			<Card className="border-0 -mt-4 rounded-none shadow-none bg-white h-[90dvh] md:h-[90dvh]  flex flex-col overflow-hidden">
				<CardContent className="flex-1 overflow-y-auto space-y-4 pr-1">
					{cartProducts.length === 0 && (
						<div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground gap-2">
							<p className="text-sm font-medium">Your cart is empty</p>
							<p className="text-xs">Add items to your cart to see them here</p>
						</div>
					)}
					{cartProducts.map((product, index) => {
						const firstImage = product.images[0];
						return (
							<div
								key={`${product.id} - ${index}`}
								className="flex items-center gap-4 border-b pb-3 last:border-b-0 relative"
							>
								<button
									onClick={() => onRemoveProduct(product.id)}
									className="absolute top-0 right-0 p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full border"
									aria-label={`Remove ${product.name} from cart`}
								>
									<X className="h-4 w-4 text-red-600" />
								</button>

								{firstImage ? (
									<Image
										src={firstImage.url}
										alt={firstImage.altText || product.name}
										width={64}
										height={64}
										className="rounded-lg object-cover"
									/>
								) : (
									<div className="h-16 w-16 bg-gray-300 rounded-lg flex items-center justify-center text-gray-500">
										No Image
									</div>
								)}

								<div className="flex-1 flex flex-col">
									<h3 className="text-sm font-semibold text-foreground">
										{product.name}
									</h3>
									<p className="text-xs text-muted-foreground">{product.store}</p>

									<div className="flex items-center gap-2 mt-1">
										<span className="text-sm font-semibold text-foreground">
											{formatCurrency(product.price)}
										</span>
										{!!product.originalPrice && (
											<span className="text-xs line-through text-muted-foreground">
												{formatCurrency(product.originalPrice)}
											</span>
										)}
										{!!product.discountPercentage && (
											<span className="text-xs text-primary font-medium">
												-{product.discountPercentage}%
											</span>
										)}
									</div>
								</div>
							</div>
						);
					})}
				</CardContent>

				{cartProducts.length > 0 && (
					<CardFooter className="shrink-0 flex flex-col gap-3 bg-white dark:bg-gray-900 px-4 mb-4 md:mb-0">
						<Button
							className="w-full rounded-full bg-green-600 hover:bg-green-700 text-white"
							size="lg"
							onClick={onCheckout}
							disabled={isLoading}
							label="Checkout"
							isLoading={isLoading}
						/>
					</CardFooter>
				)}
			</Card>
		</ReusableSheet>
	);
}
