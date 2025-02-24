import { Book } from '@/utils/http';
import React from 'react';
import { Link } from 'react-router-dom';

interface BookCardProps {
    books: Book[]
}

const BookCard: React.FC<BookCardProps> = ({ books }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {books.map((book: Book) => (
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
                        <Link to={`/book-detail/${book.id}`}>
                            <h2 className="text-lg font-semibold line-clamp-2 mb-1 hover:text-blue-600">
                                {book.title}
                            </h2>
                        </Link>
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
    );
};

export default BookCard;