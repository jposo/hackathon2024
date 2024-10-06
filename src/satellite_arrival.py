from datetime import datetime, timedelta

def next_pass_date(last_datetime: str) -> str:
    """
    Calculates the next date and time when the Landsat satellite will pass over a location.
    
    :param last_datetime: Date and time in 'YYYY-MM-DD HH:MM:SS' format when the satellite last passed over the location.
    :return: The next pass date and time in 'YYYY-MM-DD HH:MM:SS' format.
    """
    # Get the current date and time
    current_date_time = datetime.now()
    
    # Define the interval of days between satellite passes
    days_interval = 16
    
    # Convert the last datetime from string to a datetime object
    last_datetime_dt = datetime.strptime(last_datetime, '%Y-%m-%d %H:%M:%S')
    
    # Initialize next_date_dt with the last_datetime_dt
    next_date_dt = last_datetime_dt
    
    # Calculate the next pass date and time
    while next_date_dt <= current_date_time:
        next_date_dt += timedelta(days=days_interval)
    
    # Return the next pass date and time as a formatted string
    return next_date_dt.strftime('%Y-%m-%d %H:%M:%S')

# Example of usage
last_datetime = '2024-09-01 12:00:00'  # Last pass date and time
print(f"The next pass date and time of the satellite is: {next_pass_date(last_datetime)}")
