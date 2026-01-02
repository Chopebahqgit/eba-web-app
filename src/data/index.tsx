'úse client';

import { Slide } from '@/components/slideshow';
import { Button } from '@/components/ui/button';

export const navigationLinks = [
	{ href: '/', label: 'Home' },
	{
		label: 'Stores',
		submenu: true,
		type: 'description',
		items: [
			{
				description: 'Browse all components in the library.',
				href: '#',
				label: 'Components',
			},
			{
				description: 'Learn how to use the library.',
				href: '#',
				label: 'Documentation',
			},
			{
				description: 'Pre-built layouts for common use cases.',
				href: '#',
				label: 'Templates',
			},
		],
	},
	// {
	// 	label: 'Pages',
	// 	submenu: true,
	// 	type: 'simple',
	// 	items: [
	// 		{ href: '#', label: 'Product A' },
	// 		{ href: '#', label: 'Product B' },
	// 		{ href: '#', label: 'Product C' },
	// 		{ href: '#', label: 'Product D' },
	// 	],
	// },
	{
		label: 'Account',
		submenu: true,
		type: 'icon',
		items: [
			{ href: '#', icon: 'BookOpenIcon', label: 'My Account' },
			{ href: '#', icon: 'LifeBuoyIcon', label: 'Orders' },
			{ href: '#', icon: 'InfoIcon', label: 'Wishlist' },
		],
	},
	{ href: '/contact-us', label: 'Contact Us' },
];

export const slides: Slide[] = [
	{
		bgImage: '/can-store.jpg',
		customContent: (
			<div className="text-left p-4 md:p-12 w-full text-white">
				<span className="inline-block mb-3 rounded-full bg-eba-green px-3 py-1 text-xs font-medium">
					Save up to 70%
				</span>

				<h1 className="text-3xl md:text-5xl font-bold mb-4">
					Smart Shopping,
					<br />
					Bigger Savings
				</h1>

				<p className="mb-6 text-white/90">
					Buy quality products that are close to expiry at unbeatable prices. Same
					quality. Much less cost.
				</p>

				<Button className="border border-white bg-white text-black hover:bg-white/90">
					Start Saving Now
				</Button>
			</div>
		),
	},

	{
		bgImage: '/fruit-store.jpg',
		customContent: (
			<div className="text-left p-4 md:p-12 w-full text-white">
				<span className="inline-block mb-3 rounded-full bg-eba-green px-3 py-1 text-xs font-medium">
					Reduce Waste
				</span>

				<h1 className="text-3xl md:text-5xl font-bold mb-4">
					Fresh Deals,
					<br />
					Before They Expire
				</h1>

				<p className="mb-6 text-white/90">
					From groceries to essentials — shop items nearing expiry dates, still safe and
					approved, at discounted prices.
				</p>

				<div className="flex gap-3">
					<Button variant="secondary">Browse Deals</Button>
					<Button className="border-white text-white">How It Works</Button>
				</div>
			</div>
		),
	},

	{
		bgImage: '/shopping-together.jpg',
		customContent: (
			<div className="text-center p-4 md:p-12 w-full text-white">
				<span className="inline-block mb-3 rounded-full bg-orange-500/90 px-3 py-1 text-xs font-medium">
					Limited Time
				</span>

				<h1 className="text-3xl md:text-5xl font-bold mb-4">Last-Chance Deals</h1>

				<p className="mb-6 text-white/90">
					These products won’t last long. Grab them before expiry and enjoy massive
					discounts while stocks last.
				</p>

				<Button className="bg-primary hover:bg-primary/90">View Expiring Deals</Button>
			</div>
		),
	},
];
