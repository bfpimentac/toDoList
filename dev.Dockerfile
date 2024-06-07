##### DEPENDENCIES

FROM --platform=linux/amd64 node:18
WORKDIR /app

# Install Prisma Client - remove if not using Prisma

COPY prisma ./prisma

# Install dependencies based on the preferred package manager

COPY package.json yarn.loc[k] ./

RUN yarn --frozen-lockfile

COPY . .

EXPOSE 3000
ENV PORT 3000

CMD ["yarn", "dev"]
