'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { MapPin } from 'lucide-react';

export default function PublicNavBar() {
	const router = useRouter();
	return (
		<div className="w-full border bg-gray-50">
			<div className="mx-auto flex h-14 items-center justify-between gap-4 px-4 md:px-3">
				<div className="flex items-center gap-3">
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
					<div className="hidden md:flex items-center gap-1">
						<MapPin className="h-4 w-4 text-eba-secondary" />
						<span className="text-xs text-eba-secondary">
							Chikakore, kubwa, abija FCT Nigeria
						</span>
					</div>
				</div>

				<div className="flex items-end gap-2 text-sm px-1 ">
					<Button
						label="Sign in"
						className="bg-green-100 p-2 text-eba-primary hover:bg-eba-primary hover:text-white cursor-pointer"
						onClick={() => router.push('/login')}
					/>
					<Button
						label="Register"
						className="bg-eba-primary p-2 hover:bg-green-100 hover:text-eba-primary cursor-pointer"
						onClick={() => router.push('/register')}
					/>
				</div>
			</div>
		</div>
	);
}
