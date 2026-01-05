'use client';

import {
	BookOpenIcon,
	InfoIcon,
	LifeBuoyIcon,
	ShoppingCart,
	CircleUser,
	Heart,
	ShoppingBag,
	Settings,
	MapPin,
	LogOut,
	Menu,
	User,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { getNavigationLinks } from '@/data';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { NavLink } from '@/types/navigation';
import Link from 'next/link';

interface NavigationProps {
	isAuthenticated?: boolean;
	user?: {
		name?: string;
		email?: string;
		avatar?: string;
	} | null;
	onLogout?: () => void;
	cartCount: number;
	onCartClick: () => void;
}

export default function Navigation({
	isAuthenticated = false,
	user = null,
	onLogout,
	cartCount,
	onCartClick,
}: NavigationProps) {
	const pathname = usePathname();
	const [navigationLinks, setNavigationLinks] = useState<NavLink[]>(() =>
		getNavigationLinks(isAuthenticated),
	);
	useEffect(() => {
		setNavigationLinks(getNavigationLinks(isAuthenticated));
	}, [isAuthenticated]);

	const isActive = (href?: string) => {
		if (!href || href === '#') return false;
		return pathname === href || pathname.startsWith(`${href}/`);
	};

	const isMobileOnlyAuthLink = (link: NavLink) => {
		if (!('href' in link)) return false;
		return link.href === '/login' || link.href === '/register';
	};

	const getIconComponent = (iconName: string) => {
		const iconMap: Record<string, React.ReactNode> = {
			BookOpenIcon: (
				<BookOpenIcon aria-hidden="true" className="text-foreground opacity-60" size={16} />
			),
			LifeBuoyIcon: (
				<LifeBuoyIcon aria-hidden="true" className="text-foreground opacity-60" size={16} />
			),
			InfoIcon: (
				<InfoIcon aria-hidden="true" className="text-foreground opacity-60" size={16} />
			),
			CircleUser: (
				<CircleUser aria-hidden="true" className="text-foreground opacity-60" size={16} />
			),
			ShoppingBag: (
				<ShoppingBag aria-hidden="true" className="text-foreground opacity-60" size={16} />
			),
			Heart: <Heart aria-hidden="true" className="text-foreground opacity-60" size={16} />,
			Settings: (
				<Settings aria-hidden="true" className="text-foreground opacity-60" size={16} />
			),
			MapPin: <MapPin aria-hidden="true" className="text-foreground opacity-60" size={16} />,
			LogOut: <LogOut aria-hidden="true" className="text-foreground opacity-60" size={16} />,
		};
		return iconMap[iconName] || null;
	};

	return (
		<header className="w-full flex items-center justify-center">
			<div className="flex h-14 items-center justify-between gap-4 w-full bg-primary/75">
				{/* Left side */}
				<div className="flex items-center gap-2">
					{/* Mobile menu trigger */}
					<Popover>
						<PopoverTrigger asChild>
							<Button
								className="group size-9 border ml-1 hover:bg-primary md:hidden"
								size="icon"
								variant="ghost"
								aria-label="Open user menu"
							>
								<Menu size={18} className="text-white" aria-hidden="true" />
							</Button>
						</PopoverTrigger>
						<PopoverContent align="start" className="w-64 p-1 md:hidden">
							<NavigationMenu className="max-w-none *:w-full">
								<NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
									{navigationLinks.map((link, index) => (
										<NavigationMenuItem className="w-full" key={link.label}>
											{link.submenu ? (
												<>
													<div className="px-2 py-1.5 font-medium text-muted-foreground text-xs">
														{link.label}
													</div>
													<ul>
														{link.items.map((item, _itemIndex) => (
															<li key={item.label}>
																<NavigationMenuLink
																	className="py-1.5"
																	href={item.href}
																>
																	{item.label}
																</NavigationMenuLink>
															</li>
														))}
														{/* Add logout option in mobile menu for authenticated users */}
														{isAuthenticated &&
															link.label === 'My Account' && (
																<li>
																	<button
																		onClick={onLogout}
																		className="w-full text-left py-1.5 px-3 hover:bg-accent rounded text-red-600"
																	>
																		<div className="flex items-center gap-2">
																			<LogOut size={16} />
																			<span>Logout</span>
																		</div>
																	</button>
																</li>
															)}
													</ul>
												</>
											) : (
												<NavigationMenuLink
													className="py-1.5"
													href={link.href}
												>
													{link.label}
												</NavigationMenuLink>
											)}
											{index < navigationLinks.length - 1 &&
												((!link.submenu &&
													navigationLinks[index + 1].submenu) ||
													(link.submenu &&
														!navigationLinks[index + 1].submenu) ||
													(link.submenu &&
														navigationLinks[index + 1].submenu &&
														link.type !==
															navigationLinks[index + 1].type)) && (
													<div
														aria-orientation="horizontal"
														className="-mx-1 my-1 h-px w-full bg-border"
														role="separator"
														tabIndex={-1}
													/>
												)}
										</NavigationMenuItem>
									))}
								</NavigationMenuList>
							</NavigationMenu>
						</PopoverContent>
					</Popover>

					{/* Main nav */}
					<div className="flex items-center gap-6">
						<NavigationMenu className="max-md:hidden" viewport={false}>
							<NavigationMenuList className="gap-2">
								{navigationLinks
									.filter(link => !isMobileOnlyAuthLink(link))
									.map(link => (
										<NavigationMenuItem key={link.label}>
											{link.submenu ? (
												<>
													<NavigationMenuTrigger className="*:[svg]:-me-0.5 bg-transparent-500 px-2 py-1.5 font-medium text-gray-400 hover:text-primary *:[svg]:size-3.5">
														{link.label}
													</NavigationMenuTrigger>
													<NavigationMenuContent className="data-[motion=from-end]:slide-in-from-right-16! data-[motion=from-start]:slide-in-from-left-16! data-[motion=to-end]:slide-out-to-right-16! data-[motion=to-start]:slide-out-to-left-16! z-50 p-1">
														<ul
															className={cn(
																link.type === 'description'
																	? 'min-w-64'
																	: 'min-w-48',
															)}
														>
															{link.items.map(item => (
																<li key={item.label}>
																	<NavigationMenuLink
																		className="py-1.5 hover:bg-accent rounded px-2"
																		href={item.href}
																	>
																		{/* Display icon if present */}
																		{link.type === 'icon' &&
																			'icon' in item && (
																				<div className="flex items-center gap-2">
																					{getIconComponent(
																						item.icon as string,
																					)}
																					<span>
																						{item.label}
																					</span>
																				</div>
																			)}

																		{/* Display label with description if present */}
																		{link.type ===
																			'description' &&
																		'description' in item ? (
																			<div className="space-y-1">
																				<div className="font-medium">
																					{item.label}
																				</div>
																				<p className="line-clamp-2 text-muted-foreground text-xs">
																					{
																						item.description
																					}
																				</p>
																			</div>
																		) : (
																			!link.type ||
																			(link.type !== 'icon' &&
																				link.type !==
																					'description' && (
																					<span>
																						{item.label}
																					</span>
																				))
																		)}
																	</NavigationMenuLink>
																</li>
															))}
															{/* Add logout option in desktop dropdown for authenticated users */}
															{isAuthenticated &&
																link.label === 'My Account' &&
																onLogout && (
																	<li>
																		<button
																			onClick={onLogout}
																			className="w-full text-left py-1.5 px-2 hover:bg-accent rounded text-red-600"
																		>
																			<div className="flex items-center gap-2">
																				<LogOut size={16} />
																				<span>Logout</span>
																			</div>
																		</button>
																	</li>
																)}
														</ul>
													</NavigationMenuContent>
												</>
											) : (
												<NavigationMenuLink
													href={link.href}
													className={cn(
														'py-1.5 font-medium transition-colors',
														isActive(link.href)
															? 'text-white'
															: 'text-gray-400 hover:text-primary',
													)}
												>
													{link.label}
												</NavigationMenuLink>
											)}
										</NavigationMenuItem>
									))}
							</NavigationMenuList>
						</NavigationMenu>
					</div>
				</div>

				<div className="flex items-center gap-3 text-sm px-3">
					<Heart className="h-5 w-5 text-white cursor-pointer hover:text-gray-200" />

					<div
						className="relative cursor-pointer"
						onClick={onCartClick}
						role="button"
						aria-label="Open cart"
					>
						<ShoppingCart className="h-5 w-5 text-white hover:text-gray-200" />

						{cartCount > 0 && (
							<span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-eba-primary px-1 text-[10px] font-medium text-white">
								{cartCount}
							</span>
						)}
					</div>

					{isAuthenticated ? (
						<div className="relative group">
							<Link
								href={'/account/dashboard'}
								className="flex items-center gap-2"
								aria-label={`Go to ${user?.name ?? 'account'} dashboard`}
							>
								{user?.avatar ? (
									<Image
										src={user.avatar}
										alt={user.name || 'User'}
										className="h-8 w-8 rounded-full object-cover border-2 border-white"
									/>
								) : (
									<div className="h-7 w-7 rounded-full bg-eba-primary flex items-center justify-center">
										<User className="h-5 w-5 text-white" />
									</div>
								)}
								<span className="hidden md:inline text-white text-sm">
									{user?.name || 'Account'}
								</span>
							</Link>
						</div>
					) : (
						<>
							<div className="hidden md:flex items-center gap-2">
								<Link
									href="/login"
									className="text-white hover:text-gray-200 text-sm"
								>
									Sign In
								</Link>
								<span className="text-white">|</span>
								<Link
									href="/register"
									className="text-white hover:text-gray-200 text-sm"
								>
									Register
								</Link>
							</div>
						</>
					)}
				</div>
			</div>
		</header>
	);
}
