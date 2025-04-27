FROM python:3.13-slim-bookworm

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl 

ADD https://astral.sh/uv/0.5.29/install.sh /uv-installer.sh
RUN sh /uv-installer.sh && rm /uv-installer.sh

# Ensure the installed binary is on the `PATH`
ENV PATH="/root/.local/bin/:$PATH"

#Prevent Python from buffering stdout and stderr
ENV PYTHONUNBUFFERED=1

#Prevent Python from writing out pyc files.
ENV PYTHONDONTWRITEBYTECODE=1

# Use the system Python environment
ENV UV_PROJECT_ENVIRONMENT="/usr/local/"

ADD . /app

WORKDIR /app
RUN uv sync --frozen

EXPOSE 8000

ENTRYPOINT [ "uv","run", "python", "manage.py", "runserver", "0.0.0.0:8000"]