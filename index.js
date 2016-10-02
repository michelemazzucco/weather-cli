#!/usr/bin/env node

const argv = process.argv

if (argv.length > 2)
  console.log(argv.slice(2))
