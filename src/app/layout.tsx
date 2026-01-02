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
				<div className="flex flex-col w-full">
					<TopUtilitySearchBar />
					<Navigation />
				</div>
				{children}
			</body>
		</html>
	);
}
