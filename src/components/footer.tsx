'use client';

import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
	return (
		<footer className="hidden md:block bg-primary/80 text-white">
			<div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
				<div className="space-y-3">
					<h2 className="text-2xl font-bold">EBA</h2>
					<p className="text-gray-400 text-sm">
						Smart shopping made simple. Get quality products and enjoy unbeatable deals
						every day.
					</p>
					<div className="flex space-x-3 mt-2">
						<a href="#" aria-label="Facebook">
							<Facebook className="h-5 w-5 hover:text-eba-primary transition-colors" />
						</a>
						<a href="#" aria-label="Instagram">
							<Instagram className="h-5 w-5 hover:text-eba-primary transition-colors" />
						</a>
						<a href="#" aria-label="Twitter">
							<Twitter className="h-5 w-5 hover:text-eba-primary transition-colors" />
						</a>
						<a href="#" aria-label="LinkedIn">
							<Linkedin className="h-5 w-5 hover:text-eba-primary transition-colors" />
						</a>
					</div>
				</div>

				<div className="space-y-2">
					<h3 className="font-semibold text-lg">Shop</h3>
					<ul className="space-y-1 text-gray-400 text-sm">
						<li>
							<Link href="/products" className="hover:text-white transition-colors">
								All Products
							</Link>
						</li>
						<li>
							<Link href="/categories" className="hover:text-white transition-colors">
								Categories
							</Link>
						</li>
						<li>
							<Link href="/deals" className="hover:text-white transition-colors">
								Deals
							</Link>
						</li>
						<li>
							<Link href="/new" className="hover:text-white transition-colors">
								New Arrivals
							</Link>
						</li>
					</ul>
				</div>

				<div className="space-y-2">
					<h3 className="font-semibold text-lg">Support</h3>
					<ul className="space-y-1 text-gray-400 text-sm">
						<li>
							<Link href="/help" className="hover:text-white transition-colors">
								Help Center
							</Link>
						</li>
						<li>
							<Link href="/contact" className="hover:text-white transition-colors">
								Contact Us
							</Link>
						</li>
						<li>
							<Link href="/shipping" className="hover:text-white transition-colors">
								Shipping
							</Link>
						</li>
						<li>
							<Link href="/returns" className="hover:text-white transition-colors">
								Returns
							</Link>
						</li>
					</ul>
				</div>

				<div className="space-y-2">
					<h3 className="font-semibold text-lg">Legal</h3>
					<ul className="space-y-1 text-gray-400 text-sm">
						<li>
							<Link href="/privacy" className="hover:text-white transition-colors">
								Privacy Policy
							</Link>
						</li>
						<li>
							<Link href="/terms" className="hover:text-white transition-colors">
								Terms of Service
							</Link>
						</li>
						<li>
							<Link href="/cookies" className="hover:text-white transition-colors">
								Cookie Policy
							</Link>
						</li>
					</ul>
				</div>
			</div>

			<div className="border-t border-gray-800 mt-8">
				<div className="max-w-6xl mx-auto px-6 py-4 text-center text-gray-500 text-sm">
					&copy; {new Date().getFullYear()} EBA. All rights reserved.
				</div>
			</div>
		</footer>
	);
}

// TODO: Change the deprecated social icons and use the one on simpleicons.org
