import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchBookById } from "@/utils/http";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import { Loader2 } from "lucide-react";

const BookDetail: React.FC = () => {
  // Extract the bookId from URL parameters
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();

  // Fetch the book data using React Query
  const {
    data: book,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["book", bookId],
    queryFn: () => fetchBookById(bookId || ""),
    enabled: !!bookId,
    retry: 2,
  });

  // Navigate back to the book list when closing the sheet
  const handleClose = () => {
    navigate("/");
  };

  return (
    <Sheet open={!!bookId} onOpenChange={handleClose}>
      <SheetContent className="sm:max-w-md md:max-w-lg overflow-y-auto">
        {isLoading && (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <span className="ml-2">Loading book details...</span>
          </div>
        )}

        {isError && (
          <div className="text-red-500 p-4 border border-red-200 rounded-md bg-red-50 mt-4">
            <h3 className="font-bold">Error Loading Book</h3>
            <p>
              {error instanceof Error
                ? error.message
                : "Failed to load book details"}
            </p>
          </div>
        )}

        {book && (
          <div className="space-y-6">
            <SheetHeader>
              <SheetTitle className="text-xl font-bold">
                {book.title}
              </SheetTitle>
              <SheetDescription>by {book.author}</SheetDescription>
            </SheetHeader>

            <div className="flex justify-center mt-4">
              <img
                src={book.cover_image_url}
                alt={`Cover of ${book.title}`}
                className="rounded-md shadow-md h-64 object-contain"
              />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Description</h3>
                <p className="text-gray-700 mt-1">{book.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-50 p-3 rounded-md">
                  <h4 className="font-medium text-gray-900">Genre</h4>
                  <p className="text-gray-700">{book.genre}</p>
                </div>

                <div className="bg-gray-50 p-3 rounded-md">
                  <h4 className="font-medium text-gray-900">Format</h4>
                  <p className="text-gray-700">
                    {book.is_hardcover ? "Hardcover" : "Paperback"}
                  </p>
                </div>

                <div className="bg-gray-50 p-3 rounded-md">
                  <h4 className="font-medium text-gray-900">Rating</h4>
                  <p className="text-gray-700">{book.rating}/5</p>
                </div>

                <div className="bg-gray-50 p-3 rounded-md">
                  <h4 className="font-medium text-gray-900">Pages</h4>
                  <p className="text-gray-700">{book.pages}</p>
                </div>

                <div className="bg-gray-50 p-3 rounded-md">
                  <h4 className="font-medium text-gray-900">ISBN</h4>
                  <p className="text-gray-700">{book.isbn}</p>
                </div>

                <div className="bg-gray-50 p-3 rounded-md">
                  <h4 className="font-medium text-gray-900">Recommendations</h4>
                  <p className="text-gray-700">{book.recommendations}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default BookDetail;
