# Hướng dẫn Deploy Website Next.js lên VPS (Ubuntu) sử dụng PM2 và Nginx

## Mục lục
1. [Chuẩn bị môi trường](#1-chuan-bi-moi-truong)
2. [Cài đặt Tools](#2-cai-dat-tools)
3. [Clone & Build](#3-clone--build)
4. [Cấu hình PM2](#4-cau-hinh-pm2)
5. [Cấu hình Nginx](#5-cau-hinh-nginx)
6. [Cấu hình SSL & Domain](#6-cau-hinh-ssl--domain)
7. [Xử lý sự cố (Quan trọng)](#7-xu-ly-su-co)

---

## 1. Chuẩn bị môi trường
- VPS Ubuntu 20.04/22.04/24.04
- Domain đã trỏ về IP VPS (A Record)

## 2. Cài đặt Tools
```bash
sudo apt update
sudo apt install -y nodejs npm nginx git
sudo npm install -g pm2
sudo npm install -g n
sudo n latest
```

## 3. Clone & Build
```bash
cd /var/www
git clone https://github.com/trongvtv24/tulanh.git
cd tulanh
npm install --legacy-peer-deps
npm run build
```

**Set biến môi trường (.env.local):**
```bash
NEXT_PUBLIC_SITE_URL=https://tulanh.online
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## 4. Cấu hình PM2
```bash
pm2 start npm --name "tulanh" -- start
pm2 save
pm2 startup
```

## 5. Cấu hình Nginx
Tạo file `/etc/nginx/sites-available/tulanh.online`

```nginx
server {
    server_name tulanh.online www.tulanh.online;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        # ...standard headers...
        
        # QUAN TRỌNG: Tăng buffer để tránh lỗi 502 khi dùng Supabase Auth
        proxy_buffer_size          128k;
        proxy_buffers              4 256k;
        proxy_busy_buffers_size    256k;
    }
}
```

## 6. Cấu hình SSL & Domain
```bash
sudo apt install certbot python3-certbot-nginx
certbot --nginx -d tulanh.online -d www.tulanh.online
```

## 7. Xử lý sự cố (Troubleshooting)

### Lỗi 502 Bad Gateway sau khi Login
- **Nguyên nhân:** Supabase gửi về cookie/header quá lớn, vượt quá giới hạn mặc định của Nginx (4k/8k).
- **Giải pháp:** Thêm config `proxy_buffer_size 128k` vào Nginx location block.

### Lỗi `pkce_code_verifier_not_found`
- **Nguyên nhân:**
  1. Cookie verifier bị mất khi chuyển hướng qua lại giữa subdomains (www -> non-www).
  2. Redirect URL hardcoded sai domain.
- **Giải pháp:**
  1. Dùng `window.location.origin` thay vì hardcode URL trong `signInWithOAuth`.
  2. Đảm bảo Nginx forward đúng `Host` và `X-Forwarded-Proto`.

### Lỗi xung đột Peer Dependencies
- **Giải pháp:** Dùng `npm install --legacy-peer-deps`.
