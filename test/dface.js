var path = require('path');
var filename = path.basename(__filename);
var should = require('should');

var dface = require('../');

var os = require('os');
var eth = 'eth0';

if (os.platform() == 'darwin') eth = 'en0';
else if (os.platform() == 'win32') eth = '???';

describe(filename, function() {

  it('returns 0.0.0.0 on null', function() {
    dface(null).should.equal('0.0.0.0');
  });

  it('returns 0.0.0.0 on undefined', function() {
    dface(null).should.equal('0.0.0.0');
  });

  it('returns the passed ipv4 address', function() {
    dface('10.0.0.1').should.equal('10.0.0.1');
  });

  it('returns the passed ipv6 address', function() {
    dface('1111:a660:201:e6::4a4:a315').should.equal('1111:a660:201:e6::4a4:a315');
  });

  it('throws on no such interface', function() {
    try {
      dface('eth69');
    } catch (e) {
      e.message.should.equal('no such interface eth69');
    }
  });

  it('gets ipv4 address with default alias an case insensitive family', function() {
    var ip = dface(eth + '/ipv4');
    ip.should.equal( dface(eth + '/IpV4/0'));
    ip.should.match(/\./);
  });

  it('gets ipv6 address with default alias an case insensitive family', function() {
    var ip = dface(eth + '/ipv6');
    ip.should.equal( dface(eth + '/IpV6/0'));
    ip.should.match(/\:/);
  });

  it('throws on no such alias', function() {
    try {
      dface(eth + '/ipv4/10');
      throw new Error('should not get here');
    } catch (e) {
      e.message.should.equal('no such interface ' + eth + '/ipv4/10');
    }
  });

});
