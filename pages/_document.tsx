import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          {/* Google Analytics */}
          <Script async src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXX-X" />
          <Script
            id="google-analytics"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'UA-XXXXXXX-X');
              `,
            }}
          />
        </Head>

        <body className="bg-black antialiased">
          {/* Google Tag Manager (noscript) */}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-MKPQ5743"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
          {/* End Google Tag Manager (noscript) */}
          
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;