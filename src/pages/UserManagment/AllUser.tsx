/* eslint-disable @typescript-eslint/no-explicit-any */

import { useDispatch, useSelector } from 'react-redux';
import { useGetallUserInfoQuery } from '@/redux/features/auth/authApi';
import { setUserInfo } from '@/redux/features/auth/authSlice';
import { RootState } from '@/redux/store';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

import { Skeleton } from '@/components/ui/skeleton';

const AllUser = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const { data, error, isLoading } = useGetallUserInfoQuery();

  console.log('Fetched Data:', data);
  console.log('Redux UserInfo:', userInfo);

  useEffect(() => {
    if (data?.result) {
      dispatch(setUserInfo(data.result));
    }
  }, [data, dispatch]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {[...Array(6)].map((_, index) => (
          <Skeleton key={index} className="h-32 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (error)
    return (
      <p className="text-red-500 text-center">Error fetching user info.</p>
    );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-black">
        All Users
      </h2>
      {userInfo && userInfo.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userInfo.map((user: any, index: number) => (
            <Card
              key={index}
              className="shadow-lg hover:shadow-xl transition-all duration-300 dark:bg-gray-800  text-gray-900 dark:text-black"
            >
              <CardHeader className="flex items-center space-x-4">
                <Avatar className="w-14 h-14 bg-gray-200 text-gray-800">
                  <AvatarImage src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?uid=R104361349&ga=GA1.1.1841229347.1715426784&semt=ais_hybrid" />

                  {/* <p className='text-red-50'>{user.name.charAt(0).toUpperCase()}</p> */}
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
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No user data available</p>
      )}
    </div>
  );
};

export default AllUser;
