'use client';

import React, { memo } from 'react';
import { useExpiryCountdown } from '@/hooks/useExpiryCountdown';

interface TimeUnitProps {
	value: number | string;
	label: string;
	isLowTime?: boolean;
	isExpired?: boolean;
}

export const ProductExpiredOverlay = memo(({ expiryDate }: { expiryDate: string }) => {
	const { isExpired } = useExpiryCountdown(expiryDate);
	if (!isExpired) return null;

	return (
		<div className="absolute inset-0 z-20 bg-black/80 flex items-center justify-center pointer-events-none">
			<span className="text-white font-bold text-sm bg-red-700 px-2 py-1 rounded">
				Expired
			</span>
		</div>
	);
});
ProductExpiredOverlay.displayName = 'ProductExpiredOverlay';

export const ProductExpiryCountdown = memo(({ expiryDate }: { expiryDate: string }) => {
	const { days, hours, minutes, seconds, isExpired } = useExpiryCountdown(expiryDate);

	const d = isExpired ? 0 : days;
	const h = isExpired ? 0 : hours;
	const m = isExpired ? 0 : minutes;
	const s = isExpired ? 0 : seconds;

	const isLowTime = !isExpired && days <= 3;
	const labelClass = isExpired ? 'text-red-600 dark:text-red-400' : 'text-muted-foreground';

	return (
		<div className="px-2 space-y-2">
			<p className={`text-xs mt-2 ${labelClass}`}>Expiry Duration</p>
			<div className="flex">
				<TimeUnit
					value={isExpired ? '00' : d}
					label="Days"
					isLowTime={isLowTime}
					isExpired={isExpired}
				/>
				<TimeUnit
					value={isExpired ? '00' : h.toString().padStart(2, '0')}
					label="Hours"
					isLowTime={isLowTime && d === 0}
					isExpired={isExpired}
				/>
				<TimeUnit
					value={isExpired ? '00' : m.toString().padStart(2, '0')}
					label="Min"
					isLowTime={isLowTime && d === 0}
					isExpired={isExpired}
				/>
				<TimeUnit
					value={isExpired ? '00' : s.toString().padStart(2, '0')}
					label="Sec"
					isLowTime={isLowTime}
					isExpired={isExpired}
				/>
			</div>
		</div>
	);
});
ProductExpiryCountdown.displayName = 'ProductExpiryCountdown';

export const TimeUnit: React.FC<TimeUnitProps> = ({
	value,
	label,
	isLowTime = false,
	isExpired = false,
}) => {
	const valueClass = isExpired
		? 'text-red-600 dark:text-red-400'
		: isLowTime
			? 'text-red-600 dark:text-red-400'
			: '';

	const labelTextClass = isExpired ? 'text-red-600 dark:text-red-400' : 'text-muted-foreground';

	return (
		<div className="flex flex-col items-left">
			<div className="w-10 h-6 flex items-left justify-left">
				<span className={`font-mono text-lg font-bold tabular-nums ${valueClass}`}>
					{value}
				</span>
			</div>
			<span className={`text-xs ${labelTextClass}`}>{label}</span>
		</div>
	);
};
