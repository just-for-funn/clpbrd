#!/bin/bash
set -o

ng build --configuration=azure

docker build . -t clpbrd