/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // see https://styled-components.com/docs/tooling#babel-plugin for more info on the options.
    styledComponents: true | {
      // Enabled by default in development, disabled in production to reduce file size,
      // setting this will override the default for all environments.
      displayName: true,
      // Enabled by default.
      ssr: true,
      // Enabled by default.
      fileName: true,
      
    },
  },
  env: {
    MONGO_URI: process.env.MONGO_URI,
  },
  async rewrites() {
    return [
      {
        source: "/api/architect",
        destination: "https://wakcraft-k1dgnxtdw-yewonjin.vercel.app/api/architect"
      }
    ]
  },
}

module.exports = nextConfig
