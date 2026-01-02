/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';

type Countdown = {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
	isExpired: boolean;
};

export function useExpiryCountdown(expiryDate: string): Countdown {
	const calculateTimeLeft = (): Countdown => {
		const now = new Date().getTime();
		const expiry = new Date(expiryDate).getTime();
		const diff = expiry - now;

		if (diff <= 0) {
			return {
				days: 0,
				hours: 0,
				minutes: 0,
				seconds: 0,
				isExpired: true,
			};
		}

		return {
			days: Math.floor(diff / (1000 * 60 * 60 * 24)),
			hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
			minutes: Math.floor((diff / (1000 * 60)) % 60),
			seconds: Math.floor((diff / 1000) % 60),
			isExpired: false,
		};
	};

	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);

		return () => clearInterval(timer);
	}, [expiryDate]);

	return timeLeft;
}
