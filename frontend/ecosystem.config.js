module.exports = {
  apps: [
    {
      name: 'dev.greenly.co',
      script: 'npm',
      args: 'start',
      cwd: '.',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};