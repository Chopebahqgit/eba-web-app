'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Search, PhoneCall } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function TopUtilitySearchBar() {
	return (
		<div className="w-full border-0 bg-background">
			<div className="mx-auto flex h-14 items-center justify-between gap-4 px-4 md:px-0">
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

				<div className="flex flex-1 justify-center md:px-4">
					<div className="relative w-full md:max-w-md">
						<Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
						<Input type="search" placeholder="Search products..." className="pl-9" />
					</div>
				</div>

				<div className="flex items-end gap-2 text-sm px-1 ">
					<a
						href="tel:+1219555014"
						className="flex items-end gap-2 hover:text-primary transition-colors"
					>
						<PhoneCall className="md:h-5 md:w-5 h-4 w-4" />
						<div className=" flex flex-col items-start">
							<p className="text-xs"> Support</p>
							<span className="text-xs md:font-medium">(219) 555-014</span>
						</div>
					</a>
				</div>
			</div>
		</div>
	);
}
