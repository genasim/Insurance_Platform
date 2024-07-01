#!bin/sh

echo "Node version:"
node -v
echo "NPM version:"
npm -v
echo ""

cd /opt/safeins-frontend || exit 1

echo "-> Running: npm install"
npm install

echo "-> Running: npm start"
npm run dev