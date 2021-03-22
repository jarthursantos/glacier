module.exports = {
  apps: [
    {
      name: 'server',
      script: 'dist/server.js',
      watch: 'dist',
      instances: 1
    },
    {
      name: 'check-completed-jobs',
      script: 'dist/check-completed-jobs.js',
      watch: 'dist',
      instances: 1,
      cron_restart: '* 7-18 * * *'
    },
    {
      name: 'clear-completed-jobs',
      script: 'dist/check-completed-jobs.js',
      watch: 'dist',
      instances: 1,
      cron_restart: '0 0 * * *'
    }
  ]
}
