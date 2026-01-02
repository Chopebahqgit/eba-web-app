import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Navigation from '@/components/navbar/navigation';
import TopUtilitySearchBar from '@/components/navbar/utility-bar';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'EBA - Marketplace',
	description: 'Save food, save money, and protect the environment.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<div className="min-h-screen">
					<header className="fixed top-0 z-50 w-full border-b bg-white">
						<TopUtilitySearchBar />
						<Navigation />
					</header>

					<main className="pt-28">{children}</main>
				</div>
			</body>
		</html>
	);
}
