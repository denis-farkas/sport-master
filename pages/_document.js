import Footer from 'components/Footer';
import { Html, Head, Main, NextScript, } from 'next/document'




export default Document;
// structure de l'application 1 ere partie du layout
function Document() {
    return (
        <Html lang="en">
            <Head>
                {/* eslint-disable-next-line @next/next/no-css-tags */}
                <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap"
          rel="stylesheet"
        ></link>
            </Head>

            <body>
                <Main />
              
                <NextScript />
              
            </body>
        </Html>
    );
}