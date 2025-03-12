/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/features/auth/authSlice';

const Login = () => {
    const { register, handleSubmit, reset } = useForm();
    const [loginUser, { isLoading, error }] = useLoginMutation();
    const dispatch = useDispatch();

    const onSubmit = async (data: any) => {
        try {
            const response = await loginUser(data).unwrap();
            console.log('Login successful:', response);
            
            // Store the token in localStorage to persist the user session
            localStorage.setItem('token', response.token);
            
            // Store user data in Redux
            dispatch(setUser({ user: response.data, token: response.token }));
            
            reset();
            alert('Login Successful!');
        } catch (err) {
            console.error('Login failed:', err);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('email', { required: true })} placeholder='Email' type='email' />
                <input {...register('password', { required: true })} placeholder='Password' type='password' />
                <button type='submit' disabled={isLoading}>Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>Login failed</p>}
            
        </div>
    );
};

export default Login;
