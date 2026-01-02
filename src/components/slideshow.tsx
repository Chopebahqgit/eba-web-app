'use client';

import { useState, useEffect, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

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
}

export function SlideShow({
	slides,
	interval = 5000,
	transitionDuration = 1000,
	mode = 'fade',
}: SlideShowProps) {
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrent(prev => (prev + 1) % slides.length);
		}, interval);

		return () => clearInterval(timer);
	}, [slides.length, interval]);

	return (
		<div className="relative w-full h-100 md:h-125 overflow-hidden">
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
								className={`absolute inset-0 flex items-center justify-center px-4 md:px-12 transition-all duration-700 ${
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

			<div className="absolute bottom-4 left-6 flex space-x-3 z-10">
				{slides.map((_, i) => (
					<button
						key={i}
						onClick={() => setCurrent(i)}
						className={`h-3 w-3 rounded-full transition-all ${
							i === current ? 'bg-white scale-125' : 'bg-white/40'
						}`}
					/>
				))}
			</div>

			<div className="absolute bottom-4 right-6 flex space-x-2 z-10">
				<Button
					variant="outline"
					size="icon"
					onClick={() => setCurrent(prev => (prev - 1 + slides.length) % slides.length)}
				>
					<ArrowLeft />
				</Button>
				<Button
					variant="outline"
					size="icon"
					onClick={() => setCurrent(prev => (prev + 1) % slides.length)}
				>
					<ArrowRight />
				</Button>
			</div>
		</div>
	);
}
