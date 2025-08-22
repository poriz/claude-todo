# 프론트엔드 Dockerfile - Multi-stage build
FROM node:18-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /app

# package files 복사
COPY package*.json ./
COPY tsconfig.json ./
COPY vite.config.ts ./
COPY postcss.config.js ./

# 의존성 설치
RUN npm install

# 소스 코드 복사
COPY src/ ./src/
COPY public/ ./public/
COPY index.html ./

# 빌드
RUN npm run build

# Production 스테이지 - nginx 사용
FROM nginx:alpine

# nginx 설정 복사
COPY --from=builder /app/dist /usr/share/nginx/html

# nginx 설정 파일 생성
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
    location /api { \
        proxy_pass http://backend:3001; \
        proxy_http_version 1.1; \
        proxy_set_header Upgrade $http_upgrade; \
        proxy_set_header Connection "upgrade"; \
        proxy_set_header Host $host; \
        proxy_set_header X-Real-IP $remote_addr; \
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; \
        proxy_set_header X-Forwarded-Proto $scheme; \
    } \
}' > /etc/nginx/conf.d/default.conf

# 포트 노출
EXPOSE 80

# nginx 실행
CMD ["nginx", "-g", "daemon off;"]