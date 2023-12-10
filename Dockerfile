# Use an official Python runtime as a base image
FROM python:3.9

# Set the working directory in the container
WORKDIR /web

# Copy the requirements.txt file into the container at /web
COPY requirements.txt .

# Install any needed dependencies specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Download the NLTK data
RUN python -m nltk.downloader all

# Copy the entire current directory contents into the container at /web
COPY . /web

# Expose the port that the Flask app will run on
EXPOSE 5000

# Define environment variable
ENV FLASK_APP=app.py

# Run app.py when the container launches
CMD ["flask", "run", "--host=0.0.0.0"]
