require('dotenv').config();

module.exports = {
    apps : [{
        name: "Hamster S3",
        script: "./www/app.js",
        cwd: './',
        watch: true,
        ignore_watch: ['logs'],
        error_file: 'logs/err.log',
        out_file: 'logs/out.log',
        log_file: 'logs/combined.log',
    }]
}