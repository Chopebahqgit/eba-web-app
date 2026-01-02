import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const formatCurrency = (amount: number, symbol: string = '₦') => {
	if (amount == null || isNaN(amount)) return `${symbol}0`;
	return `${symbol}${amount.toLocaleString()}`;
};

export function getExpiryCountdown(expiryDate: string, now: number) {
	const expiry = new Date(expiryDate).getTime();
	const diff = Math.max(expiry - now, 0);

	const totalSeconds = Math.floor(diff / 1000);

	return {
		isExpired: diff === 0,
		days: Math.floor(totalSeconds / 86400),
		hours: Math.floor((totalSeconds % 86400) / 3600),
		minutes: Math.floor((totalSeconds % 3600) / 60),
		seconds: totalSeconds % 60,
	};
}

export function safeImageSrc(src?: string | null): string | null {
	if (!src || typeof src !== 'string') return null;
	const trimmed = src.trim();
	return trimmed.length > 0 ? trimmed : null;
}

export function getImageSrcOrFallback(
	src?: string | null,
	fallback: string = '/placeholder.svg',
): string {
	const safe = safeImageSrc(src);
	return safe ?? fallback;
}
