#!/usr/bin/env bash

deno test --config ./tsconfig.json \
  test/* \
  test/init-destroy-method/* \
  test/param/* \
  test/property/*
