/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import {
	type Control,
	useController,
	type UseControllerProps,
	type FieldValues,
} from 'react-hook-form';
import { EyeIcon, EyeOff, LockKeyhole, Check, X, Clipboard, ClipboardCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InputProps<T extends FieldValues>
	extends
		UseControllerProps<T>,
		Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name' | 'defaultValue'> {
	label?: string;
	asterik?: boolean;
	className?: string;
	control: Control<T>;
	showLeftIcon?: boolean;
	showStrength?: boolean;
	enableCopy?: boolean;
}

export default function PasswordField<T extends FieldValues>(props: InputProps<T>) {
	const {
		field: { onChange, onBlur, value },
		fieldState: { isTouched },
		formState: { errors },
	} = useController(props);

	const {
		name,
		label = '',
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		type = 'password',
		asterik = false,
		showLeftIcon = true,
		showStrength = true,
		enableCopy = false,
		className = '',
		...others
	} = props;

	const [showPassword, setShowPassword] = useState(false);
	const [isCapsLock, setIsCapsLock] = useState(false);
	const [copied, setCopied] = useState(false);

	const togglePassword = () => setShowPassword(prev => !prev);

	const handleCapsLock = (e: React.KeyboardEvent<HTMLInputElement>) => {
		setIsCapsLock(e.getModifierState('CapsLock'));
	};

	const copyPassword = async () => {
		if (!value) return;
		await navigator.clipboard.writeText(value);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const requirements = [
		{ regex: /.{8,}/, text: 'At least 8 characters' },
		{ regex: /[0-9]/, text: 'At least 1 number' },
		{ regex: /[a-z]/, text: 'At least 1 lowercase letter' },
		{ regex: /[A-Z]/, text: 'At least 1 uppercase letter' },
	];

	const strength = requirements.map(req => ({
		...req,
		met: req.regex.test(value || ''),
	}));

	const strengthScore = strength.filter(s => s.met).length;

	const strengthColor = useMemo(() => {
		if (strengthScore === 0) return 'bg-border';
		if (strengthScore <= 1) return 'bg-red-500';
		if (strengthScore === 2) return 'bg-orange-500';
		if (strengthScore === 3) return 'bg-amber-500';
		return 'bg-emerald-500';
	}, [strengthScore]);

	const strengthText = useMemo(() => {
		if (!value) return 'Enter a password';
		if (strengthScore <= 2) return 'Weak password';
		if (strengthScore === 3) return 'Medium password';
		return 'Strong password';
	}, [value, strengthScore]);

	const baseClass = cn(
		`input-control pr-12`,
		{
			'ring-1 ring-red-500 border-none': isTouched && !!errors[name]?.message,
			'pl-10': showLeftIcon,
		},
		className,
	);

	return (
		<>
			{label && (
				<label htmlFor={name} className="input-label">
					{label}
					{asterik && <span className="mr-1.5 text-[#DB1813]">*</span>}
				</label>
			)}

			<div className="relative">
				{showLeftIcon && (
					<span className="absolute inset-y-0 left-0 flex items-center px-2.5">
						<LockKeyhole size={18} className="text-gray-500" />
					</span>
				)}

				<button
					type="button"
					className="absolute inset-y-0 right-0 flex items-center px-2.5"
					onClick={togglePassword}
				>
					{showPassword ? (
						<EyeOff size={20} className="text-gray-500" />
					) : (
						<EyeIcon size={20} className="text-gray-500" />
					)}
				</button>

				<input
					{...others}
					name={name}
					value={value}
					onChange={onChange}
					onBlur={onBlur}
					onKeyUp={handleCapsLock}
					type={showPassword ? 'text' : 'password'}
					className={baseClass}
				/>
			</div>

			{isCapsLock && <p className="text-xs mt-1 text-amber-600">⚠ Caps Lock is ON</p>}

			<ErrorMessage
				errors={errors}
				name={name as any}
				render={({ message }) => <p className="mt-1 text-sm text-red-500">{message}</p>}
			/>
			{enableCopy && (
				<button
					className="mt-2 flex items-center gap-2 text-xs text-blue-600"
					type="button"
					onClick={copyPassword}
				>
					{copied ? <ClipboardCheck size={14} /> : <Clipboard size={14} />}
					{copied ? 'Copied!' : 'Copy password'}
				</button>
			)}

			{showStrength && (
				<div className="mt-3">
					<div className="h-1 w-full rounded-full bg-border overflow-hidden">
						<div
							className={`h-full transition-all duration-500 ${strengthColor}`}
							style={{ width: `${(strengthScore / 4) * 100}%` }}
						/>
					</div>

					<p className="mt-1 text-xs font-medium">{strengthText}. Must contain:</p>

					<ul className="mt-2 space-y-1">
						{strength.map(item => (
							<li key={item.text} className="flex items-center gap-2 text-xs">
								{item.met ? (
									<Check size={14} className="text-emerald-500" />
								) : (
									<X size={14} className="text-gray-400" />
								)}
								<span className={item.met ? 'text-emerald-600' : 'text-gray-500'}>
									{item.text}
								</span>
							</li>
						))}
					</ul>
				</div>
			)}
		</>
	);
}
