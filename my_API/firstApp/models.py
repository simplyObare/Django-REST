from django.db import models


# Create your models here.
class CarSpecs(models.Model):
    car_brand = models.CharField(max_length=100)
    car_model = models.CharField(max_length=100)
    production_year = models.IntegerField()
    car_body = models.CharField(max_length=100)
    engine_type = models.CharField(max_length=100)

    def __str__(self):
        return f"Car brand: {self.car_brand} Car Model: {self.car_model} Year: {self.production_year}"
