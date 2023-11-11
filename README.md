```bash
docker run -d \
  --name=tenant-restarante-api \
  --restart=always \
  -e NODE_ENV=production \
  -e DB_URI= \
  -e PUBLIC_URL= \
  -e JWT_SECRET= \
  -e GOOGLE_ID= \
  -e GOOGLE_SERVICE_ACCOUNT_EMAIL= \
  -e GOOGLE_PRIVATE_KEY=  \
  -e KEY_MACHINE=  \
  -p 3000-3050:3000 \
  --cap-add=SYS_ADMIN \
  manuel01201992/tenant-api:latest
```
 