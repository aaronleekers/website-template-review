import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import { once } from 'node:events';

const port = '3210';
const origin = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', port], {
  stdio: ['ignore', 'pipe', 'pipe'],
  env: { ...process.env, NEXT_PUBLIC_CONTENT_SOURCE: 'demo' },
});
let logs = '';
server.stdout.on('data', (data) => { logs += data; });
server.stderr.on('data', (data) => { logs += data; });

try {
  let ready = false;
  for (let attempt = 0; attempt < 60; attempt++) {
    if (server.exitCode !== null) throw new Error(`Server exited: ${logs}`);
    try { if ((await fetch(origin, {signal: AbortSignal.timeout(2000)})).ok) { ready = true; break; } } catch { /* startup */ }
    await delay(500);
  }
  assert.ok(ready, `Server did not become ready: ${logs}`);
  const home = await fetch(origin);
  assert.equal(home.status, 200);
  const html = await home.text();
  assert.match(html, /A small foundation for content-driven sites/);
  assert.match(html, /<details/);
  assert.match(html, /<summary/);
  assert.match(html, /demo-grid\.svg/);
  assert.match(html, /<title>/);
  const about = await fetch(`${origin}/about`);
  assert.equal(about.status, 200);
  assert.match(await about.text(), /Built to be easy to follow/);
  const missing = await fetch(`${origin}/a-page-that-does-not-exist`);
  assert.equal(missing.status, 404);
  const studio = await fetch(`${origin}/studio`);
  assert.equal(studio.status, 200);
  assert.match(await studio.text(), /Connect your own Sanity project/);
  const asset = await fetch(`${origin}/demo-grid.svg`);
  assert.equal(asset.status, 200);
  assert.match(asset.headers.get('content-type'), /svg/);
  console.log('PASS: home, about, metadata, content blocks, 404, Studio setup and local image.');
} catch (error) {
  console.error(logs);
  throw error;
} finally {
  if (server.exitCode === null) {
    const exited = once(server, 'exit');
    server.kill();
    await Promise.race([exited, delay(3000)]);
    if (server.exitCode === null) server.kill('SIGKILL');
  }
}
