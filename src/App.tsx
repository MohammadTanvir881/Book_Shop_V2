import MainLayout from './components/layout/MainLayout';
import { ThemeProvider } from './components/theme-provider';

// import React, { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { setUser } from './redux/features/auth/authSlice';

function App() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  // Check if token is available in localStorage
  // const token = localStorage.getItem('token');
  // if (token) {
  // Optionally, you can fetch the user data from an API if needed,
  // or use a stored user object if it exists
  // For now, let's just dispatch the token and mock user info:
  // const user = {
  // name: "Hasan Mahadi8", // You should replace this with actual user data if needed
  // email: "hasantajbir8@gmail.com",
  // role: "user"
  // };
  // dispatch(setUser({ user, token }));
  // }
  // }, [dispatch]);

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      {<MainLayout></MainLayout>}
    </ThemeProvider>
  );
}

export default App;
