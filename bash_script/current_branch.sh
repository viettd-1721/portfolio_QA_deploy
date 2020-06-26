#!/bin/bash
set -e

cd ~/classi_portfolio
echo "$(git rev-parse --abbrev-ref HEAD | tail -n1) | $(git log -1 --pretty=format:'%h by %an')"
