'use client';

import { useCart } from '@/context/cart/cartContext';
import { Trash2, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function Cart() {
	const { removeFromCart, increaseQuantity, decreaseQuantity, cartProducts, getCartTotal } =
		useCart();

	const subtotal = getCartTotal();
	const tax = subtotal * 0.1;
	const total = subtotal + tax;

	if (cartProducts.length === 0) {
		return (
			<div className="p-8 text-center">
				<h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
				<p className="text-gray-500">Add some products to get started!</p>
			</div>
		);
	}

	return (
		<div className="px-4">
			<div className="text-center my-12">
				<h1 className="text-xl md:text-3xl font-bold text-center">My Shopping Cart</h1>
			</div>
			<div className="flex flex-col lg:flex-row gap-6 items-start">
				<div className="overflow-x-auto shadow-md rounded-lg w-full lg:w-2/3">
					<table className="w-full bg-white border">
						<thead className="bg-gray-100 border-b">
							<tr>
								<th className="px-6 py-4 text-left text-sm font-normal text-gray-700">
									Product
								</th>
								<th className="px-6 py-4 text-center text-sm font-normal text-gray-700">
									Price
								</th>
								<th className="px-6 py-4 text-center text-sm font-normal text-gray-700">
									Quantity
								</th>
								<th className="px-6 py-4 text-center text-sm font-normal text-gray-700">
									Subtotal
								</th>
								<th className="px-6 py-4 text-center text-sm font-normal text-gray-700">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200">
							{cartProducts.map(item => (
								<tr key={item.id} className="hover:bg-gray-50 transition">
									<td className="px-6 py-4">
										<div className="flex items-center gap-4">
											{item.images.length > 0 && (
												<Image
													src={item.images[0].url}
													alt={item.name}
													className="w-16 h-16 object-cover rounded"
													width={24}
													height={24}
												/>
											)}
											<div>
												<p className="text-gray-700 text-sm">{item.name}</p>
											</div>
										</div>
									</td>

									<td className="px-6 py-4 text-center text-gray-700 text-sm">
										{formatCurrency(item.price || 0)}
									</td>

									<td className="px-6 py-4 ">
										<div className="flex items-center justify-center  border rounded-2xl p-1">
											<Button
												onClick={() => decreaseQuantity(item.id)}
												className="hover:bg-gray-200 transition border rounded-full bg-gray-100 text-black"
												aria-label="Decrease quantity"
												size={'icon'}
											>
												<Minus size={16} />
											</Button>
											<span className="w-12 text-center font-medium">
												{item.quantity}
											</span>
											<Button
												onClick={() => increaseQuantity(item.id)}
												className="hover:bg-gray-200 transition  border rounded-full bg-gray-100 text-black"
												aria-label="Increase quantity"
												size={'icon'}
											>
												<Plus size={16} />
											</Button>
										</div>
									</td>

									<td className="px-6 py-4 text-center font-semibold  text-gray-700 text-sm">
										{formatCurrency((item.price || 0) * item.quantity)}
									</td>

									<td className="px py-4 text-center">
										<Button
											onClick={() => removeFromCart(item.id)}
											className="text-red-600 hover:text-red-800 transition cursor-pointer p-0 bg-transparent rounded hover:bg-red-50"
											aria-label="Remove item"
										>
											<Trash2 size={18} />
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<div className="bg-white rounded-lg w-full lg:w-1/3 p-4 border lg:sticky top-4">
					<h2 className="font-medium mb-4">Cart Summary</h2>
					<div className="space-y-2">
						<div className="flex justify-between text-gray-700 text-sm">
							<span>Subtotal:</span>
							<span>{formatCurrency(subtotal)}</span>
						</div>
						<div className="flex justify-between text-gray-700 text-sm">
							<span>Tax (10%):</span>
							<span>{formatCurrency(tax)}</span>
						</div>
						<div className="border-t pt-2 mt-2  text-lg">
							<div className="flex justify-between">
								<span>Total:</span>
								<span className="font-semibold">{formatCurrency(total)}</span>
							</div>
						</div>
					</div>
					<Button
						className="w-full mt-6 bg-eba-primary text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition"
						label="	Proceed to Checkout"
					/>
				</div>
			</div>
		</div>
	);
}
