from rest_framework.views import exception_handler
from rest_framework.response import Response
from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework.exceptions import ValidationError as DRFValidationError
from django.db import IntegrityError
from django.http import Http404

def custom_exception_handler(exc, context):
    """
    Custom exception handler for REST framework that handles additional exceptions.
    """
    # First, get the standard error response from DRF
    response = exception_handler(exc, context)

    # If there's no response, it means DRF didn't handle this exception
    if response is None:
        if isinstance(exc, DjangoValidationError):
            # Handle Django's validation errors
            return Response({
                'error': {
                    'code': 'validation_error',
                    'message': 'Validation error occurred.',
                    'details': exc.message_dict if hasattr(exc, 'message_dict') else str(exc)
                }
            }, status=400)
            
        elif isinstance(exc, Http404):
            # Handle 404 errors
            return Response({
                'error': {
                    'code': 'not_found',
                    'message': 'The requested resource was not found.',
                    'details': str(exc)
                }
            }, status=404)
            
        elif isinstance(exc, IntegrityError):
            # Handle database integrity errors
            return Response({
                'error': {
                    'code': 'integrity_error',
                    'message': 'Database integrity error occurred.',
                    'details': str(exc)
                }
            }, status=409)
            
        # Handle any other unexpected errors
        return Response({
            'error': {
                'code': 'internal_error',
                'message': 'An unexpected error occurred.',
                'details': str(exc)
            }
        }, status=500)

    # If we do have a response, let's format it consistently
    if not isinstance(response.data, dict):
        response.data = {
            'error': {
                'code': 'api_error',
                'message': response.data,
                'details': None
            }
        }
    elif 'detail' in response.data:
        response.data = {
            'error': {
                'code': getattr(exc, 'default_code', 'api_error'),
                'message': response.data['detail'],
                'details': None
            }
        }

    return response