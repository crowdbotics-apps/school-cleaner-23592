from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import ugettext_lazy as _
User = get_user_model()


class District(models.Model):
    name = models.CharField(verbose_name=_('District Name'), max_length=255)
    logo = models.ImageField(verbose_name=_('Logo Image'), upload_to="district_logos")
    code = models.CharField(verbose_name=_('District Code'), max_length=5)

    admins = models.ManyToManyField(User, blank=True, related_name="admins_against_district")
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = '1- Districts'
        ordering = ('-created', )


class SchoolBuilding(models.Model):
    name = models.CharField(verbose_name=_('School Name'), max_length=255)
    image = models.ImageField(verbose_name=_('Image'), upload_to="district_logos")
    inspectors = models.ManyToManyField(User, blank=True)
    district = models.ForeignKey(
        "district_services.District", on_delete=models.CASCADE, related_name="schools_in_district"
    )

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = '2- School Buildings'
        ordering = ('-created',)


class Section(models.Model):
    name = models.CharField(verbose_name=_('Section Name'), max_length=255)
    school = models.ForeignKey(
        "district_services.SchoolBuilding", on_delete=models.CASCADE, related_name="sections_in_school"
    )
    paper_towel_dispensers = models.PositiveIntegerField(default=0)
    toiler_tissue_dispensers = models.PositiveIntegerField(default=0)
    hand_soap_dispensers = models.PositiveIntegerField(default=0)
    hand_sanitizer_dispensers = models.PositiveIntegerField(default=0)

    people = models.ManyToManyField(User, blank=True, related_name="people_in_section")

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = '3- Sections'
        ordering = ('-created',)


class RoomType(models.Model):
    name = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = '4- Room Types'
        ordering = ('-created',)


class Room(models.Model):
    name = models.CharField(verbose_name=_('Room Name'), max_length=255)
    room_type = models.ForeignKey(RoomType, on_delete=models.PROTECT)
    square_feet = models.PositiveIntegerField(default=0)
    desks = models.PositiveIntegerField(default=0)
    windows = models.PositiveIntegerField(default=0)
    trash_cans = models.PositiveIntegerField(default=0)
    section = models.ForeignKey("district_services.Section", on_delete=models.CASCADE, related_name="rooms_in_section")
    estimated_time_to_clean = models.DurationField()

    cleaner = models.ForeignKey(
        User, blank=True, related_name="cleaner_of_room", on_delete=models.SET_NULL,
        null=True, limit_choices_to={"role": "simple_user"})

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = '5- Rooms'
        ordering = ('-created',)
