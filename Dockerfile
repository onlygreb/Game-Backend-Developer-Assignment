FROM node:18-bullseye-slim

# Install git and bash
RUN apt-get update \
 && apt-get install -y --no-install-recommends git bash openjdk-11-jre-headless \
 && rm -rf /var/lib/apt/lists/*


# Install the Firebase CLI globally
RUN npm install -g firebase-tools

WORKDIR /app

COPY package.json package-lock.json ./
COPY admin/package.json admin/
COPY functions/package.json functions/

RUN npm ci

COPY . .

RUN npm run build -w admin
RUN npm run build -w functions

# Expose emulator ports per firebase.json
# 5000 = Emulator UI, 5001 = Hosting, 5002 = Functions, 5003 = Firestore
EXPOSE 5000 5001 5002 5003

CMD ["firebase", "emulators:start", "--project", "demo-gbda"]
