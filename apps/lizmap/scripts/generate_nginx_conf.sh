#!/bin/sh

echo "Generating Nginx configuration..."

# Ensure directory is traversable by everyone (Nginx user needs access)
mkdir -p /www/lizmap/var/config
chmod 755 /www/lizmap/var/config

cat << 'EOF' > /www/lizmap/var/config/default.conf
server {
    listen 80;
    server_name _;
    root /www/lizmap/www;
    index index.php index.html;

    client_max_body_size 100M;
    fastcgi_read_timeout 300;

    location / {
        try_files $uri $uri/ /index.php$is_args$args;
    }

    location ~ \.php$ {
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass lizmap:9000;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param PATH_INFO $fastcgi_path_info;
    }
}
EOF

# Determine permissions
# We want user 1000 (Lizmap PHP) to own it, but Nginx (usually 101 or similar) to READ it.
# So we set owner to 1000:1000, but ensure permissions are 644 (Read for everyone).
chown 1000:1000 /www/lizmap/var/config/default.conf
chmod 644 /www/lizmap/var/config/default.conf

echo "Nginx configuration generated successfully."
ls -l /www/lizmap/var/config/default.conf
