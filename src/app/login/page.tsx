'use client';

import { Button } from '@/components/ui/button';
import { CardTitle, CardHeader, CardContent } from '@/components/ui/card';
import { TextField, PasswordField } from '@/components/ui/forms';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginInputs, LoginSchema } from '@/validations/login-validations';
import Link from 'next/link';
import { SlideShow } from '@/components/slideshow';
import { signInSlides } from '@/data';
import NewsLetter from '@/components/newsletter';
import Footer from '@/components/footer';
import { useRouter } from 'next/navigation';

const defaultValues = {
	email: '',
	password: '',
};

export default function Login() {
	const { control, handleSubmit } = useForm<LoginInputs>({
		resolver: zodResolver(LoginSchema),
		defaultValues,
	});
	const router = useRouter();

	const processForm: SubmitHandler<LoginInputs> = async data => {
		console.log(data);
		router.push('/');
	};

	return (
		<>
			{' '}
			<div className="flex flex-col min-h-screen">
				<div className="flex-1 flex flex-col lg:flex-row">
					<div className="hidden lg:block lg:w-1/2">
						<SlideShow slides={signInSlides} className="h-full" />
					</div>

					<div className="flex-1 flex flex-col md:mt-8">
						<div className="flex-1 flex items-center justify-center bg-gray-50 p-4">
							<div className="w-full max-w-md border bg-white rounded-md space-y-5">
								<CardHeader className="text-center pt-6">
									<CardTitle className="text-xl md:text-2xl font-bold">
										Sign In
									</CardTitle>
									<p className="text-sm text-gray-600">
										Access your account and continue shopping smarter
									</p>
								</CardHeader>

								<CardContent className="md:px-8 pb-8">
									<form
										onSubmit={handleSubmit(processForm)}
										className="space-y-4"
									>
										<TextField
											label="Email"
											id="email"
											name="email"
											type="email"
											placeholder="Enter your email"
											control={control}
											asterik
										/>

										<PasswordField
											label="Password"
											name="password"
											control={control}
											placeholder="••••••••"
											showLeftIcon
											showStrength={false}
											asterik
										/>

										<div className="text-end text-sm text-gray-600">
											<Link
												href="/forgot-password"
												className="font-medium hover:underline"
											>
												Forgot password?
											</Link>
										</div>

										<div className="flex justify-center pt-2">
											<Button
												type="submit"
												label="Sign In"
												className="p-5 bg-eba-primary rounded-3xl hover:bg-deep-green hover:text-white w-2/3"
											/>
										</div>
									</form>
								</CardContent>
							</div>
						</div>
					</div>
				</div>
				<div className="hidden lg:block lg:sticky lg:bottom-0">
					<NewsLetter />
				</div>
			</div>
			<Footer />
		</>
	);
}
