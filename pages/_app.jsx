import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import LLayout from "../layout/LLayout";

import "../styles/globals.css";

import { Provider } from "react-redux";
import store from "../redux/store";

import { SessionProvider } from "next-auth/react";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Router from "next/router";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

Router.events.on("routeChangeStart", () => NProgress.start()) // route degisligi basladiginda
Router.events.on("routeChangeComplete", () => NProgress.done()) // bittiginde
Router.events.on("routeChangeError", () => NProgress.done()) // hata verirse



function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <LLayout>
          <div className="pt-[88px]">
            <ToastContainer/>
            <Component {...pageProps} />
          </div>
        </LLayout>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
