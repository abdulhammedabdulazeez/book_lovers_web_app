from django.db import models


class Book(models.Model):
    GENRE_CHOICES = [
        ('Fiction', 'Fiction'),
        ('Non-Fiction', 'Non-Fiction'),
        ('Science Fiction', 'Science Fiction'),
        ('Fantasy', 'Fantasy'),
        ('Mystery', 'Mystery'),
        ('Biography', 'Biography'),
        ('History', 'History'),
        ('Romance', 'Romance'),
        ('Horror', 'Horror'),
    ]

    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    description = models.TextField()
    genre = models.CharField(max_length=20, choices=GENRE_CHOICES)
    is_hardcover = models.BooleanField(default=False)
    rating = models.DecimalField(max_digits=2, decimal_places=1, default=0.0)
    pages = models.PositiveIntegerField()
    views = models.PositiveIntegerField(default=0)
    recommendations = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    cover_image_url = models.URLField(max_length=500, blank=True, null=True)
    isbn = models.CharField(max_length=13, unique=True)

    def __str__(self):
        return self.title