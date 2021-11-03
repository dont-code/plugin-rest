#!/bin/sh
cd ../core/node
nx run core:build
cd ../../plugins
nx run sandbox:build --prod
nx run common:build --prod

cd ../plugin-rest
npm link ../core/node/dist/libs/core ../plugins/dist/libs/common ../plugins/dist/libs/sandbox
