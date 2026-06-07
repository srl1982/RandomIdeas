const dns = require('node:dns');

dns.setServers(['8.8.8.8', '1.1.1.1']);

dns.resolveSrv(
  '_mongodb._tcp.cluster0.uwl9kgs.mongodb.net',
  (err, addresses) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(addresses);
  },
);
