// upstream ${UPSTREAM_NAME} {
//     server ${UPSTREAM_HOST}:${UPSTREAM_PORT};
// }
//location /api {
//             proxy_redirect  http://${UPSTREAM_NAME}/  /api/;
//             proxy_pass http://${UPSTREAM_NAME};
//         }

interface Backend {
  name: string;
  host: string;
  port: string;
}

export function createNginxConfig(backends: Backend[]) {
  const upstream = backends.map((be) => {
    return `
upstream ${be.name} {
    server ${be.host}:${be.port};
}
`;
  });

  const apis = backends.map((be) => {
    // be.port
    return `
        location /api {
            proxy_pass http://${be.name};
        }
`;
  });

  return `
${upstream.join("")}
server {
        listen       80;
        listen  [::]:80;
        server_name  localhost;

        #access_log  /var/log/nginx/host.access.log  main;
        proxy_http_version 1.1;
        client_body_buffer_size 100m;
        client_max_body_size 0;
        proxy_buffering on;
        proxy_buffer_size 50m;
        proxy_buffers 8 10m;
        proxy_busy_buffers_size 50m;
        proxy_request_buffering off;
        keepalive_timeout 600;
        client_header_buffer_size 1k;
        large_client_header_buffers 4 8k;
        location / {
            root   /usr/share/nginx/html;
            index  index.html index.htm;
            try_files $uri $uri/ /index.html =404;
        }
        ${apis.join("")}
        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   /usr/share/nginx/html;
        }

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\\.ht {
        #    deny  all;
        #}
    }
`;
}
