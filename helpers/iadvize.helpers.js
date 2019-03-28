const https = require('https');
const querystring = require('querystring');
require('dotenv').config();

class IAdvizeHelpers {
  // Retrieve the OAuth token from the GraphQL API
  retrieveToken() {
    const query = querystring.stringify({
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      grant_type: 'password'
    });
    const options = {
      host: 'api.iadvize.com',
      path: '/oauth2/token',
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }

    return this.makeRequest(options, query);
  }

  // Make the GraphQL request to fetch the distribution rules
  retrieveRoutingRule(token) {
    const options = {
      host: 'api.iadvize.com',
      path: '/graphql' + '?access_token=' + token,
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      }
    }
    const body = {
      "query": "query GetRoutingRules($websiteIds: [LegacyId!]) { routingRules(websiteIds: $websiteIds) { id } }",
      "variables": {
        "$websiteIds": []
      }
    }

    return this.makeRequest(options, body);
  }

  // Make the HTTP request, wrapped in a Promise
  makeRequest(options, body) {
    return new Promise((resolve, reject) => {
      const req = https.request(options, res => {
        let data = '';

        res.on('data', chunk => {
          data += chunk;
        });

        res.on('end', () => {
          resolve(data);
        });
      });

      req.on('error', err => {
        reject(err);
      });

      // If the Content-type is urlencoder (not JSON) use body.toString()
      if (options.headers["Content-Type"] === "application/x-www-form-urlencoded") {
        req.end(body.toString());
      } else {
        req.end(JSON.stringify(body));
      }
    });
  }
}

module.exports = IAdvizeHelpers;