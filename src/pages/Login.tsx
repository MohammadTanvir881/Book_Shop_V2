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
// import { verifyToken } from '@/utils/verifytoken';

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

  const onSubmit = async (data: any) => {
    try {
      const response = await loginUser(data).unwrap();

      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.data));

      dispatch(setUser({ user: response.data, token: response.token }));

      Swal.fire({
        title: 'Login Successful!',
        text: 'Welcome back!',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      // Get redirect path or default to home
      const from = location.state?.from || '/';
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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800 p-4">
      <Card
        data-aos="flip-left"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="2000"
        className="w-full max-w-md shadow-lg bg-white rounded-2xl p-6"
      >
        <CardContent>
          <h2 className="text-2xl font-bold text-center mb-4  light:text-black text-blue-600 pb-5   pt-5">
            Please Login First
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              {...register('email', { required: true })}
              placeholder="Email"
              type="email"
              className="w-full p-2 border rounded-lg"
            />
            <Input
              {...register('password', { required: true })}
              placeholder="Password"
              type="password"
              className="w-full p-2 border rounded-lg"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
            >
              {isLoading ? 'Logging In...' : 'Login'}
            </Button>
          </form>
          {error && (
            <p className="text-red-500 text-center mt-2">Login failed</p>
          )}

          <p className="text-center  mt-4 text-sm text-black">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-blue-800 pl-2 hover:text-blue-800"
            >
              Register here
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
