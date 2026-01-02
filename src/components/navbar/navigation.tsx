'use client';

import { BookOpenIcon, InfoIcon, LifeBuoyIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { PhoneCall } from 'lucide-react';
import { navigationLinks } from '@/data';
import { usePathname } from 'next/navigation';

export default function Navigation() {
	const pathname = usePathname();

	const isActive = (href?: string) => {
		if (!href || href === '#') return false;
		return pathname === href || pathname.startsWith(`${href}/`);
	};
	return (
		<header className="px-4 md:px-0 w-full flex items-center justify-center border-b">
			<div className="flex h-14 items-center justify-between gap-4 w-full md:max-w-[80%]">
				{/* Left side */}
				<div className="flex items-center gap-2">
					{/* Mobile menu trigger */}
					<Popover>
						<PopoverTrigger asChild>
							<Button className="group size-8 md:hidden" size="icon" variant="ghost">
								<svg
									className="pointer-events-none"
									fill="none"
									height={16}
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									viewBox="0 0 24 24"
									width={16}
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										className="-translate-y-1.75 origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-315"
										d="M4 12L20 12"
									/>
									<path
										className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
										d="M4 12H20"
									/>
									<path
										className="origin-center translate-y-1.75 transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-135"
										d="M4 12H20"
									/>
								</svg>
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
											{/* Add separator between different types of items */}
											{index < navigationLinks.length - 1 &&
												// Show separator if:
												// 1. One is submenu and one is simple link OR
												// 2. Both are submenus but with different types
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
								{navigationLinks.map(link => (
									<NavigationMenuItem key={link.label}>
										{link.submenu ? (
											<>
												<NavigationMenuTrigger className="*:[svg]:-me-0.5 bg-transparent px-2 py-1.5 font-medium text-muted-foreground hover:text-primary *:[svg]:size-3.5">
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
																	className="py-1.5"
																	href={item.href}
																>
																	{/* Display icon if present */}
																	{link.type === 'icon' &&
																		'icon' in item && (
																			<div className="flex items-center gap-2">
																				{item.icon ===
																					'BookOpenIcon' && (
																					<BookOpenIcon
																						aria-hidden="true"
																						className="text-foreground opacity-60"
																						size={16}
																					/>
																				)}
																				{item.icon ===
																					'LifeBuoyIcon' && (
																					<LifeBuoyIcon
																						aria-hidden="true"
																						className="text-foreground opacity-60"
																						size={16}
																					/>
																				)}
																				{item.icon ===
																					'InfoIcon' && (
																					<InfoIcon
																						aria-hidden="true"
																						className="text-foreground opacity-60"
																						size={16}
																					/>
																				)}
																				<span>
																					{item.label}
																				</span>
																			</div>
																		)}

																	{/* Display label with description if present */}
																	{link.type === 'description' &&
																	'description' in item ? (
																		<div className="space-y-1">
																			<div className="font-medium">
																				{item.label}
																			</div>
																			<p className="line-clamp-2 text-muted-foreground text-xs">
																				{item.description}
																			</p>
																		</div>
																	) : (
																		// Display simple label if not icon or description type
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
													</ul>
												</NavigationMenuContent>
											</>
										) : (
											<NavigationMenuLink
												href={link.href}
												className={cn(
													'py-1.5 font-medium transition-colors',
													isActive(link.href)
														? 'text-eba-green'
														: 'text-muted-foreground hover:text-primary',
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
				<div className="flex items-center gap-2 text-sm">
					<a
						href="tel:+1219555014"
						className="flex items-center gap-2 hover:text-primary transition-colors"
					>
						<PhoneCall className="h-4 w-4 text-muted-foreground " />
						<span className="text-muted-foreground font-medium">(219) 555-014</span>
					</a>
				</div>
			</div>
		</header>
	);
}
