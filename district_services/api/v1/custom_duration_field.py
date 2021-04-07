from rest_framework.fields import DurationField


class CustomDurationField(DurationField):

    def to_representation(self, value):
        return c_duration_string(value)


def c_duration_string(duration):
    days, hours, minutes, seconds, microseconds = _get_duration_components(duration)
    string = '{:02d}:{:02d}:{:02d}'.format(hours, minutes, seconds)
    if days:
        string = '{} '.format(days) + string
    if microseconds:
        string += '.{:06d}'.format(microseconds)
    return string


def _get_duration_components(duration):
    try:
        seconds = 0
        if duration.hour > 0:
            seconds += duration.hour * 3600
        if duration.minute > 0:
            seconds += duration.minute * 60
        if duration.second > 0:
            seconds += duration.second
        microseconds = duration.microsecond
    except:
        seconds = duration.seconds
        microseconds = duration.microseconds
    try:
        days = duration.days
    except:
        days = None
    minutes = seconds // 60
    seconds = seconds % 60
    hours = minutes // 60
    minutes = minutes % 60
    return days, hours, minutes, seconds, microseconds

