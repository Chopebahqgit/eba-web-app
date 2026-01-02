import { Loader2Icon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SpinnerProps extends React.ComponentProps<'svg'> {
	icon?: React.ComponentType<React.ComponentProps<'svg'>>;
}

function Spinner({ icon: Icon = Loader2Icon, className, ...props }: SpinnerProps) {
	return (
		<Icon
			role="status"
			aria-label="Loading"
			className={cn('size-4 animate-spin', className)}
			{...props}
		/>
	);
}

export { Spinner };
