import Document, { Head, Html, Main, NextScript } from "next/document";
import {
  StyleProvider,
  createCache,
  extractStyle,
  legacyLogicalPropertiesTransformer,
  px2remTransformer,
} from "@ant-design/cssinjs";
import { Helmet } from "react-helmet";

interface HeadlessProps {
  helmet: any;
}

class HeadlessDocument extends Document<HeadlessProps> {
  get helmetHtmlAttrComponents() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.props.helmet.htmlAttributes.toComponent();
  }

  get helmetBodyAttrComponents() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.props.helmet.bodyAttributes.toComponent();
  }

  get helmetHeadComponents() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (
      Object.keys(this.props.helmet)
        .filter((el) => el !== "htmlAttributes" && el !== "bodyAttributes")
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        .map((el) => this.props.helmet[el].toComponent())
    );
  }

  render(): JSX.Element {
    return (
      <Html {...this.helmetHtmlAttrComponents}>
        <Head>{this.helmetHeadComponents}</Head>
        <body {...this.helmetBodyAttrComponents}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

HeadlessDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render
  const cache = createCache();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) =>
        (
          <StyleProvider
            cache={cache}
            ssrInline
            transformers={[
              legacyLogicalPropertiesTransformer,
              px2remTransformer(),
            ]}
          >
            <App {...props} />
          </StyleProvider>
        ),
    });

  const initialProps = await Document.getInitialProps(ctx);
  const css = extractStyle(cache);

  return {
    ...initialProps,
    styles: (
      <>
        {initialProps.styles}
        <style
          id="jss-server-side"
          key="jss-server-side"
          // rome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{ __html: css }}
        />
      </>
    ),
    helmet: Helmet.renderStatic(),
  };
};

export default HeadlessDocument;
