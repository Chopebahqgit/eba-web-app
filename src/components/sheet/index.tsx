import { cn } from '@/lib/utils';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription,
	SheetTrigger,
} from '@/components/ui/sheet';

interface ReusableSheetProps {
	trigger?: React.ReactNode;
	children: React.ReactNode;
	title: string;
	className?: string;
	contentClassName?: string;
	description?: string;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}

export function ReusableSheet({
	trigger,
	children,
	title,
	description,
	open,
	className,
	contentClassName,
	onOpenChange,
}: ReusableSheetProps) {
	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetTrigger asChild>{trigger}</SheetTrigger>
			<SheetContent
				side="right"
				className={cn(
					'overflow-y-auto w-full max-w-none rounded-none',
					'sm:max-w-md',
					'h-screen',
					contentClassName,
				)}
			>
				<SheetHeader className={className}>
					<SheetTitle className="text-gray-900 dark:text-gray-100 m-0">
						{title}
					</SheetTitle>
					{description && (
						<SheetDescription className="text-gray-900 dark:text-gray-100">
							{description}
						</SheetDescription>
					)}
				</SheetHeader>
				<div>{children}</div>
			</SheetContent>
		</Sheet>
	);
}
