#!/usr/bin/env sh
# abort on errors
set -e

# build
yarn run build

cp -R CNAME dist/
cp -R doc.md dist/

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:pzhello/pzhello.github.io.git master:gh-pages

cd -

# echo "# pzhello.github.io" >> README.md
# git init
# git add README.md
# git commit -m "first commit"
# git branch -M main
# git remote add origin https://github.com/pzhello/pzhello.github.io.git
# git push -u origin main

# git remote add origin https://github.com/pzhello/pzhello.github.io.git
# git branch -M main
# git push -u origin main