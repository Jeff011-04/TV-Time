const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,  // Ensures that URLs end with a slash
  images: {
    unoptimized: true,  // Disable image optimization (optional)
  },
  output: 'export',  // Static export
};

export default nextConfig;
