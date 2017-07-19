# Junior Usca Huacasi

## My Resume CV

## Introduction
Using NODE insted of C++

Because NODE can interprate the code of files.

## Build
```
docker build -t juscah/resume .
docker run --rm -ti -v resume-cv:/data juscah/resume sh

npm run build
npm run watch
```