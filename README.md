[![Build Status](https://travis-ci.org/happner/dface.svg?branch=master)](https://travis-ci.org/happner/dface)

# dface

get ip address by interface

for when you want to listen on a particular interface but don't know what the ip address is going to be

eg. when spawning multiple ec2 instances from a pre-configured cloned image

`npm install dface`

```javascript

var dface = require('dface');

// so that you can still pass the usual host config through dface
dface(null) == '0.0.0.0';
dface(undefined) == '0.0.0.0';
dface('10.0.0.1') == '10.0.0.1';

// so that you can specify ip by interface/ip-version/alias-seq
dface('eth0') == '10.0.0.1';
dface('eth0/ipv4') == '10.0.0.1';
dface('eth0/ipv6') == '1111:a660:201:e6::4a4:a315';

dface('eth0/ipv4/0') == dface('eth0/ipv4') == dface('eth0'); // default
dface('eth0/ipv4/1') == '55.5.34.99'; // assuming eth0 has a second ip (alias)

dface('eth69/ipv4') THROWS Error('no such interface eth66/ipv4');
```

in case of confusion, see your interfaces

`node -e 'console.log(os.networkInterfaces())'`
