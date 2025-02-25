import { APIError } from '@/utils/error';
import React from 'react';


interface ErrorDisplayProps {
    error: Error | APIError;
    onRetry?: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onRetry }) => {
    // Check if it's the custom API error
    const isAPIError = error instanceof APIError;

    return (
        <div className="flex flex-col items-center justify-center min-h-[200px] p-6 text-center bg-red-50 rounded-lg">
            <div className="text-red-600 font-semibold mb-2">
                {isAPIError ? 'Error from server:' : 'An error occurred:'}
            </div>
            <div className="text-gray-700 mb-4">
                {error.message}
            </div>
            {isAPIError && (
                <div className="text-sm text-gray-500 mb-4">
                    Error code: {(error as APIError).code}
                </div>
            )}
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                    Try Again
                </button>
            )}
        </div>
    );
};