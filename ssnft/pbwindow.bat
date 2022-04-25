:: copy 2 files
copy C:\Users\Administrator.SZ-20171008YJHA\Documents\GitHub\www\skyscraperNFT\ssnft\CNAME C:\Users\Administrator.SZ-20171008YJHA\Documents\GitHub\www\skyscraperNFT\ssnft\dist
copy C:\Users\Administrator.SZ-20171008YJHA\Documents\GitHub\www\skyscraperNFT\ssnft\Readme.md C:\Users\Administrator.SZ-20171008YJHA\Documents\GitHub\www\skyscraperNFT\ssnft\dist

:: navigate into the build output directory
cd dist

:: #if you are deploying to a custom domain
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:pzhello/pzhello.github.io.git master:gh-pages

cd ../
