import { BookContext } from "@/store/books-context";
import { Book, fetchBooks } from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { useDebounce } from "use-debounce";
import { ErrorDisplay } from "./ErroDisplay";
import { SkeletonCard } from "./SkeletonCard";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";

const BookList: React.FC = () => {
    const { selectedFilters } = useContext(BookContext);
    const [debouncedFilters] = useDebounce(selectedFilters, 300);
    const [page, setPage] = useState(1)

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        refetch();
    };

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["books", debouncedFilters],
        queryFn: ({ signal }) => fetchBooks({ signal, debouncedFilters, page }),
    });

    if (isLoading) {
        return (
        <div className="flex item-center justify-center">
            <SkeletonCard />
        </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <ErrorDisplay 
                    error={error as Error} 
                    onRetry={() => refetch()}
                />
            </div>
        );
    }

    if (!data || data.books.length === 0) {
        return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="text-lg">No books found</div>
        </div>
        );
    }

    return (
        <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {data.books.map((book: Book) => (
            <div
                key={book.id}
                className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
                <div className="relative pb-[133%]">
                    <img
                        src={book.cover_image_url}
                        alt={book.title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>
                    <div className="p-4 flex flex-col flex-grow">
                    <h2 className="text-lg font-semibold line-clamp-2 mb-1">
                        {book.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-1">{book.author}</p>
                    <p className="text-gray-500 text-sm mb-1">{book.genre}</p>
                    <div className="mt-auto">
                        <p className="text-gray-500 text-sm">Rating: {book.rating}/5</p>
                        <p className="text-gray-500 text-sm">Pages: {book.pages}</p>
                    </div>
                </div>
            </div>
            ))}
            </div>
            

            <div className="mt-8 flex justify-center">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious 
                                onClick={() => handlePageChange(page - 1)}
                                className={page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>
                        
                        <PaginationItem>
                            <PaginationLink isActive className="px-6">
                                {page} of {data.pagination.totalPages}
                            </PaginationLink>
                        </PaginationItem>

                        <PaginationItem>
                            <PaginationNext 
                                onClick={() => handlePageChange(page + 1)}
                                className={page >= data.pagination.totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </section>
    );
};

export default BookList;
