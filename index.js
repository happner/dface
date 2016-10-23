var os = require('os');

module.exports = function(spec) {

  if (!spec) return '0.0.0.0';

  if (spec == 'localhost') return;

  if (spec.match(/\./) || spec.match(/\:/)) return spec;

  var parts = spec.split('/');
  var device = parts[0];
  var ipVersion = parts[1];
  var aliasSeq = parts[2];
  var interface = os.networkInterfaces()[device];

  if (typeof interface == 'undefined') {
    throw new Error('no such interface ' + spec);
  }

  if (typeof ipVersion == 'undefined') {
    ipVersion = 'ipv4';
  } else {
    ipVersion = ipVersion.toLowerCase();
  }

  if (typeof aliasSeq == 'undefined') {
    aliasSeq = 0;
  } else {
    aliasSeq = parseInt(aliasSeq);
  }

  var typeSeq = 0;
  for (var i = 0; i< interface.length; i++) {
    if (interface[i].family.toLowerCase() !== ipVersion) continue;
    if (typeSeq == aliasSeq) return interface[i].address;
    typeSeq++;
  }

  throw new Error('no such interface ' + spec);
};
