var should = require('should'),
    group = require('..');

describe('group()', function () {
  it('has a shared registry', function () {
    var group1 = require('..'),
        group2 = require('..'),
        key = 'a',
        entry = function () {};

    group1(key, entry);
    group1(key).should.equal(group2(key));
  });

  it('returns the current group content after adding an element', function () {
    var entry = function () {};
    group('test', entry).should.eql([entry]);
  });

  it('returns the group registry when invoked without params', function () {
    var registry = group();
    registry.should.have.keys(['test', 'a']);
  });

  it('accepts functions as value', function () {
    group('my', function () {});
  });

  it('accepts arrays with functions as value', function () {
    var a = function () {},
        b = function () {};

    group('my', [a, b]);
  });

  it('accepts other groups as value', function () {
    group('my', group('test'));
    group('my', group('my'));
  });
});
