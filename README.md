# Puck Tracker

Website for sample tracking at the MX beamlines. Powered by react, redux and bootstrap.

[![Build Status](https://travis-ci.org/AustralianSynchrotron/pucktracker-client.svg?branch=master)](https://travis-ci.org/AustralianSynchrotron/pucktracker-client) [![Coverage Status](https://coveralls.io/repos/AustralianSynchrotron/pucktracker-client/badge.svg?branch=master&service=github)](https://coveralls.io/github/AustralianSynchrotron/pucktracker-client?branch=master)

## Installation

Requirements:

* nodejs v5 (webpack build fails under node v6 and later)

```
npm install -g yarn
npm_config_python=python2.7 yarn  # Install dependencies
cp config.example.js config.js  # Customise if needed
```

## Running

```
yarn start
```

[pucktracker-server](https://github.com/AustralianSynchrotron/pucktracker-server) must be started separately.

## Testing

```
yarn test
```
