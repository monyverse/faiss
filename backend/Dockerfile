# Build context is the repository root:  docker build -f backend/Dockerfile .
FROM python:3.12-slim AS build
COPY --from=ghcr.io/astral-sh/uv:0.8 /uv /bin/uv
ENV UV_COMPILE_BYTECODE=1 UV_LINK_MODE=copy
WORKDIR /app
COPY backend/pyproject.toml backend/uv.lock ./
RUN uv sync --frozen --no-dev --extra aws --no-install-project
COPY backend/faiss_platform ./faiss_platform
RUN uv sync --frozen --no-dev --extra aws

FROM python:3.12-slim
RUN useradd --uid 10001 --no-create-home --shell /usr/sbin/nologin faiss
WORKDIR /app
COPY --from=build --chown=10001:10001 /app /app
# The approved knowledge corpus ships inside the image, so every environment serves the same reviewed version.
COPY --chown=10001:10001 knowledge/corpus /app/corpus
ENV PATH=/app/.venv/bin:$PATH \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    FAISS_CORPUS_DIR=/app/corpus \
    FAISS_EMBEDDED_WORKER=false
USER 10001
EXPOSE 8000
CMD ["uvicorn", "faiss_platform.main:app", "--host", "0.0.0.0", "--port", "8000"]
