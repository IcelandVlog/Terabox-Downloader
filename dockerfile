FROM oven/bun

WORKDIR /terabox-dl
COPY . .
RUN bun i

CMD ["bun", "start"]
