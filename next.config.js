// https://github.com/cyrilwanner/next-compose-plugins

const withPlugins = require('next-compose-plugins');
const images = require('next-images');

const nextConfig = {
  target: 'serverless'
}

module.exports = withPlugins([
  
  // add a plugin without a configuration
  images,

], nextConfig)
