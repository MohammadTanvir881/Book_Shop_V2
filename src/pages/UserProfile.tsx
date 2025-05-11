import { useGetUserInfoQuery } from '@/redux/features/auth/authApi';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@mui/material';


const UserProfile = () => {
  const { data, error, isLoading } = useGetUserInfoQuery({});

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <Skeleton className="w-64 h-10 rounded-lg" />
        <div className="space-y-3 w-96">
          <Skeleton className="w-full h-6 rounded-md" />
          <Skeleton className="w-full h-6 rounded-md" />
          <Skeleton className="w-full h-6 rounded-md" />
          <Skeleton className="w-full h-6 rounded-md" />
          <Skeleton className="w-full h-6 rounded-md" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen px-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertTitle>Error</AlertTitle>
          <p>Failed to fetch user data. Please try again later.</p>
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-start pt-8 px-4 min-h-screen bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md shadow-lg border-0 dark:border dark:border-gray-700">
        <CardHeader className="bg-green-500 text-white rounded-t-lg p-6">
          <h2 className="text-2xl font-bold text-center">My Profile</h2>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-3">
            <ProfileField label="Name" value={data?.name} />
            <ProfileField label="Email" value={data?.email} />
            <ProfileField label="Phone" value={data?.phone} />
            <ProfileField label="Address" value={data?.address} />
            <ProfileField label="City" value={data?.city} />
            <div className="pt-2">
              <Badge variant="standard" className="text-green-600 border-green-500">
                Member since: {new Date(data?.createdAt).toLocaleDateString()}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ProfileField = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-2 border-gray-100 dark:border-gray-700">
    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</span>
    <span className="font-medium text-gray-800 dark:text-gray-200 break-all">
      {value || '-'}
    </span>
  </div>
);

export default UserProfile;