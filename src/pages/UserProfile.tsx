import { useGetUserInfoQuery } from '@/redux/features/auth/authApi'; // Assuming this is the correct import path

const UserProfile = () => {
  // Get user info with the token handled by the baseApi
  const { data, error, isLoading } = useGetUserInfoQuery({});
  console.log(data);
  // Show loading state
  if (isLoading) return <div>Loading...</div>;

  // Handle error in fetching user info
  if (error) {
    console.error('Error fetching user info:', error);
    return <div>Error: {JSON.stringify(error, null, 2)}</div>;
  }

  // Display the user's profile
  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {data?.name}</p>
      <p>Email: {data?.email}</p>
      {/* Add other user info here */}
    </div>
  );
};

export default UserProfile;
