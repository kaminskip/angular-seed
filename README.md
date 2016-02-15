Sample angular js app
===============================

The purpose of this project is to help you get started with Angular JS.

## Prerequisites

- NodeJS 5.6 or higher (include Node Package manager [NodeJS])
- Bower (install form node package manager (npm), manage application frontend components)
- Gulp (install fom node package manager (npm), run tasks)


### Node

Download from [NodeJS] and install

Setup proxy

```sh
$ npm install
```

Run from project base dir to upload node modules

```sh
$ npm config set proxy http://<login>:<pass>@<proxy_address>:<proxy_port>
$ npm config set https-proxy https://<login>:<pass>@<proxy_address>:<proxy_port>
```

### Bower

Global installation
```sh
$ npm install -g bower
```

Setup proxy by adding in [.bowerrc][bowerrc] file

```js
{
  "directory": "bower_components",
  "proxy": "http://<login>:<pass>@<proxy_addres>:<proxy_port>/",
  "https-proxy": "https://<login>:<pass>@<proxy_address>:<proxy_port>/"
}
```

Upload packages

```sh
$ bower install
```

### Gulp

Global installation
```sh
$ npm install -g node
```


## Build

//TODO


## Resources

* [NodeJS]
* [AngularJS]
* [Bower]
* [Gulp]


[NodeJS]: <https://nodejs.org>
[AngularJS]: <http://angularjs.org>
[Bower]: <http://bower.io/>
[Gulp]: <http://gulpjs.com>
[bowerrc]: <.bowerrc>