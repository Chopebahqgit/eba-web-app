import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Provider from '@/providers';
import './globals.css';
import SwitchNavBar from '@/components/layouts/switch-nav-layout';

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<Provider>
					<SwitchNavBar>
						<main id="main-content" className="flex-1">
							{children}
						</main>
					</SwitchNavBar>
				</Provider>
			</body>
		</html>
	);
}
