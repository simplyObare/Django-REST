from django.db import models


# Create your models here.
class Book(models.Model):
    book_title = models.CharField(max_length=255)
    date_published = models.DateField()

    def __str__(self):
        return self.book_title
