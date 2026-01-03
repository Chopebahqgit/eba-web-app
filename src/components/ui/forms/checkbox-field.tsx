/* eslint-disable @typescript-eslint/no-explicit-any */

import { ErrorMessage } from '@hookform/error-message';
import { useController, type UseControllerProps, type Control } from 'react-hook-form';
import { cn } from '@/lib/utils';

interface InputProps extends UseControllerProps {
	label?: string;
	control: Control<any>;
	className?: string;
}

export default function CheckboxField(props: InputProps) {
	const {
		field: { onChange, onBlur, value },
		fieldState: { isTouched },
		formState: { errors },
	} = useController(props);

	const { name, label = '', className = '', ...others } = props;

	const baseClass = cn('accent-green-700', className, {
		'ring-1 ring-red-500 border-none focus:ring-1 focus:ring-red-500':
			isTouched && !!errors[name]?.message,
		'ring-1 ring-red-600 border-none focus:ring-1 focus:ring-red-500': !!errors[name]?.message,
	});

	return (
		<>
			<div className="flex items-center gap-1">
				<input
					name={name}
					type="checkbox"
					checked={value}
					onChange={e => onChange(e.target.checked)}
					onBlur={onBlur}
					className={baseClass}
					{...others}
				/>
				{label && (
					<label htmlFor={name} className="input-label mt-1">
						{label}
					</label>
				)}
			</div>
			<ErrorMessage
				errors={errors}
				name={name}
				render={({ message }) => <p className="mt-1 text-sm text-red-500">{message}</p>}
			/>
		</>
	);
}
