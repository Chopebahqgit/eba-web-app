import { Search, Facebook, Instagram, Twitter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from './ui/button';

export default function NewsLetter() {
	return (
		<footer className="hidden md:block border-t bg-white">
			<div className="mx-auto max-w-6xl px-6 py-5 md:py-10 flex flex-col md:flex-row gap-8 md:items-center md:justify-between">
				<div className="max-w-md">
					<h3 className="text-lg font-semibold">Subscribe to our Newsletter</h3>
					<p className="text-sm text-gray-600 mt-1">
						Get updates on new arrivals, exclusive offers, and smart shopping tips —
						straight to your inbox.
					</p>
				</div>

				<div className="flex flex-col md:flex-row gap-4 w-full md:max-w-md">
					<div className="relative w-full">
						<Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
						<Input
							type="email"
							placeholder="Enter your email address"
							className="pl-9 pr-24"
						/>
						<Button className="absolute right-1 top-1/2 -translate-y-1/2 h-8 pl-4 bg-eba-primary rounded-2xl">
							Subscribe
						</Button>
					</div>

					<div className="flex items-center gap-4 text-gray-600">
						<Facebook className="h-5 w-5 cursor-pointer hover:text-primary" />
						<Instagram className="h-5 w-5 cursor-pointer hover:text-primary" />
						<Twitter className="h-5 w-5 cursor-pointer hover:text-primary" />
					</div>
				</div>
			</div>
		</footer>
	);
}
