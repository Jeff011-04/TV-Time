// pages/_app.tsx
import "@/styles/globals.css"; // Correct import for global styles
import type { AppProps } from "next/app"; // Type definition for app props

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />; // Renders the current page with its props
}
