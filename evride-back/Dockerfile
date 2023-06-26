FROM node

WORKDIR /usr/src

COPY . .

ENV PORT=5000
ENV DATABASE_URL=postgres://postgres:$senhapostgres@postgres:5432/evride?schema=public
ENV JWT_SECRET=senhasenha

RUN npm i

RUN npm run build

CMD ["npm", "start"]