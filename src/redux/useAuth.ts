import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export const useAuth = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return {
    isAuthenticated: !!user,
    user,
  };
};
