module.exports = {
  apps: [
    {
      name: 'dev.backend.greenly.co',
      script: 'npm',
      args: 'start',
      cwd: './backend',
      env: {
        NODE_ENV: 'development',
        PORT: 1337,
      },
    },
    {
      name: 'dev.frontend.greenly.co',
      script: 'npm',
      args: 'start',
      cwd: './frontend',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
