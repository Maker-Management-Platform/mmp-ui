#!/bin/ash

echo "{\"local_backend\":\"${LOCAL_BACKEND}\"}" > /usr/share/nginx/html/settings.json
cat /usr/share/nginx/html/settings.json
