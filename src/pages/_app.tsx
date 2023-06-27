import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider, useSession } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import API from "@/network/api";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  if (session) {
    API.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${session.user.bearerToken}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <ToastContainer
        autoClose={2000}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        limit={1}
      />
    </SessionProvider>
  );
}
