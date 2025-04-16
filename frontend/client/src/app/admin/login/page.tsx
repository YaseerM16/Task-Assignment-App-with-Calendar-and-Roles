'use client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = (data: { email: string; password: string }) => {
        console.log("data :", data);
        if (
            data.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL &&
            data.password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
        ) {

            // In a real app, you'd set a session/token here
            router.push('/admin/dashboard');
        } else {
            setError('root', {
                type: 'manual',
                message: 'Invalid credentials',
            });
        }
    };

    // Custom validation functions
    const validateEmail = (value: string) => {
        if (!value.includes('@') || !value.includes('.')) {
            return 'Please enter a valid email address';
        }
        return true;
    };

    const validatePassword = (value: string) => {
        if (value.length < 8) {
            return 'Password must be at least 8 characters';
        }
        return true;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-900">Admin Portal</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                    {errors.root && (
                        <p className="text-red-500 text-sm text-center">{errors.root.message}</p>
                    )}

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            {...register('email', {
                                required: 'Email is required',
                                validate: validateEmail
                            })}
                            type="email"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            {...register('password', {
                                required: 'Password is required',
                                validate: validatePassword
                            })}
                            type="password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    );
}