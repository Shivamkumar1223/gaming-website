npm # Build stage

FROM node:18-alpine AS builder



# Set working directory

WORKDIR /app



# Copy package files

COPY package*.json ./



# Install dependencies

RUN npm install



# Copy source

COPY . .



# Build the application

RUN npm run build



# Production stage

FROM node:18-alpine AS runner



# Set working directory

WORKDIR /app



# Create a non-root user

RUN addgroup --system --gid 1001 nodejs && \

    adduser --system --uid 1001 nextjs



# Copy built assets from builder

COPY --from=builder /app/.next ./.next

COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/package.json ./package.json

COPY --from=builder /app/public ./public



# Set proper permissions

RUN chown -R nextjs:nodejs /app



# Switch to non-root user

USER nextjs



# Expose port

EXPOSE 3000



# Start the application

CMD ["npm", "start"]


