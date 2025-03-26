// export default AllUser;

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { RootState } from '@/redux/store';
import { setUserInfo } from '@/redux/features/auth/authSlice';
import {
  useGetallUserInfoQuery,
  useDeactivateUserMutation,
} from '@/redux/features/auth/authApi';
import { User } from '@/redux/features/auth/authApi';

const AllUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo: User[] =
    useSelector((state: RootState) => state.auth.userInfo) ?? [];
  const { data, error, isLoading } = useGetallUserInfoQuery();
  const [deactivateUser] = useDeactivateUserMutation();

  useEffect(() => {
    if (data?.result && Array.isArray(data.result)) {
      dispatch(setUserInfo(data.result));
    } else {
      dispatch(setUserInfo([]));
    }
  }, [data, dispatch]);

  const handleDeactivate = async (userId: string) => {
    const user = userInfo.find((u) => u._id === userId);
    if (user?.isBlocked) {
      Swal.fire({
        title: 'User already blocked',
        text: 'This user is already deactivated.',
        icon: 'info',
        confirmButtonText: 'OK',
      });
      return;
    }

    try {
      const response = await deactivateUser(userId);

      if (response.data?.status === true) {
        const updatedUser = response.data.result.result;
        dispatch(
          setUserInfo(
            userInfo.map((u) =>
              u._id === userId ? { ...u, isBlocked: updatedUser.isBlocked } : u,
            ),
          ),
        );

        Swal.fire({
          title: 'User Deactivated!',
          text: 'The user has been successfully deactivated.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate('/dashboard/user');
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to deactivate user.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Error deactivating user:', error);
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while deactivating the user.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {[...Array(6)].map((_, index) => (
          <Skeleton key={index} className="h-32 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (error) {
    console.error('Error fetching user info:', error);
    return (
      <p className="text-red-500 text-center">Error fetching user info.</p>
    );
  }

  if (userInfo.length === 0) {
    return <p>No users found.</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-black">
        All Users
      </h2>
      {Array.isArray(userInfo) && userInfo.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userInfo.map((user) => (
            <Card
              key={user._id}
              className="shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <CardHeader className="flex items-center space-x-4">
                <Avatar className="w-14 h-14 bg-gray-200 text-gray-800">
                  <AvatarImage src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?uid=R104361349&ga=GA1.1.1841229347.1715426784&semt=ais_hybrid" />
                </Avatar>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-blue-200">
                  {user.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 dark:text-blue-200">
                <p>
                  <strong>Id:</strong> {user._id}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Role:</strong> {user.role}
                </p>
                <p>
                  <strong>Phone:</strong> {user.phone || 'N/A'}
                </p>
                <p>
                  <strong>Address:</strong> {user.address || 'N/A'}
                </p>
                <p>
                  <strong>City:</strong> {user.city || 'N/A'}
                </p>
                <p>
                  <strong>IsBlocked:</strong>{' '}
                  {user.isBlocked ? 'True' : 'False'}
                </p>
                <p>
                  <strong>CreatedAt:</strong> {user.createdAt || 'N/A'}
                </p>
                <p>
                  <strong>UpdatedAt:</strong> {user.updatedAt || 'N/A'}
                </p>
                <button
                  onClick={() => handleDeactivate(user._id)}
                  className="mt-4 bg-red-500 text-white p-2 rounded"
                >
                  Deactivate
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No users available</p>
      )}
    </div>
  );
};

export default AllUser;
