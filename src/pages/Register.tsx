/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRegisterMutation } from '@/redux/features/auth/authApi';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/features/auth/authSlice';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import AOS from 'aos';

// Zod Schema for Validation
const registrationSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const Registration = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registrationSchema), // Integrate Zod validation
  });

  const [registerUser, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const response = await registerUser(data).unwrap();
      if (response?.data) {
        dispatch(
          setUser({ user: response.data.user, token: response.data.token }),
        );
      }

      reset();
      Swal.fire({
        title: 'Registration Successful!',
        text: 'You have been successfully registered.',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate('/login');
      });
    } catch (err: any) {
      console.error('Registration failed:', err);
      Swal.fire({
        title: 'Registration Failed',
        text: err?.data?.message || 'Something went wrong. Please try again.',
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
          <h2 className="text-2xl font-bold text-blue-600 text-center mb-4">
            Please Register
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                {...register('name')}
                placeholder="Name"
                className="w-full p-2 border rounded-lg"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div>
              <Input
                {...register('email')}
                placeholder="Email"
                type="email"
                className="w-full p-2 border rounded-lg"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div>
              <Input
                {...register('password')}
                placeholder="Password"
                type="password"
                className="w-full p-2 border rounded-lg"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
            >
              {isLoading ? 'Registering...' : 'Register'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Registration;
