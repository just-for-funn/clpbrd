#!/bin/bash
set -o

ng build

docker build . -t clpbrd