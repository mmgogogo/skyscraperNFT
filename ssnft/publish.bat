:: deploy windows

:: build app
yarn run build

cp -R CNAME dist/
cp -R doc.md dist/

:: navigate into the build output directory
cd dist

:: #if you are deploying to a custom domain
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:pzhello/pzhello.github.io.git master:gh-pages

cd ../