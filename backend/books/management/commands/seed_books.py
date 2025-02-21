from django.core.management.base import BaseCommand
from faker import Faker
from books.models import Book
import random

fake = Faker()

SAMPLE_ISBNS = [
    # Classic Literature
    '9780141439518',  # Pride and Prejudice
    '9780141187761',  # 1984
    '9780743273565',  # The Great Gatsby
    '9780061120084',  # To Kill a Mockingbird
    '9780140283334',  # Lord of the Flies
    '9780141439693',  # Jane Eyre
    '9780141439662',  # Wuthering Heights
    '9780141439600',  # Great Expectations
    
    # Modern Literature
    '9780307277671',  # The Road
    '9780375831003',  # The Book Thief
    '9780316769488',  # The Catcher in the Rye
    '9780679735779',  # American Psycho
    '9780385490818',  # The Handmaid's Tale
    '9780307474278',  # The Da Vinci Code
    '9780316066524',  # The Lovely Bones
    
    # Fantasy
    '9780547928227',  # The Hobbit
    '9780544003415',  # The Lord of the Rings
    '9780553381689',  # A Game of Thrones
    '9780747532743',  # Harry Potter 1
    '9780747538486',  # Harry Potter 2
    '9780439554923',  # Harry Potter 3
    '9780439139601',  # Harry Potter 4
    '9780439358071',  # Harry Potter 5
    '9780439785969',  # Harry Potter 6
    '9780545139700',  # Harry Potter 7
    '9780756404741',  # The Name of the Wind
    '9780316037839',  # The Way of Kings
    
    # Science Fiction
    '9780385472579',  # Brave New World
    '9780553382563',  # Foundation
    '9780441172719',  # Dune
    '9780345391803',  # The Hitchhiker's Guide to the Galaxy
    '9780345538376',  # Ready Player One
    '9780812550702',  # Ender's Game
    
    # Horror/Thriller
    '9780450040184',  # The Shining
    '9780307743657',  # The Stand
    '9780307949486',  # Gone Girl
    '9780316015844',  # Twilight
    '9780679745587',  # Interview with the Vampire
    
    # Mystery
    '9780316693998',  # The Da Vinci Code
    '9780312427561',  # Wolf Hall
    '9780316228534',  # The Cuckoo's Calling
    '9780316074236',  # The Girl with the Dragon Tattoo
    
    # Contemporary Fiction
    '9780375704024',  # The Kite Runner
    '9780679735771',  # American Gods
    '9780385721677',  # Life of Pi
    '9780812984965',  # All the Light We Cannot See
    '9780812995343',  # Cloud Atlas
    
    # Young Adult
    '9780439023481',  # The Hunger Games
    '9780439023498',  # Catching Fire
    '9780439023511',  # Mockingjay
    '9780316015844',  # Twilight
    '9780316160179',  # New Moon
    '9780316027656',  # Eclipse
    
    # Non-Fiction
    '9780143034759',  # Into the Wild
    '9780743270755',  # Team of Rivals
    '9780316017930',  # Outliers
    '9780385523905',  # The Lost City of Z
    '9780307408841',  # Kitchen Confidential
]


def generate_book_description():
    """Generate a realistic book description"""
    templates = [
        f"In this {fake.word()} tale, {fake.sentence()} {fake.sentence()} Through a series of {fake.word()} events, {fake.sentence()}",
        f"Set in {fake.city()} during the {fake.word()} era, this story follows {fake.sentence()} {fake.sentence()}",
        f"A {fake.word()} exploration of {fake.word()} and {fake.word()}, where {fake.sentence()} {fake.sentence()}",
        f"When {fake.sentence()} {fake.sentence()} This {fake.word()} journey reveals {fake.sentence()}",
        f"In the aftermath of {fake.word()}, {fake.sentence()} {fake.sentence()} The story unfolds as {fake.sentence()}"
    ]
    return random.choice(templates)


class Command(BaseCommand):
    help = 'Seeds the database with fake books'

    def handle(self, *args, **kwargs):
        # Create a copy of the ISBN list to shuffle
        available_isbns = SAMPLE_ISBNS.copy()
        random.shuffle(available_isbns)
        
        for isbn in available_isbns:
            try:
                Book.objects.create(
                    title=fake.catch_phrase(),
                    author=fake.name(),
                    description=generate_book_description(),
                    genre=random.choice([choice[0] for choice in Book.GENRE_CHOICES]),
                    is_hardcover=fake.boolean(),
                    rating=round(random.uniform(0, 5), 1),
                    pages=random.randint(100, 1000),
                    views=random.randint(0, 10000),
                    recommendations=random.randint(0, 1000),
                    cover_image_url=f"https://covers.openlibrary.org/b/isbn/{isbn}-L.jpg",
                    isbn=isbn
                )
                self.stdout.write(self.style.SUCCESS(f'Successfully created book with ISBN: {isbn}'))
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'Failed to create book with ISBN {isbn}: {str(e)}'))

        self.stdout.write(self.style.SUCCESS('Finished seeding database'))