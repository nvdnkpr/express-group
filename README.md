express-group
=============

Group express routes and middleware globally throughout your application to
DRYly structure your web applications.

All groups are shared globally throughout your application, so that each file
has access to all groups simply by requiring this module.


Setup
-----

Install with `npm install express-group` and then do `var group =
require('express-group');` in your express applications.


Usage
-----

### create groups

You can add functions to a named group with:

    group('index', function (req, res, next) {
      console.log('log request');
      next();
    });

    group('index', function (req, res, next) {
      console.log('check params');
      next();
    });

    group('index', function (req, res, next) {
      console.log('send response');
      res.send(200);
    });

### use groups

And then assign the whole group to a route with:

    app.get('/', group('index'));

Just be sure to always define params `req`, `res` and `next` and call `next()`
or send the response.

### group groups

You can also add existing groups to groups:

    // Create checkLogin group

    group('checkLogin', function (req, res, next) {
      console.log('check input parameters')
      next();
    });
    group('checkLogin', function (req, res, next) {
      console.log('load user object from database');
      next();
    });
    group('checkLogin', function (req, res, next) {
      console.log('check login')
      next();
    })


    // now add checkLogin to routes

    group('editProfile', group('checkLogin'));
    group('editProfile', function (req, res, next) {
      // user is logged in
      res.send(200);
    });

    group('adminArea', group('checkLogin'));
    group('adminArea', function (req, res, next) {
      // user is logged in
      res.send(200);
    });

### group middleware

`connect` and `express` middleware seamlessly integrates with `express-group`:

    group('parseRequest', express.query());
    group('parseRequest', express.bodyParser());

    group('processForm', group('parseRequest'));
    group('processForm', function (req, res, next) {
      // use the parsed request here
      next();
    });

### group arrays

The above example can also be written using arrays:

    group('parseRequest', [
      express.query(),
      express.bodyParser()
    ]);

    group('processForm', [
      group('parseRequest'),
      function (req, res, next) {
        // use the parsed request here
        next();
      }
    ]);

### dump groups

Calling `group()` without parameters will dump all registered groups.
