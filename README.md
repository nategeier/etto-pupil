etto-pupil
================================================================================

### Temporary Manual Deployment Steps

```sh
# Clone repo and install dependencies
$ git clone git@github.com:nategeier/etto-pupil.git
$ cd etto-pupil
$ npm i
$ bower i

# Rebuild dist using Grunt
$ grunt build

# Remove old deployed dist (now etto-pupil)
$ sudo rm /usr/share/nginx/html/etto-pupil -rf

# Deploy newly rebuilt dist
$ sudo cp -r dist /usr/share/nginx/html/etto-pupil/
```

Grunt Tasks
--------------------------------------------------------------------------------

### Default

Main test/integration command

### Serve

    grunt serve

### Throttling for UX testing

Testing dev environment:

```sh
grunt serve:throttle
```

Testing dist:

```sh
$ grunt build
$ grunt serve:throttledist
```
