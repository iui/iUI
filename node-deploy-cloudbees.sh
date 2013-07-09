#!/bin/sh
set -x
mkdir -p target
rm -f target/node-web-app.zip
cd web-app
zip -r ../target/node-web-app.zip *
cd ..
bees app:deploy --appid node-demo -t node -RPLUGIN.SRC.node=https://s3.amazonaws.com/cloudbees-downloads/clickstack/node-clickstack.zip target/node-web-app.zip

