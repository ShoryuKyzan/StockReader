#!/bin/bash

git pull
echo ''
echo '============================='
echo 'BUILD'
echo '============================='
echo ''
./prod-build.sh
echo ''
echo '============================='
echo 'DOWN'
echo '============================='
echo ''
./prod-down.sh
echo ''
echo '============================='
echo 'UP'
echo '============================='
echo ''
./prod-up.sh