import { RouterProvider } from 'react-router';
import { router } from './routes';
import { BackgroundEffects } from './components/ui/BackgroundEffects';

export default function App() {
  return (
    <>
      <BackgroundEffects />
      <RouterProvider router={router} />
    </>
  );
}