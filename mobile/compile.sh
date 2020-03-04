#!/usr/bin/env bash
set -xeuo pipefail

# pwd; ls;
cd android
./gradlew clean
./gradlew assembleRelease
