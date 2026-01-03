'use client';

import { ReactNode, useState } from 'react';
import { Menu, ChevronDown } from 'lucide-react';
import TopUtilitySearchBar from '@/components/navbar/utility-bar';
import Navigation from '@/components/navbar/navigation';
import SidebarDropdown from '@/components/navbar/sidebar-dropdown';
import { StoreItem } from '@/types/products';

type SidebarMode = 'push' | 'overlay';

type StoreNavLayoutProps = {
	children: ReactNode;
	stores: StoreItem[];
	activeStore: string;
	onSelectStore: (id: string) => void;
	hero?: ReactNode;
	sidebarMode?: SidebarMode;
	isAuthenticated?: boolean;
	user?: {
		name?: string;
		email?: string;
		avatar?: string;
	} | null;
	onLogout?: () => void;
};

export default function StoreNavLayout({
	children,
	stores,
	activeStore,
	onSelectStore,
	hero,
	sidebarMode = 'push',
	isAuthenticated = false,
	user = null,
	onLogout = () => {},
}: StoreNavLayoutProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const isOverlay = sidebarMode === 'overlay';

	return (
		<div className="w-full h-full flex flex-col">
			{/* FIXED HEADER */}
			<div className="fixed top-0 left-0 right-0 z-50 bg-white">
				<div className="w-full md:w-4/5 md:mx-auto">
					<TopUtilitySearchBar />

					<div className="relative flex w-full">
						{/* STORE TOGGLER */}
						<div
							className="hidden md:flex h-14 cursor-pointer items-center justify-between gap-2 bg-primary/80 text-white md:w-1/4"
							onClick={() => setIsMenuOpen(prev => !prev)}
						>
							<div className="ml-2 flex items-center gap-4">
								<div className="h-10 w-10 flex items-center justify-center rounded bg-eba-primary">
									<Menu size={18} />
								</div>
								<h2 className="text-sm font-semibold">All Stores</h2>
							</div>

							<ChevronDown
								size={16}
								className={`mr-4 transition-transform ${
									isMenuOpen ? 'rotate-180' : ''
								}`}
							/>
						</div>

						<div className="flex-1">
							<Navigation
								isAuthenticated={isAuthenticated}
								user={user}
								onLogout={onLogout}
							/>
						</div>

						{/* OVERLAY MODE */}
						{isOverlay && isMenuOpen && (
							<div className="absolute left-0 top-full z-40 hidden md:block md:w-1/4 bg-white border-x shadow-lg">
								<SidebarDropdown
									stores={stores}
									activeStore={activeStore}
									onSelectStore={onSelectStore}
								/>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* CONTENT */}
			<div className="flex-1 overflow-y-auto mt-28">
				<div className="w-full md:mx-auto">
					<div className="flex w-full">
						{/* PUSH MODE */}
						{!isOverlay && (
							<aside
								className={`hidden md:block transition-all duration-300 ease-in-out ${
									isMenuOpen ? 'w-1/4' : 'w-0'
								}`}
							>
								{isMenuOpen && (
									<div className="border-x bg-white">
										<SidebarDropdown
											stores={stores}
											activeStore={activeStore}
											onSelectStore={onSelectStore}
										/>
									</div>
								)}
							</aside>
						)}

						{/* HERO */}
						{hero && (
							<div
								className={`transition-all duration-300 ease-in-out ${
									!isOverlay && isMenuOpen ? 'md:w-3/4' : 'w-full'
								}`}
							>
								{hero}
							</div>
						)}
					</div>

					<div className="w-full mt-4">{children}</div>
				</div>
			</div>
		</div>
	);
}
