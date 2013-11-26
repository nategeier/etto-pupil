# engo-pupil

### Temporary Manual Deployment Steps

```sh
# Clone repo and install dependencies
$ git clone git@github.com:nategeier/engo-pupil.git
$ cd engo-pupil
$ npm i
$ bower i

# Rebuild dist using Grunt
$ grunt build

# Remove old deployed dist (now engo-pupil)
$ sudo rm /usr/share/nginx/html/engo-pupil -rf

# Deploy newly rebuilt dist
$ sudo cp -r dist /usr/share/nginx/html
$ sudo mv /usr/share/nginx/html/dist /usr/share/nginx/html/engo-pupil
```

