/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '@/redux/features/auth/authApi';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/features/auth/authSlice';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate, useLocation, Location } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import AOS from 'aos';
import { useEffect } from 'react';
import { FiLock, FiMail, FiAlertCircle } from 'react-icons/fi';

export interface ErrorResponse {
  message: string;
  statusCode: number;
}

interface LocationState {
  from?: string;
  message?: string;
}

interface CustomLocation extends Location {
  state: LocationState | null;
}

const Login = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const { register, handleSubmit } = useForm();
  const [loginUser, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation() as CustomLocation;

  const testCredentials = [
    {
      role: 'Admin',
      email: 'tanvir@gmail.com',
      password: '12345678',
      color: 'bg-red-500 hover:bg-red-600'
    },
    {
      role: 'User',
      email: 'user@gmail.com',
      password: '12345678',
      color: 'bg-blue-500 hover:bg-blue-600'
    }
  ];

  const onSubmit = async (data: any) => {
    try {
      const response = await loginUser(data).unwrap();
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.data));
      dispatch(setUser({ user: response.data, token: response.token }));

      Swal.fire({
        title: 'Login Successful!',
        text: `Welcome back, ${response.data.role === 'admin' ? 'Admin' : 'User'}!`,
        icon: 'success',
        confirmButtonText: 'OK',
      });

      const from = location.state?.from || (response.data.role === 'admin' ? '/dashboard' : '/');
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error('Login failed:', err);
      Swal.fire({
        title: 'Login Failed',
        text: err?.data?.message || 'Invalid credentials',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  };

  const handleTestLogin = (email: string, password: string) => {
    const formData = { email, password };
    onSubmit(formData);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <Card
        data-aos="fade-up"
        className="w-full max-w-md bg-white bg-opacity-90 backdrop-blur-sm border-none shadow-xl relative z-10"
      >
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-200 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-300">Sign in to access your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                className=" text-gray-200 text-sm font-medium mb-2 flex items-center"
                htmlFor="email"
              >
                <FiMail className="mr-2" /> Email
              </label>
              <div className="relative">
                <Input
                  {...register('email', { required: true })}
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="w-full  pl-10 pr-3 py-3 border text-gray-200 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <FiMail className="absolute left-3 top-3.5 text-gray-400" />
              </div>
            </div>

            <div>
              <label
                className=" text-gray-200 text-sm font-medium mb-2 flex items-center"
                htmlFor="password"
              >
                <FiLock className="mr-2" /> Password
              </label>
              <div className="relative">
                <Input
                  {...register('password', { required: true })}
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3 py-3 text-gray-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <FiLock className="absolute left-3 top-3.5 text-gray-400" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-200"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-green-600 hover:text-green-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md transition duration-200"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </Button>

            {/* Test Credentials Section */}
            <div className="space-y-2">
              <p className="text-sm text-gray-500 text-center">Test Accounts:</p>
              <div className="grid grid-cols-2 gap-2">
                {testCredentials.map((cred, index) => (
                  <Button
                    key={index}
                    type="button"
                    onClick={() => handleTestLogin(cred.email, cred.password)}
                    className={`${cred.color} text-white py-2 text-sm`}
                  >
                    Login as {cred.role}
                  </Button>
                ))}
              </div>
            </div>

            {error && (
              <div className="flex items-center justify-center text-red-500">
                <FiAlertCircle className="mr-2" />
                Login failed. Please check your credentials.
              </div>
            )}
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-medium text-green-600 hover:text-green-500"
              >
                Register here
              </Link> or <Link className='text-green-500 underline' to="/">Home</Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;