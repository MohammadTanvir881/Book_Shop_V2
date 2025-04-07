import MainLayout from './components/layout/MainLayout';
import { ThemeProvider } from './components/theme-provider';


function App() {

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      {<MainLayout></MainLayout>}
    </ThemeProvider>
  );
}

export default App;
