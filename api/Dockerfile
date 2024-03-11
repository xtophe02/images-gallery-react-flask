# Use an official Python runtime as a parent image
FROM python:3.12-slim

# Set the working directory in the container
WORKDIR /app

# Define environment variable (if needed)
# ENV NAME World

# Create a directory for virtual environment (optional)
# RUN mkdir -p /app/venv

# Copy requirements.txt (exclude .venv folder)
COPY requirements.txt requirements.txt

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Copy the rest of the project files (excluding .venv)
COPY . .

# Make port 80 available to the world outside this container
EXPOSE 5050

# Run app.py when the container launches
CMD ["python", "main.py"]
