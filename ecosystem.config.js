module.exports = {
  apps: [
    {
      name: 'app-fork',
      script: './dist/index.js',
      watch: false,
      autorestart: true,
      args: '--mode fork --run pm2',
      detached: true,
      exec_mode: 'fork',
    },
    {
      name: 'app-cluster',
      script: './dist/index.js',
      watch: false,
      autorestart: true,
      instances: 4,
      args: '--mode cluster --run pm2 --port=8081',
      detached: true,
      exec_mode: 'cluster',
    },
  ],
};
