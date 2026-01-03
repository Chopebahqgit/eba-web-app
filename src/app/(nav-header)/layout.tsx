'use client';

import StoreNavLayout from '@/components/layouts/nav-layout';
import { STORES } from '@/data/product';
import { ReactNode, useState } from 'react';

type LayoutProps = {
	children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
	const [activeStore, setActiveStore] = useState('shoprite');

	return (
		<div className="flex flex-col items-center font-sans dark:bg-black min-h-screen">
			<div className="w-full md:w-[80%] flex-1">
				<StoreNavLayout
					stores={STORES}
					activeStore={activeStore}
					onSelectStore={setActiveStore}
					isAuthenticated={false}
					sidebarMode="overlay"
				>
					{children}
				</StoreNavLayout>
			</div>
		</div>
	);
}
