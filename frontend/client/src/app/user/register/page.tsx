'use client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Check, AlertCircle, Phone } from 'lucide-react';
import { signupApi } from '@/service/userApi';
import { RegisterUser } from '@/utils/user.types';
import Swal from 'sweetalert2';
import { useAppDispatch } from '@/store/hooks';
import { setUser } from '@/store/slices/UserSlice';
import { useState } from 'react';
import Spinner from '@/components/Spinner';

export default function EmployeeRegistrationForm() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<RegisterUser>({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    });

    const onSubmit = async (data: RegisterUser) => {
        try {
            setLoading(true)
            const response = await signupApi(data)
            if (response?.status === 201) {
                const { data } = response
                console.log("User register Data (Backend):", data);
                // dispatch(setUser(data))
                // localStorage.setItem("user", data)
                setLoading(false)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Success!",
                    text: "Registered successfully ..! Login with your Credentials",
                    showConfirmButton: false,
                    timer: 3000,
                    toast: true,
                }).then(() => {
                    router.replace("/user/login");
                });
            }
        } catch (error) {
            console.log("Error of Api (backend):", error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Error!",
                text: (error as Error)?.message || "Something went wrong. Please try again.",
                showConfirmButton: true,
                confirmButtonText: "OK",
                toast: true,
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-indigo-600 p-6 text-white">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <User className="w-6 h-6" />
                        Employee Registration
                    </h2>
                    <p className="text-indigo-100 mt-1">Join our team management system</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                            <User className="w-4 h-4" />
                            Full Name
                        </label>
                        <div className="relative">
                            <input
                                {...register('username', {
                                    required: 'Name is required',
                                    minLength: {
                                        value: 3,
                                        message: 'Minimum 3 characters'
                                    }
                                })}
                                type="text"
                                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 ${errors.username ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="John Doe"
                            />
                            <User className="absolute left-3 top-2.5 text-gray-500" />
                        </div>
                        {errors.username && (
                            <p className="text-sm text-red-600 flex items-start gap-1 mt-1">
                                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                {errors.username.message}
                            </p>
                        )}
                    </div>

                    {/* Email Field */}
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
                    {/* Phone */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            Mobile Number
                        </label>
                        <div className="relative">
                            <input
                                {...register('phone', {
                                    required: 'Mobile number is required',
                                    pattern: {
                                        value: /^\d{10}$/,
                                        message: 'Invalid phone number (10 digits required)'
                                    }
                                })}
                                type="tel"
                                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 ${errors.phone ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="8998467859"
                            />
                            <Phone className="absolute left-3 top-2.5 text-gray-500" />
                        </div>
                        {errors.phone && (
                            <p className="text-sm text-red-600 flex items-start gap-1 mt-1">
                                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                {errors.phone.message}
                            </p>
                        )}
                    </div>
                    {/* Role Field - Non-editable */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                            <User className="w-4 h-4" />
                            Role
                        </label>
                        <div className="relative">
                            <input
                                {...register('role')}
                                type="text"
                                value="employee"
                                readOnly
                                className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-100 text-gray-600 border-gray-300 cursor-not-allowed"
                                placeholder="Role"
                            />
                            <Lock className="absolute left-3 top-2.5 text-gray-500" />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            Your role is automatically assigned as Employee
                        </p>
                    </div>


                    {/* Password Field */}
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
                                    },
                                    validate: {
                                        noSpaces: (value) =>
                                            /^\S+$/.test(value) || 'Password cannot contain spaces',
                                        strongPattern: (value) =>
                                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/.test(value) ||
                                            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
                                    }
                                })}
                                type="password"
                                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 ${errors.password ? 'border-red-500' : 'border-gray-300'
                                    }`}
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

                    {/* Confirm Password Field */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                            <Check className="w-4 h-4" />
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                {...register('confirmPassword', {
                                    required: 'Please confirm password',
                                    validate: (value) =>
                                        value === watch('password') || 'Passwords do not match'
                                })}
                                type="password"
                                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="••••••••"
                            />
                            <Check className="absolute left-3 top-2.5 text-gray-500" />
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-sm text-red-600 flex items-start gap-1 mt-1">
                                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>
                    {loading ? <Spinner /> : <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition duration-200 flex items-center justify-center gap-2 mt-2"
                    >
                        <User className="w-5 h-5" />
                        Register Now
                    </button>}

                </form>

                <div className="px-6 py-4 bg-gray-50 text-center border-t">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <a href="/user/login" className="text-indigo-600 hover:underline font-medium">
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}