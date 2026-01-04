'úse client';

import { Slide } from '@/components/slideshow';
import { Button } from '@/components/ui/button';
import { NavLink } from '@/types/navigation';

export const navigationLinks: {
	public: NavLink[];
	authenticated: NavLink[];
	unauthenticated: NavLink[];
} = {
	public: [
		{ href: '/', label: 'Home' },

		{
			label: 'Stores',
			submenu: true,
			type: 'description',
			items: [
				{
					label: 'All Stores',
					href: '/stores',
					description: 'Browse all stores in our network.',
				},
				{
					label: 'Stores Near Me',
					href: '/stores/near-me',
					description: 'Find stores close to your location.',
				},
				{
					label: 'Featured Stores',
					href: '/stores/featured',
					description: 'Trending and featured stores.',
				},
			],
		},

		{ href: '/contact-us', label: 'Contact Us' },
	],

	authenticated: [
		{
			label: 'My Account',
			submenu: true,
			type: 'icon',
			items: [
				{ href: '/account/dashboard', label: 'Dashboard', icon: 'CircleUser' },
				{ href: '/account/orders', label: 'My Orders', icon: 'ShoppingBag' },
				{ href: '/account/wishlist', label: 'Wishlist', icon: 'Heart' },
				{ href: '/account/settings', label: 'Settings', icon: 'Settings' },
				{ href: '/account/addresses', label: 'Addresses', icon: 'MapPin' },
			],
		},
	],

	unauthenticated: [
		{ href: '/login', label: 'Login' },
		{ href: '/register', label: 'Register' },
	],
};

export const getNavigationLinks = (isAuthenticated: boolean): NavLink[] => {
	return [
		...navigationLinks.public,
		...(isAuthenticated ? navigationLinks.authenticated : navigationLinks.unauthenticated),
	];
};

export const slides: Slide[] = [
	{
		bgImage: '/can-store.jpg',
		customContent: (
			<div className="text-left px-4 md:p-12 w-full text-white">
				<span className="inline-block mb-3 rounded-full bg-eba-secondary/90 px-3 py-1 text-xs font-medium">
					Save up to 70%
				</span>

				<h1 className="text-3xl md:text-5xl font-bold mb-4">
					Smart Shopping,
					<br />
					Exceptional Value
				</h1>

				<p className="mb-6 text-white/90">
					Discover quality products offered during their best-value window — same trusted
					brands, smarter pricing.
				</p>

				<Button className="border border-white bg-white text-black hover:bg-white/90">
					Start Saving Today
				</Button>
			</div>
		),
	},

	{
		bgImage: '/fruit-store.jpg',
		customContent: (
			<div className="text-left px-4 md:p-12 w-full text-white">
				<span className="inline-block mb-3 rounded-full bg-eba-primary px-3 py-1 text-xs font-medium">
					Reduce Waste
				</span>

				<h1 className="text-3xl md:text-5xl font-bold mb-4">
					Fresh Finds,
					<br />
					Better Timing
				</h1>

				<p className="mb-6 text-white/90">
					Groceries and essentials carefully selected during their optimal shelf-life
					window — safe, approved, and affordably priced.
				</p>

				<div className="flex gap-3">
					<Button variant="secondary">Browse Offers</Button>
					<Button className="border-white text-white">How It Works</Button>
				</div>
			</div>
		),
	},

	{
		bgImage: '/shopping-together.jpg',
		customContent: (
			<div className="text-center px-4 md:p-12 w-full text-white">
				<span className="inline-block mb-3 rounded-full bg-orange-500/90 px-3 py-1 text-xs font-medium">
					Limited Availability
				</span>

				<h1 className="text-3xl md:text-5xl font-bold mb-4">
					Popular Picks,
					<br />
					Priced Smarter
				</h1>

				<p className="mb-6 text-white/90">
					High-demand products at special prices. Availability changes quickly — shop
					while they’re in stock.
				</p>

				<Button className="border border-white bg-white text-black hover:bg-white/90">
					View Current Offers
				</Button>
			</div>
		),
	},
];

export const signInSlides: Slide[] = [
	{
		bgImage: '/cart.jpg',
		customContent: (
			<div className="text-left px-4 md:p-12 w-full text-white">
				<span className="inline-block mb-3 rounded-full bg-eba-primary px-3 py-1 text-xs font-medium">
					Exclusive Access
				</span>

				<h1 className="text-3xl md:text-5xl font-bold mb-4">
					Welcome Back to
					<br />
					EBA
				</h1>

				<p className="mb-6 text-white/90">
					Welcome back — your smart shopping experience continues here. Fill your cart
					with quality essentials at member-only prices.
				</p>

				<div className="flex items-center space-x-2 text-sm">
					<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
						<path
							fillRule="evenodd"
							d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
							clipRule="evenodd"
						/>
					</svg>
					<span>Quick checkout</span>
					<svg className="w-4 h-4 ml-4" fill="currentColor" viewBox="0 0 20 20">
						<path
							fillRule="evenodd"
							d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
							clipRule="evenodd"
						/>
					</svg>
					<span>Track orders</span>
				</div>
			</div>
		),
	},

	{
		bgImage: '/provisions.jpg',
		customContent: (
			<div className="text-left px-4 md:p-12 w-full text-white">
				<span className="inline-block mb-3 rounded-full bg-eba-primary px-3 py-1 text-xs font-medium">
					Member Benefits
				</span>

				<h1 className="text-3xl md:text-5xl font-bold mb-4">
					Unlock Daily
					<br />
					Flash Deals
				</h1>

				<p className="mb-6 text-white/90">
					Access time-sensitive offers on premium products. Members get first priority on
					limited-quantity items and exclusive discounts up to 70% off retail prices.
				</p>

				<div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 inline-block">
					<p className="text-sm font-medium">
						&quot;Saved $45 on groceries this week!&quot;
					</p>
					<p className="text-xs text-white/70">— Sarah M., Member since 2023</p>
				</div>
			</div>
		),
	},

	{
		bgImage: '/shopping-together.jpg',
		customContent: (
			<div className="text-left px-4 md:p-12 w-full text-white">
				<span className="inline-block mb-3 rounded-full bg-orange-500/90 px-3 py-1 text-xs font-medium">
					Secure & Private
				</span>

				<h1 className="text-3xl md:text-5xl font-bold mb-4">
					Your Data and products are protected
				</h1>

				<p className="mb-6 text-white/90">
					Bank-level encryption and privacy controls keep your information safe. Shop with
					confidence knowing every transaction is secure and your data is never shared.
				</p>

				<div className="flex items-center space-x-4 text-sm">
					<div className="flex items-center">
						<svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
							<path
								fillRule="evenodd"
								d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
								clipRule="evenodd"
							/>
						</svg>
						<span>SSL Secured</span>
					</div>
					<div className="flex items-center">
						<svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
							<path
								fillRule="evenodd"
								d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
								clipRule="evenodd"
							/>
						</svg>
						<span>GDPR Compliant</span>
					</div>
					<div className="flex items-center">
						<svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
							<path
								fillRule="evenodd"
								d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
								clipRule="evenodd"
							/>
						</svg>
						<span>Regulatory body Compliant</span>
					</div>
				</div>
			</div>
		),
	},
];
