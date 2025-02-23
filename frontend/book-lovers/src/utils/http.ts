import { QueryClient } from "@tanstack/react-query";

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

interface PaginatedResponse<T> {
    links: {
        next: string | null;
        previous: string | null;
    };
    total_pages: number;
    total_items: number;
    current_page: number;
    page_size: number;
    results: T[];
    }

    export async function fetchBooks({
    signal,
    debouncedFilters,
    }: {
    signal: AbortSignal;
    debouncedFilters: string[];
    }): Promise<Book[]> {
    const params = new URLSearchParams();
    debouncedFilters.forEach((filter: string) => {
        params.append("category", filter);
    });

    const response = await fetch(
        `http://127.0.0.1:8000/api/books?page_size=20`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Add any authentication headers if needed
            },
            credentials: 'include', // if you're using sessions/cookies
            signal,
        });
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const data: PaginatedResponse<Book> = await response.json();
    return data.results;
}