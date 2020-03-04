#!/usr/bin/env bash

docker build -t packsdkandroiddocker.image .;

bash pack_sdk_docker_run.sh ./compile.sh;
