# Build
FROM oven/bun:1.3.5 AS build
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY src ./src
COPY index.ts build.ts tsconfig.json ./

RUN bun build.ts

# Runtime
FROM oven/bun:distroless
WORKDIR /app

ENTRYPOINT []

COPY --from=build /app/build/server ./server

EXPOSE 3000
CMD ["./server"]
