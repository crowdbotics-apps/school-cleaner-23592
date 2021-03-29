from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _


class User(AbstractUser):
    # WARNING!
    """
    Some officially supported features of Crowdbotics Dashboard depend on the initial
    state of this User model (Such as the creation of superusers using the CLI
    or password reset in the dashboard). Changing, extending, or modifying this model
    may lead to unexpected bugs and or behaviors in the automated flows provided
    by Crowdbotics. Change it at your own risk.


    This model represents the User instance of the system, login system and
    everything that relates with an `User` is represented by this model.
    """

    USER_ROLES = (
        ("super_admin", "Super Admin"),
        ("admin", "Administrator / Custodian"),
        ("inspector", "Inspectors"),
        ("simple_user", "Simple User"),
    )
    name = models.CharField(
        null=True,
        blank=True,
        max_length=255,
    )
    phone = models.CharField(
        null=True,
        blank=True,
        max_length=256,
    )
    employer_code = models.CharField(
        null=True,
        blank=True,
        max_length=256,
    )
    is_superadmin = models.BooleanField(
        null=True,
        blank=True,
        default=False
    )
    is_admin = models.BooleanField(
        null=True,
        blank=True,
        default=False
    )
    is_inspector = models.BooleanField(
        default=True,
        null=True,
        blank=True,
    )
    role = models.CharField(max_length=15, choices=USER_ROLES, default="simple_user")

    def get_absolute_url(self):
        return reverse("users:detail", kwargs={"username": self.username})

    def save(self, *args, **kwargs):
        if self.is_superuser:
            self.role = "super_user"
        super(User, self).save(*args, **kwargs)
