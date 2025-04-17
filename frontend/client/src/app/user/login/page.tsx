'use client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import Spinner from '@/components/Spinner';
import { useAppDispatch } from '@/store/hooks';
import { setUser } from '@/store/slices/UserSlice';
import { LoginUser } from '@/utils/user.types';
import { loginApi } from '@/service/userApi';

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginUser>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const router = useRouter();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(false);

    const onSubmit = async (data: LoginUser) => {
        try {
            console.log("Login Credentials:::", data);

            setLoading(true);
            const response = await loginApi(data);
            if (response?.status === 200) {
                const { data } = response;
                console.log("Dueng User (backend): ", data);
                dispatch(setUser(data));
                localStorage.setItem("user", JSON.stringify(data));
                setLoading(false);

                const roleRedirectMap: Record<string, string> = {
                    employee: '/employee/dashboard',
                    manager: '/manager/dashboard',
                    supermanager: '/super-manager/dashboard',
                };

                const redirectPath = roleRedirectMap[data.role] || '/dashboard';

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Welcome!',
                    text: 'Login successful :)',
                    showConfirmButton: false,
                    timer: 2000,
                    toast: true,
                }).then(() => {
                    router.replace(redirectPath);
                });
            }
        } catch (error) {
            // console.error("Login Error:", error);
            setLoading(false);
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Login Failed!',
                text: (error as Error)?.message || 'Please try again.',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                toast: true,
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-indigo-600 p-6 text-white">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <LogIn className="w-6 h-6" />
                        Employee Login
                    </h2>
                    <p className="text-indigo-100 mt-1">Access your account securely</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                    {/* Email */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            Email Address
                        </label>
                        <div className="relative">
                            <input
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'Invalid email format'
                                    }
                                })}
                                type="email"
                                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 ${errors.email ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="john@example.com"
                            />
                            <Mail className="absolute left-3 top-2.5 text-gray-500" />
                        </div>
                        {errors.email && (
                            <p className="text-sm text-red-600 flex items-start gap-1 mt-1">
                                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                            <Lock className="w-4 h-4" />
                            Password
                        </label>
                        <div className="relative">
                            <input
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 8,
                                        message: 'Minimum 8 characters'
                                    }
                                })}
                                type="password"
                                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="••••••••"
                            />
                            <Lock className="absolute left-3 top-2.5 text-gray-500" />
                        </div>
                        {errors.password && (
                            <p className="text-sm text-red-600 flex items-start gap-1 mt-1">
                                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {loading ? (
                        <Spinner />
                    ) : (
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition duration-200 flex items-center justify-center gap-2 mt-2"
                        >
                            <LogIn className="w-5 h-5" />
                            Log In
                        </button>
                    )}
                </form>

                <div className="px-6 py-4 bg-gray-50 text-center border-t">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <a href="/user/register" className="text-indigo-600 hover:underline font-medium">
                            Register
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
