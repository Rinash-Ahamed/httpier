import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";

test("Firebase Auth loads and JWKS keys verify signatures without require(ESM) support", () => {
  const result = spawnSync(process.execPath, ["--no-experimental-require-module", "-e", `
    const assert = require('node:assert/strict');
    const path = require('node:path');
    const crypto = require('node:crypto');
    require('firebase-admin/auth');
    const { retrieveSigningKeys } = require(path.join(path.dirname(require.resolve('jwks-rsa')), 'utils.js'));
    (async () => {
      const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 });
      const jwk = { ...publicKey.export({ format: 'jwk' }), kid: 'runtime-test', alg: 'RS256', use: 'sig' };
      const keys = await retrieveSigningKeys([jwk]);
      assert.equal(keys.length, 1);
      assert.equal(keys[0].kid, 'runtime-test');
      const data = Buffer.from('test-only-signature-payload');
      const signature = crypto.sign('RSA-SHA256', data, privateKey);
      assert.ok(crypto.verify('RSA-SHA256', data, keys[0].getPublicKey(), signature));
      assert.equal(crypto.verify('RSA-SHA256', Buffer.from('tampered'), keys[0].getPublicKey(), signature), false);
      console.log('Firebase Auth import and JWKS signature verification passed');
    })().catch((error) => { console.error(error); process.exitCode = 1; });
  `], { encoding: "utf8", timeout: 30000 });
  assert.equal(result.status, 0, result.stderr || result.error?.message);
  assert.match(result.stdout, /JWKS signature verification passed/);
});
