/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { RootState } from '@/redux/store';
import { setUserInfo } from '@/redux/features/auth/authSlice';
import {
  useGetallUserInfoQuery,
  useDeactivateUserMutation,
} from '@/redux/features/auth/authApi';
import { User } from '@/redux/features/auth/authApi';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

const AllUser = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const userInfo: User[] = useSelector((state: RootState) => state.auth.userInfo) ?? [];
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
    if (user?.isBlocked) return;

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
      <div className="p-6 space-y-4">
        <Skeleton className="h-10 w-full" />
        {[...Array(5)].map((_, index) => (
          <Skeleton key={index} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    console.error('Error fetching user info:', error);
    return (
      <div className="p-6 text-center text-red-500">
        Error fetching user info.
      </div>
    );
  }

  if (userInfo.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        No users found.
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        User Management
      </h2>
      
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
            {userInfo.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg" />
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {user.phone || 'N/A'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.role === 'admin' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.isBlocked
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  }`}>
                    {user.isBlocked ? 'Deactivated' : 'Active'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Button
                    onClick={() => handleDeactivate(user._id)}
                    disabled={user.isBlocked}
                    variant={user.isBlocked ? "secondary" : "destructive"}
                    size="sm"
                  >
                    {user.isBlocked ? 'Deactivated' : 'Deactivate'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUser;