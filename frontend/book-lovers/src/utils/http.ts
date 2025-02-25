import { QueryClient } from "@tanstack/react-query";
import { APIError } from "./error";

export const queryClient = new QueryClient();

export interface Book {
    id: number;
    title: string;
    author: string;
    description: string;
    genre: string;
    is_hardcover: boolean;
    rating: number;
    pages: number;
    views: number;
    recommendations: number;
    created_at: string;
    updated_at: string;
    cover_image_url: string;
    isbn: string;
}

interface BooksResponse {
    books: Book[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        pageSize: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
}
    
interface FetchBooksParams {
    signal: AbortSignal;
    debouncedFilters: string[];
    pageSize?: number;
    page?: number;
    search?: string;
}

export async function fetchBooks({
    signal,
    debouncedFilters,
    pageSize = 20,
    page = 1,
    search,
}: FetchBooksParams): Promise<BooksResponse> {
    const params = new URLSearchParams({
        page_size: pageSize.toString(),
        page: page.toString(),
    });

    // Add filters
    debouncedFilters.forEach((filter: string) => {
        params.append("genre", filter);
    });

    if (search) {
        params.append("search", search);
    }

    const response = await fetch(
        `http://127.0.0.1:8000/api/books?${params.toString()}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            signal,
        }
    );

        const data = await response.json();

    if (!response.ok) {
        if (data.error) {
            throw new APIError(
                data.error.message,
                data.error.code,
                response.status
            );
        }
        throw new Error('An unexpected error occurred');
    }

    // both the books and pagination information
    return {
        books: data.results,
        pagination: {
            currentPage: data.current_page,
            totalPages: data.total_pages,
            totalItems: data.total_items,
            pageSize: data.page_size,
            hasNextPage: data.links.next !== null,
            hasPreviousPage: data.links.previous !== null
        }
    };
}


export async function fetchBookById(id: string): Promise<Book> {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/books/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    );

    const data = await response.json();

    // Handle API error responses
    if (!response.ok) {
      if (data.error) {
        throw new APIError(
          data.error.message,
          data.error.code,
          response.status
        );
      }
      throw new Error(`Failed to fetch book with ID ${id}`);
    }

    // Successfully fetched the book data
    return data as Book;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    
    // Handle network errors or other unexpected issues
    if (error instanceof Error) {
      console.error(`Error fetching book ${id}:`, error.message);
      throw new Error(`Could not load book details: ${error.message}`);
    }
    
    // Fallback for unexpected error types
    throw new Error('An unexpected error occurred while fetching the book');
  }
}