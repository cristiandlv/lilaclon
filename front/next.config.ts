


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    protocol: "https",
    hostname: "store.storeimages.cdn-apple.com",
  },
};

export default nextConfig; // 👈 Exportar de forma correcta en TypeScript



module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'store.storeimages.cdn-apple.com',
        pathname: '/**',
      },
      // Puedes agregar otros dominios de imágenes aquí, por ejemplo:
      
    ],
  },
};
