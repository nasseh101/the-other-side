set -e

npm run build

cd dist

git init
git add -A
git commit -m 'New Deployment'
git push -f git@github.com:nasseh101/the-other-side.git master:gh-pages

cd -