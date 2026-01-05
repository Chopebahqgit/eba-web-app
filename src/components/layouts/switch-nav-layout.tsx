'use client';

import { ReactNode, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/context/cartContext';
import { STORES } from '@/data/product';
import { SlideShow } from '@/components/slideshow';
import { slides } from '@/data';
import CartSheet from '@/components/products/cart-sheet';

import NavLayout from './nav-layout';
import PublicNavBar from '../navbar/public-navbar';

type Props = { children: ReactNode };

export default function SwitchNavBar({ children }: Props) {
	const [activeStore, setActiveStore] = useState('shoprite');
	const { closeCart, removeFromCart, isCartOpen, cartProducts } = useCart();
	const router = useRouter();
	const pathname = usePathname();
	const { cartCount, openCart } = useCart();
	const isAuthPage = pathname === '/login' || pathname === '/register';
	const isHomePage = pathname === '/';

	if (isAuthPage) {
		return (
			<>
				<PublicNavBar />
				{children}
			</>
		);
	}

	return (
		<div className="flex flex-col items-center font-sans dark:bg-black min-h-screen">
			<div className="w-full md:w-[80%] flex-1">
				<NavLayout
					cartCount={cartCount}
					onCartClick={openCart}
					stores={STORES}
					activeStore={activeStore}
					isAuthenticated={false}
					onSelectStore={setActiveStore}
					sidebarMode={isHomePage ? 'push' : 'overlay'}
					hero={
						isHomePage ? (
							<SlideShow
								slides={slides}
								interval={6000}
								transitionDuration={1200}
								className="relative w-full h-100 md:h-125 overflow-hidden"
							/>
						) : undefined
					}
				>
					{children}
				</NavLayout>
			</div>
			<CartSheet
				cartProducts={cartProducts}
				open={isCartOpen}
				onOpenChange={closeCart}
				onRemoveProduct={removeFromCart}
				isLoading={false}
				onCheckout={() => {
					closeCart();
					router.push('/checkout');
				}}
			/>
		</div>
	);
}
