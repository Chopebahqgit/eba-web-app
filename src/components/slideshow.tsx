'use client';

import { useState, useEffect, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export type Slide = {
	bgImage?: string;
	bgColor?: string;
	customContent?: ReactNode;
};

type TransitionMode = 'slide' | 'fade';

interface SlideShowProps {
	slides: Slide[];
	interval?: number;
	transitionDuration?: number;
	mode?: TransitionMode;
	className?: string;
}

export function SlideShow({
	slides,
	interval = 5000,
	transitionDuration = 1000,
	mode = 'fade',
	className,
}: SlideShowProps) {
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrent(prev => (prev + 1) % slides.length);
		}, interval);

		return () => clearInterval(timer);
	}, [slides.length, interval]);

	return (
		<div className={cn('relative w-full h-full overflow-hidden', className)}>
			{/* <div className={cn('relative w-full h-100 md:h-125 overflow-hidden', className)}> */}
			{slides.map((slide, i) => {
				const isActive = i === current;

				const slideStyle =
					mode === 'slide'
						? {
								transform: `translateX(${(i - current) * 100}%)`,
								transition: `transform ${transitionDuration}ms ease-in-out`,
							}
						: {
								opacity: isActive ? 1 : 0,
								transition: `opacity ${transitionDuration}ms ease-in-out`,
							};

				return (
					<div
						key={i}
						className="absolute inset-0 flex items-center justify-center"
						style={{
							...slideStyle,
							backgroundImage: slide.bgImage ? `url(${slide.bgImage})` : undefined,
							backgroundColor: slide.bgColor,
							backgroundSize: 'cover',
							backgroundPosition: 'center',
						}}
					>
						<div
							className={`absolute inset-0 transition-opacity duration-700 ${
								isActive ? 'opacity-100' : 'opacity-0'
							}`}
							style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
						/>

						{slide.customContent && (
							<div
								className={`absolute inset-0 flex items-center justify-center  md:px-12 transition-all duration-700 ${
									isActive
										? 'opacity-100 translate-y-0'
										: 'opacity-0 translate-y-6'
								}`}
							>
								{slide.customContent}
							</div>
						)}
					</div>
				);
			})}

			<div
				className="absolute bottom-2 md:bottom-4 left-3 md:left-6 flex space-x-1 z-10"
				role="group"
				aria-label="Slide navigation"
			>
				{slides.map((_, i) => (
					<button
						key={i}
						onClick={() => setCurrent(i)}
						aria-label={`Go to slide ${i + 1}`}
						aria-current={i === current ? 'true' : undefined}
						className="flex items-center justify-center h-8 w-5 md:h-11 md:w-8"
					>
						<span
							className={`block rounded-full transition-all ${
								i === current ? 'h-3 w-3 bg-white scale-125' : 'h-2 w-2 bg-white/40'
							}`}
						/>
					</button>
				))}
			</div>

			<div className="absolute bottom-4 right-6 flex space-x-2 z-10">
				<Button
					variant="outline"
					size="icon"
					onClick={() => setCurrent(prev => (prev - 1 + slides.length) % slides.length)}
					aria-label="Goto previous banner"
				>
					<ArrowLeft />
				</Button>
				<Button
					variant="outline"
					size="icon"
					onClick={() => setCurrent(prev => (prev + 1) % slides.length)}
					aria-label="Goto next banner"
				>
					<ArrowRight />
				</Button>
			</div>
		</div>
	);
}
