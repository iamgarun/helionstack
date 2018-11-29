import React, { PureComponent } from 'react';

export default class Index extends PureComponent {
  render() {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui" />
          <meta name="keywords" content={this.props.keywords} />
          <meta name="description" content={this.props.description} />
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css"
            integrity="sha256-oSrCnRYXvHG31SBifqP2PM1uje7SJUyX0nTwO2RJV54="
            crossOrigin="anonymous"
          />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/react-toastify@4.4.3/dist/ReactToastify.min.css" />
        </head>
        <body>
          <div id="root">{this.props.children}</div>
        </body>
      </html>
    );
  }
}
