# TrackRunnr [![Build Status](https://travis-ci.org/ZacBlanco/TrackRunnr.svg?branch=master)](https://travis-ci.org/ZacBlanco/TrackRunnr)

TrackRunnr was developed by Zac Blanco and Richard Ahn at HackRU in Spring of 2016.

The aim of _TrackRunnr_ is to build a modern, scalable web app for advanced runners to track and log their training. We've built the app from the bottom up using modern web technologies and good software engineering practice.

## Getting your own copy of TrackRunnr

TrackRunnr is open source! simply execute the `git clone` to get your own copy.

```bash
git clone https://github.com/ZacBlanco/TrackRunnr
```

## Developer Quick-Start Guide

Getting up and running with TrackRunnr on your local machine is simple. Unix is recommended. Windows may require extra configuration.

### Pre-Requisites

- [nodejs](http://nodejs.org/en/download) installed v5+
- [npm](http://nodejs.org/en/download) installed
- [MongoDB](https://www.mongodb.org) installed

Once you've got a copy of the repository using `git-clone` run the following command to install dependencies:

```bash
npm install
```

Now run the tests to make sure that the build works on your system:

```bash
npm test
```


If all the tests pass then your system is ready to begin devlopment! You can now start your own local copy with 

```bash
npm start
```