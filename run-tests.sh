#!/usr/bin/env bash

deno test --config ./tsconfig.json \
  test/* \
  test/init-destroy-method/* \
  test/param/* \
  test/setter/* \
  lib/decorators/sealed/test/* \
  test/property/*
