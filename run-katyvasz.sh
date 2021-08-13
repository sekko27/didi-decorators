#!/usr/bin/env bash

deno test --config ./tsconfig.json --unstable \
  test/integration/KatyvaszTest.ts
