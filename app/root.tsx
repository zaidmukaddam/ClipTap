import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react";
import styles from "./tailwind.css";

const getEnv = () => {
  return {
    PUBLIC_PUSHER_CLUSTER: process.env.PUBLIC_PUSHER_CLUSTER,
    PUBLIC_PUSHER_KEY: process.env.PUBLIC_PUSHER_KEY
  };
};

type Env = ReturnType<typeof getEnv>;

interface RouteData {
  ENV: Env;
}

declare global {
  interface Window {
    ENV: Env;
  }
}

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: MetaFunction = () => {
  return {
    "theme-color": "#15E269",
    "color-scheme": "dark light",
    "og:title": "Cliptap",
    "og:type": "article",
    "og:url": "https://cliptap.fly.dev/",
    "og:author": "https://twitter.com/zaidmukaddam",
    "og:image": "https://cliptap.fly.dev/banner.png",
    "og:description":
      "Share your clipboard with people nearby. Open Source, No Setup, No Signup.",
    "twitter:card": "summary_large_image",
    "twitter:author": "@zaidmukaddam",
    "twitter:site": "@zaidmukaddam",
    "twitter:image": "https://cliptap.fly.dev/banner.png",
    "twitter:description":
      "Share your clipboard with people nearby. Open Source, No Setup, No Signup.",
    "X-UA-Compatible": "IE=edge,chrome=1",
    author: "Zaid Mukaddam",
    language: "en",
    robots: "index, follow",
    description:
      "Share your clipboard with people nearby. Open Source, No Setup, No Signup.",
    title: "Cliptap",
    keywords: "Clipboard, Share",
    viewport: "width=device-width,initial-scale=1"
  };
};

export const loader: LoaderFunction = () => {
  return json({
    ENV: getEnv()
  });
};

function Head() {
  return (
    <head>
      <noscript>Cliptap requires JavaScript.</noscript>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />

      <Meta />
      <Links />
    </head>
  );
}

function Environment() {
  const { ENV } = useLoaderData<RouteData>();

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `window.ENV = ${JSON.stringify(ENV)}`
      }}
    />
  );
}

function App() {
  if (typeof window === "undefined") {
    return null;
  }

  return <Outlet />;
}

function Body() {
  return (
    <body>
      <App />
      <Environment />
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </body>
  );
}

export default function Root() {
  return (
    <html lang="en">
      <Head />
      <Body />
    </html>
  );
}
