import { useLogoutMutation } from '@/redux/features/auth/authApi';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Logout = () => {
  const [logoutApi] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap(); // Call the logout API
      dispatch(logout()); // Redux token remove
      localStorage.removeItem('token');

      Swal.fire({
        title: 'Logged Out!',
        text: 'You have been logged out successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate('/login');
      });
    } catch (error) {
      console.error('Logout failed:', error);
      Swal.fire({
        title: 'Logout Failed',
        text: 'Something went wrong. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
<button
  onClick={handleLogout}
  className="bg-red-600 text-white font-medium px-5 py-2 rounded-lg shadow-sm hover:bg-red-700 transition-colors duration-200"
>
  Logout
</button>
  );
};

export default Logout;
