# ssnft

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve

or 
# 忽略报错
yarn dev --fix

```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Run your end-to-end tests
```
yarn test:e2e
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### deploy shell
```
#!/usr/bin/env sh
# abort on errors
set -e

# build
yarn run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:pzhello/skyscraper.git master:gh-pages

cd -
```
#### Tips
```
# deploy to gh-pages
$ yarn deploy

# 二级目录无法访问
# 主要原因是root路由造成，
# 把路由改造一下，/二级目录/
# { path: '/skyscraper', redirect: { name: 'Home' } }, // 重定向

```