'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Search, ShoppingCart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function TopUtilitySearchBar() {
	return (
		<div className="w-full border bg-background">
			<div className="mx-auto flex h-14 md:max-w-[80%] items-center justify-between gap-4 px-4 md:px-0">
				<Link href="/" className="flex items-center shrink-0">
					<span className="relative h-12 w-13.75  md:h-8 md:w-24">
						<Image
							src="/eba-logo-text.png"
							alt="EBA logo"
							fill
							priority
							className="object-contain"
						/>
					</span>
				</Link>

				<div className="flex flex-1 justify-center px-4">
					<div className="relative w-full max-w-md">
						<Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
						<Input type="search" placeholder="Search products..." className="pl-9" />
					</div>
				</div>

				<div className="flex items-center gap-4 shrink-0">
					<div className="h-6 w-px bg-border" />

					<Button
						variant={null}
						className="flex items-center gap-4 px-2 "
						aria-label="Shopping cart"
					>
						<div className="relative">
							<ShoppingCart className="h-5 w-5 " />
							<span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-eba-green text-[10px] font-medium text-primary-foreground">
								3
							</span>
						</div>
						<div className="hidden sm:flex flex-col items-start leading-tight">
							<span className="text-xs text-muted-foreground">Shopping Cart</span>
							<span className="text-sm font-medium">₦24,500</span>
						</div>
					</Button>
				</div>
			</div>
		</div>
	);
}
