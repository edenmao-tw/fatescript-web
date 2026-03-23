FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    wget \
    && rm -rf /var/lib/apt/lists/*

# Download Swiss Ephemeris data files
RUN mkdir -p /usr/share/ephe && \
    wget -q -P /usr/share/ephe https://www.astro.com/ftp/swisseph/ephe/seas_18.se1 || true && \
    wget -q -P /usr/share/ephe https://www.astro.com/ftp/swisseph/ephe/semo_18.se1 || true && \
    wget -q -P /usr/share/ephe https://www.astro.com/ftp/swisseph/ephe/sepl_18.se1 || true

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY main.py .

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
