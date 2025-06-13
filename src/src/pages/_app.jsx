import '@/styles/globals.css'; // ✅ Tailwind styles come from here

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
