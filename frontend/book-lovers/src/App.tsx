import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import RootLayout from './components/RootLayout';
import { BookContextProvider } from './store/books-context';
import BookList from './components/BookList';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/http';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <BookList />,
        },
        {
          path: "/book-detail/:bookId",
          element: <BookList />
        },
      ],
    },
  ]);

  return (
    <BookContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </BookContextProvider>
  );
}

export default App
