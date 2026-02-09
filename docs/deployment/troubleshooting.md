# KHẮC PHỤC SỰ CỐ: LỖI 502 BAD GATEWAY KHI LOGIN SUPABASE

## 1. Hiện tượng
- User login Google thành công, bị redirect về `tulanh.online/auth/callback?code=...`
- Trang báo **502 Bad Gateway Nginx**.
- Log PM2 (`pm2 logs`) KHÔNG báo lỗi (Next.js server vẫn sống, chưa nhận được request từ Nginx).
- Log Nginx (`/var/log/nginx/error.log`) báo:
  ```
  upstream sent too big header while reading response header from upstream
  ```

## 2. Nguyên nhân
- Supabase Auth (GoTrue) gửi về một lượng lớn Header và Cookie sau khi xác thực thành công.
- Nginx mặc định buffer size chỉ khoảng 4k - 8k.
- Khi Header > 8k, Nginx từ chối forward request tới backend (Next.js) -> Trả về 502.

## 3. Giải pháp (Fix thành công ngày 09/02/2026)
Thêm các dòng sau vào file cấu hình Nginx (trong block `location /`):

```nginx
        # Tăng kích thước buffer để xử lý Auth Headers từ Supabase
        proxy_buffer_size          128k;
        proxy_buffers              4 256k;
        proxy_busy_buffers_size    256k;
```

**Lưu ý:**
- Phải thêm vào file cấu hình đang ACTIVE (thường là file trong `sites-enabled` hoặc file SSL nếu dùng HTTPS).
- File SSL thường do Certbot quản lý (`/etc/nginx/sites-available/tulanh.online` -> port 443). Nên thêm vào đây.

## 4. Kiểm tra lại
- `nginx -t` -> OK
- `systemctl restart nginx` -> OK
- Login ẩn danh lại -> OK

---

# KHẮC PHỤC SỰ CỐ: LỖI PKCE VERIFIER NOT FOUND

## 1. Hiện tượng
- User login Google, redirect về `auth/callback`.
- Server log (PM2) báo lỗi: `AuthApiError: pkce_code_verifier_not_found`.
- Trình duyệt không gửi cookie `sb-xxxxx-auth-token-code-verifier` lên server.

## 2. Nguyên nhân
- **Cookie Domain Mismatch:** User login ở `www.domain.com` nhưng cookie set cho `domain.com` (hoặc ngược lại). Khi redirect về subdomain khác, cookie bị mất.
- **Hardcoded Redirect URL:** Code frontend dùng cứng `https://domain.com` làm `redirectTo`. Nếu user truy cập từ `www` hoặc `localhost`, flow bị sai lệch.

## 3. Giải pháp (Fix thành công ngày 09/02/2026)
- **Frontend (useSupabaseAuth.ts):**
  Dùng `window.location.origin` thay vì URL cứng:
  ```typescript
  const origin = (typeof window !== 'undefined' && window.location) ? window.location.origin : '';
  redirectTo: `${origin}/auth/callback`
  ```
- **Nginx Config:**
  Đảm bảo forward đúng Host header để ứng dụng nhận diện đúng domain gốc:
  ```nginx
  proxy_set_header Host $host;
  proxy_set_header X-Forwarded-Proto $scheme;
  ```
