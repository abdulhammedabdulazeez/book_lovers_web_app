from rest_framework.exceptions import APIException
from rest_framework import status

class BookNotFoundError(APIException):
    status_code = status.HTTP_404_NOT_FOUND
    default_detail = 'The requested book was not found.'
    default_code = 'book_not_found'

class InvalidGenreError(APIException):
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = 'Invalid genre provided.'
    default_code = 'invalid_genre'

class InvalidISBNError(APIException):
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = 'Invalid ISBN format.'
    default_code = 'invalid_isbn'

class DuplicateISBNError(APIException):
    status_code = status.HTTP_409_CONFLICT
    default_detail = 'A book with this ISBN already exists.'
    default_code = 'duplicate_isbn'