import { useGetUserInfoQuery } from '@/redux/features/auth/authApi';
import { Skeleton } from '@/components/ui/skeleton'; // ShadCN Skeleton
import { Alert, AlertTitle } from '@/components/ui/alert'; // ShadCN Alert
import { Card, CardContent } from '@/components/ui/card'; // ShadCN Card

const UserProfile = () => {
  const { data, error, isLoading } = useGetUserInfoQuery({});

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Skeleton className="w-64 h-8 mb-4" />
        <Skeleton className="w-40 h-6" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <p>Failed to fetch user data. Please try again later.</p>
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center mt-12">
      <Card className="p-6 shadow-lg w-96 dark:bg-gray-800">
        <CardContent className="text-center ">
          <h2 className="text-xl font-bold mb-2">My Profile</h2>
          <p className="text-gray-700 dark:text-blue-200">Name: {data?.name}</p>
          <p className="text-gray-700  dark:text-blue-200">Email: {data?.email}</p>
          <p className="text-gray-700  dark:text-blue-200">Phone: {data?.phone}</p>
          <p className="text-gray-700  dark:text-blue-200">Address: {data?.address}</p>
          <p className="text-gray-700  dark:text-blue-200">City: {data?.city}</p>
          <p className="text-gray-700  dark:text-blue-200">CreatedAt: {data?.createdAt}</p>
          <p className="text-gray-700  dark:text-blue-200">UpdatedAt: {data?.updatedAt}</p>
        </CardContent>
      </Card>
    </div>
  ); 
};

export default UserProfile;
