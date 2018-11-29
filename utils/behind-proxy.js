const { env } = process;
const url = require('url');
const tunnel = require('tunnel');
const https = require('https');
const http = require('http');

const tunneler = () => {
  if (!env.http_proxy) return;

  const localUrls = [''];
  const proxy = url.parse(env.http_proxy);

  const tunnelingAgent = tunnel.httpsOverHttp({
    proxy: {
      host: proxy.hostname,
      port: proxy.port,
    },
  });

  const oldhttpsreq = https.request;
  https.request = (options, callback) => {
    // eslint-disable-next-line no-bitwise
    if (localUrls.some(u => ~u.indexOf(options.host))) {
      return oldhttpsreq.apply(https, arguments);
    }

    // eslint-disable-next-line no-param-reassign
    options.agent = tunnelingAgent;
    return oldhttpsreq.call(null, options, callback);
  };

  const oldhttpreq = http.request;
  http.request = (options, callback) => {
    // eslint-disable-next-line no-bitwise
    if (localUrls.some(u => ~u.indexOf(options.host))) {
      return oldhttpreq.apply(http, arguments);
    }

    // eslint-disable-next-line no-param-reassign
    options.agent = tunnelingAgent;
    return oldhttpreq.call(null, options, callback);
  };
};

module.exports = tunneler;
