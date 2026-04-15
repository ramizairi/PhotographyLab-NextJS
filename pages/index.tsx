import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import dynamic from "next/dynamic";
import Layout from "../components/layout";
import HeroGeometric from "../components/hero";
import { SplashScreen } from "../components/splash-screen";
import { DeferredRender } from "../components/common/DeferredRender";

const Features = dynamic(() => import("../components/Video"), { ssr: false });
const ClubMembers = dynamic(() => import("../components/bureauCard/index"), {
  ssr: false,
});
const Brands = dynamic(() => import("../components/Brands"), { ssr: false });
const ClubsGallery = dynamic(() => import("../components/clubs"), {
  ssr: false,
});
const BlogPage = dynamic(() => import("./blog"), { ssr: false });

const Home: NextPage = () => {
  const [isSplashScreenVisible, setIsSplashScreenVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashScreenVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout showHeader={!isSplashScreenVisible}>
      <Head>
        <title>HOME</title>
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:image" content="/og-image.png" />
      </Head>
      
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4159979187111890"
        crossOrigin="anonymous"
      />

      {isSplashScreenVisible ? (
        <SplashScreen />
      ) : (
        <>
          <HeroGeometric />
          <DeferredRender
            className="bg-black"
            minHeight="100vh"
            rootMargin="200px 0px"
          >
            <Features />
          </DeferredRender>
          <DeferredRender
            className="bg-black"
            minHeight="100vh"
            rootMargin="200px 0px"
          >
            <ClubMembers />
          </DeferredRender>
          <DeferredRender
            className="bg-black"
            minHeight="260px"
            rootMargin="400px 0px"
          >
            <Brands />
          </DeferredRender>
          <DeferredRender
            className="bg-black"
            minHeight="720px"
            rootMargin="500px 0px"
          >
            <ClubsGallery />
          </DeferredRender>
          <DeferredRender minHeight="720px" rootMargin="500px 0px">
            <BlogPage noLayout={true} />
          </DeferredRender>
        </>
      )}
    </Layout>
  );
};

export default Home;
