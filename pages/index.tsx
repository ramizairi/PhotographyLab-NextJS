import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import Layout from "../components/layout";
import HeroGeometric from "../components/hero";
import PubsCard from "../components/PubsCard";
import Footer from "../components/footer";
import { SplashScreen } from "../components/splash-screen";
import ClubsGallery from "../components/clubs";
import ClubMembers from "../components/bureauCard/index";
import Brands from "../components/Brands";
import Features from "../components/Video";

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
          <Features />
          <ClubMembers />
          <Brands />
          <ClubsGallery />
        </>
      )}
    </Layout>
  );
};

export default Home;