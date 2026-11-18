'use strict';

const http = require('node:http');
const os = require('node:os');

const server = http.createServer((req, res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname;

  // demo-only routes
  if (req.method === 'GET' && pathname === '/') {
    res.writeHead(200, { 'content-type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({
      pod: os.hostname(),
      uptimeSeconds: Math.floor(process.uptime()),
      secretSet: Boolean(process.env.DEMO_SECRET),
    }));
    return;
  }

  if (req.method === 'GET' && pathname === '/health') {
    res.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('ok');
    return;
  }

  if (req.method === 'GET' && pathname === '/crash') {
    res.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('crashing');
    setTimeout(() => process.exit(1), 100);
    return;
  }

  if (req.method === 'GET' && pathname === '/hang') {
    // Intentionally keep this request open for liveness-probe demonstrations.
    return;
  }

  res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
  res.end('not found');
});

server.listen(3000, '0.0.0.0', () => {
  console.log('hello-zv2-demo listening on 0.0.0.0:3000');
});
