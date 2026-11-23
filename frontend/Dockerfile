# FAISS web. Build context is the repository root:  docker build -f frontend/Dockerfile .
# One image for every environment: configuration is read from the environment at runtime.

FROM node:24-slim AS build
COPY --from=oven/bun:1.3 /usr/local/bin/bun /usr/local/bin/bun
WORKDIR /app
COPY frontend/package.json frontend/bun.lock frontend/bunfig.toml ./
RUN bun install --frozen-lockfile
COPY frontend/ ./
# The embeddable copilot is built first and shipped as a static file, so the same image serves
# the app and /faiss-copilot.js for other portals.
RUN bun run build:embed \
 && cp dist-embed/faiss-copilot.js public/faiss-copilot.js \
 && bun run build

FROM node:24-slim
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000
WORKDIR /app
# The Nitro output is self-contained (no node_modules needed) and the server writes nothing to
# disk, so the container runs with a read-only root filesystem as a non-root user.
COPY --from=build --chown=10001:10001 /app/.output ./.output
USER 10001:10001
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
