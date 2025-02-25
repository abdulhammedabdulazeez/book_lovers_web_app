# Book Lovers

A modern web application for book enthusiasts to discover and explore their next favorite read.

## Overview

Book Lovers is a React application that provides a clean and intuitive interface for browsing a collection of books. Users can search for books, filter by genre, view detailed information about specific books, and easily navigate through the collection using pagination.

## Features

- **Book browsing**: View books in a responsive grid layout
- **Search functionality**: Find books by title, author, or keywords
- **Filter by genre**: Narrow down the collection by selecting specific genres
- **Book details**: View comprehensive information about each book in a slide-in panel
- **Pagination**: Navigate through large collections of books
- **Responsive design**: Optimized for both desktop and mobile devices

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS
- **State Management**: Context API, React Query
- **Routing**: React Router v6
- **UI Components**: Shadcn UI
- **API Communication**: Fetch API

## Prerequisites

Before running this application, ensure you have the following installed:

- Node.js (v16 or newer)
- npm or yarn
- API backend running on `http://127.0.0.1:8000`

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd book-lovers
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

4. The application will be available at `http://localhost:3000`

## Backend API

This application requires a backend API running on `http://127.0.0.1:8000`. The API should provide the following endpoints:

- `GET /api/books`: Fetch a list of books with pagination, filtering, and search capabilities
- `GET /api/books/:id`: Fetch details for a specific book by ID

Make sure the backend server is running before starting the application.

## Project Structure

```
book-lovers/
├── public/
├── src/
│   ├── components/
│   │   ├── ui/               # Reusable UI components (shadcn)
│   │   ├── AppSidebar.tsx    # Application sidebar component
│   │   ├── BookDetail.tsx    # Book detail view component
│   │   ├── BookList.tsx      # Book listing component
│   │   ├── ErrorDisplay.tsx  # Error handling component
│   │   ├── Filters.tsx       # Filter components for genre selection
│   │   ├── Header.tsx        # Application header
│   │   ├── MobileMenu.tsx    # Mobile navigation menu
│   │   ├── RootLayout.tsx    # Main application layout
│   │   ├── SearchBar.tsx     # Search functionality component
│   │   └── SkeletonCard.tsx  # Loading skeleton component
│   ├── hooks/
│   │   └── use-mobile.ts     # Mobile detection hook
│   ├── store/
│   │   └── books-context.tsx # Book-related state management
│   ├── utils/
│   │   ├── error.ts          # Error handling utilities
│   │   ├── filters_sorters.ts # Filter configuration
│   │   └── http.ts           # API communication functions
│   ├── App.tsx               # Main application component with routing
│   └── main.tsx              # Application entry point
└── index.html
```

## Application Flow

1. **Initial Load**: The application loads with the book list displaying the first page of books.
2. **Filtering**: Users can select genre filters from the sidebar to narrow down the book selection.
3. **Searching**: The search bar allows users to find specific books by title, author, or content.
4. **Pagination**: Users can navigate through multiple pages of books using the pagination controls.
5. **Book Details**: Clicking a book title opens a slide-in panel with detailed information about the selected book.

## URL Structure

The application uses URL parameters to maintain state and enable shareable links:

- `/`: Main page showing the book list
- `/?page=2`: Book list showing a specific page
- `/?search=fantasy`: Book list filtered by search term
- `/?genre=Fiction&genre=Fantasy`: Book list filtered by selected genres
- `/books/20`: Shows the book with ID 20 in a slide-in panel while keeping the book list visible

## State Management

The application uses multiple approaches for state management:

1. **URL Parameters**: For shareable state (search terms, filters, pagination)
2. **Context API**: For global application state (selected filters)
3. **React Query**: For API data fetching, caching, and state

## Additional Notes

- The sidebar is hidden on mobile devices for better space utilization
- Search is debounced to prevent excessive API calls while typing
- Filters and search terms reset pagination to page 1 to ensure relevant results are shown
- The application uses a responsive grid layout that adapts to different screen sizes

## Troubleshooting

If you encounter issues:

1. Ensure the backend API is running at `http://127.0.0.1:8000`
2. Check browser console for any JavaScript errors
3. Verify that all dependencies are installed correctly
4. Make sure you're using a supported browser (Chrome, Firefox, Safari, Edge)

## Future Enhancements

Planned features for future versions:

- User authentication and personalized recommendations
- Book ratings and reviews
- Reading lists and favorites
- Advanced filtering options (publication date, ratings, etc.)
- Light/dark mode toggle

## License

[Your License Information]

## Contact

[Your Contact Information]