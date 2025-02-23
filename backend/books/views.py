from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from django.db import transaction
from django.core.exceptions import ValidationError

from books.pagination import CustomPagination
from .models import Book
from .serializers import BookSerializer
from .exceptions import InvalidGenreError  # Our custom exception
# from django.views.decorators import cors_protect

# @cors_protect
@api_view(['GET'])
def book_list(request):
    """
    List all books, with optional filtering by:
    - search (title or author)
    - genre
    - is_hardcover
    """
    
    print("Received request headers:", request.headers)
    print("Received query params:", request.GET)
    try:
        # Get filter parameters from query string
        search_query = request.query_params.get('search', '')
        genres = request.query_params.getlist('genre')
        is_hardcover = request.query_params.get('is_hardcover', None)
        
        # Start with all books
        queryset = Book.objects.all()
        
        # Apply search filter if provided
        if search_query:
            queryset = queryset.filter(
                Q(title__icontains=search_query) |
                Q(author__icontains=search_query)
            )
        
        # Validate and apply genre filters if provided
        if genres:
            # Get list of valid genres from model
            valid_genres = [choice[0] for choice in Book.GENRE_CHOICES]
            
            # Validate each genre before applying filter
            for genre in genres:
                if genre not in valid_genres:
                    raise InvalidGenreError(
                        f"Invalid genre: {genre}. Valid genres are: {', '.join(valid_genres)}"
                    )
            
            # If all genres are valid, apply the filter
            genre_query = Q()
            for genre in genres:
                genre_query |= Q(genre=genre)
            queryset = queryset.filter(genre_query)
        
        # Validate and apply hardcover filter if provided
        if is_hardcover is not None:
            try:
                # Convert string to boolean and validate
                if is_hardcover.lower() not in ['true', 'false']:
                    raise ValidationError("is_hardcover must be 'true' or 'false'")
                
                is_hardcover = is_hardcover.lower() == 'true'
                queryset = queryset.filter(is_hardcover=is_hardcover)
            except AttributeError:
                raise ValidationError("is_hardcover must be a string value 'true' or 'false'")
        
        # Order by most recently created
        queryset = queryset.order_by('-created_at')
        
        # Initialize pagination
        paginator = CustomPagination()
        paginated_queryset = paginator.paginate_queryset(queryset, request)
        
        # Serialize the paginated queryset
        serializer = BookSerializer(paginated_queryset, many=True)
        
        # Return paginated response
        return paginator.get_paginated_response(serializer.data)

    except InvalidGenreError as e:
        # Handle invalid genre error with 400 status
        return Response(
            {'error': {'code': 'invalid_genre', 'message': str(e)}},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    except ValidationError as e:
        # Handle validation errors with 400 status
        return Response(
            {'error': {'code': 'validation_error', 'message': str(e)}},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    except Exception as e:
        # Handle unexpected errors with 500 status
        # In production, you should log this error
        return Response(
            {'error': {'code': 'internal_error', 'message': 'An unexpected error occurred'}},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )



@api_view(['GET'])
def book_detail(request, pk):
    """
    Retrieve a single book by its ID.
    
    This view:
    1. Retrieves the book by primary key
    2. Increments the view counter atomically
    3. Returns the serialized book data
    """
    try:
        # Use select_for_update() to prevent race conditions when updating view count
        with transaction.atomic():
            # Lock the book row for updating
            book = Book.objects.select_for_update().get(pk=pk)
            
            # Increment the view counter
            book.views += 1
            book.save()
            
            # Serialize the book data
            serializer = BookSerializer(book)
            
            # Return the serialized data
            return Response(serializer.data)
            
    except Book.DoesNotExist:
        return Response(
            {
                'error': {
                    'code': 'book_not_found',
                    'message': f'Book with ID {pk} was not found'
                }
            },
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        # Log the error here in production
        return Response(
            {
                'error': {
                    'code': 'internal_error',
                    'message': 'An unexpected error occurred while retrieving the book'
                }
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )