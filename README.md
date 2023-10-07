# Blogster Node.js Project (Work in Progress)

Blogster is a Node.js-based blogging platform currently in development, focusing on advanced Node.js concepts
like caching with Redis, clustering for performance optimization, and image upload using Amazon S3.
This repository serves as a learning resource for me and developers who are interested in exploring these advanced Node.js topics.
Please note that this project is a work in progress.

### Setup

- Run `npm install` in the root of the project to install server dependencies
- Change into the client directory and run `npm install --legacy-peer-deps`
- Change back into the root of the project and run `npm run dev` to start the server
- Access the application at `localhost:3000` in your browser

### Notes

- Make sure to attach your own config file to the project
- Make sure to configure the AWS S3 correctly to avoid CORS problem and permissions issues
