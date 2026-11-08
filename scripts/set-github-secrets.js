import sodium from 'libsodium-wrappers';
import https from 'node:https';

// Read token from environment variable or command line argument for security
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.argv[2];
const REPO = 'CodeGenerationTechnologies/rabbiyosefmizrachifanpage';

if (!GITHUB_TOKEN) {
  console.error('Usage: GITHUB_TOKEN=xxx node scripts/set-github-secrets.js');
  process.exit(1);
}

async function getPublicKey() {
  return new Promise((resolve, reject) => {
    const req = https.request(`https://api.github.com/repos/${REPO}/actions/secrets/public-key`, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'User-Agent': 'Node-Secret-Manager',
        'Accept': 'application/vnd.github.v3+json'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', reject);
    req.end();
  });
}

async function setSecret(name, value, keyData) {
  await sodium.ready;
  const bkey = Buffer.from(keyData.key, 'base64');
  const bsec = Buffer.from(value);
  const encBytes = sodium.crypto_box_seal(bsec, bkey);
  const encrypted_value = Buffer.from(encBytes).toString('base64');

  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      encrypted_value,
      key_id: keyData.key_id
    });

    const req = https.request(`https://api.github.com/repos/${REPO}/actions/secrets/${name}`, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'User-Agent': 'Node-Secret-Manager',
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 201 || res.statusCode === 204) {
          console.log(`✅ Secret [${name}] successfully stored in GitHub Action Secrets.`);
          resolve(true);
        } else {
          console.error(`❌ Failed to set secret [${name}]: HTTP ${res.statusCode} ${data}`);
          resolve(false);
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function main() {
  const keyData = await getPublicKey();
  console.log('Retrieved GitHub repo public key:', keyData.key_id);

  const secrets = {
    DOMAIN_NAME: 'rabbiyosefmizrachifanpage.com',
    ORGANIZATION_NAME: 'CodeGenerationTechnologies',
    OWNER_EMAIL: 'NathanJosephAlard@gmail.com',
    DEPLOYMENT_TARGET: 'GitHub Pages + Cloudflare DNS Proxy',
    PRIMARY_OFFICIAL_LINKME: 'https://link.me/rabbiyosefmizrachi'
  };

  for (const [name, val] of Object.entries(secrets)) {
    await setSecret(name, val, keyData);
  }

  console.log('🎉 All GitHub Action Secrets verified!');
}

main().catch(console.error);
