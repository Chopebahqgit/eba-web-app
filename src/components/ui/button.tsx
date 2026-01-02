import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { MoreHorizontal } from 'lucide-react';
import { Spinner } from './spinner';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-primary/90',
				destructive:
					'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
				outline:
					'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
				secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
				ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
				link: 'text-primary underline-offset-4 hover:underline',
			},
			size: {
				default: 'h-9 px-4 py-2 has-[>svg]:px-3',
				sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
				lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
				icon: 'size-9',
				'icon-sm': 'size-8',
				'icon-lg': 'size-10',
			},
			disabled: {
				true: 'disabled:cursor-not-allowed disabled:opacity-50',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	label?: string;
	isLoading?: boolean;
	disabled?: boolean;
	loadingText?: string;
	children?: React.ReactNode;
	icon?: React.ElementType;
	iconPosition?: 'start' | 'end';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			label = '',
			className,
			variant,
			size,
			asChild = false,
			isLoading = false,
			disabled = false,
			loadingText = 'Please wait',
			icon,
			iconPosition = 'start',
			children,
			...props
		},
		ref,
	) => {
		const Comp = asChild ? Slot : 'button';
		const Icon = icon;

		const render = () => {
			if (children) return children;

			if (isLoading) {
				return (
					<div className="flex items-center gap-2 animate-pulse">
						<Spinner className="size-4" />
						<div className="flex items-center">
							<span className="capitalize">{loadingText}</span>
							<MoreHorizontal size={20} className="ml-1 animate-pulse" />
						</div>
					</div>
				);
			}

			return (
				<div className="flex items-center gap-2">
					{Icon && iconPosition === 'start' && (
						<Icon
							size={18}
							className="transition-transform group-hover:translate-x-0.5"
						/>
					)}
					<span>{label}</span>
					{Icon && iconPosition === 'end' && (
						<Icon
							size={18}
							className="transition-transform group-hover:translate-x-0.5"
						/>
					)}
				</div>
			);
		};

		return (
			<Comp
				className={cn(buttonVariants({ variant, size, disabled }), className)}
				ref={ref}
				disabled={disabled}
				{...props}
			>
				{render()}
			</Comp>
		);
	},
);

Button.displayName = 'Button';

export { Button, buttonVariants };
