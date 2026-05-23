/** PM2 — solo si usas VPS (Linux) */
module.exports = {
  apps: [{
    name: 'yax',
    script: 'server.js',
    cwd: __dirname,
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '300M',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      HOST: '127.0.0.1',
    },
  }],
};
