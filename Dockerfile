# Utilise une image officielle Node.js comme image de base
FROM node:20-alpine

# Crée le répertoire de travail
WORKDIR /app

# Copie les fichiers de dépendances
COPY package*.json ./

# Installe les dépendances
RUN npm install --production

# Copie le reste du code de l'application
COPY . .

# Expose le port utilisé par l'app (modifie si besoin)
EXPOSE 3000

# Démarre l'application
CMD ["node", "server.js"]

