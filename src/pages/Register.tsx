/* eslint-disable @typescript-eslint/no-explicit-any */

import { useForm } from 'react-hook-form';
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/features/auth/authSlice';

const Registration = () => {
    const { register, handleSubmit, reset } = useForm();
    const [registerUser, { isLoading, error }] = useRegisterMutation();
    const dispatch = useDispatch();

    const onSubmit = async (data:any) => {
        try {
            const response = await registerUser(data).unwrap();
            dispatch(setUser({ user: response.data, token: response.data.token }));
            reset();
            alert('Registration Successful!');
        } catch (err) {
            console.error('Registration failed:', err);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('name', { required: true })} placeholder='Name' />
                <input {...register('email', { required: true })} placeholder='Email' type='email' />
                <input {...register('password', { required: true })} placeholder='Password' type='password' />
                <button type='submit' disabled={isLoading}>Register</button>
            </form>
            {error && <p style={{ color: 'red' }}>Registration failed</p>}
        </div>
    );
};

export default Registration;