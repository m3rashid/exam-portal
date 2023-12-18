FROM ubuntu:22.04
RUN apt update && apt upgrade -y && apt autoremove -y
RUN apt install build-essential curl ca-certificates gnupg python3 -y
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_16.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list
RUN apt update && apt install nodejs -y
RUN npm install -g yarn

WORKDIR /app

COPY backend/package.json backend/yarn.lock ./backend/
RUN cd backend && yarn && cd ..
COPY backend/ ./backend/

COPY frontend/package.json frontend/yarn.lock ./frontend/
RUN cd frontend && yarn && cd ..

COPY frontend/ ./frontend/
RUN cd frontend && yarn build && cd ..

EXPOSE 5000
