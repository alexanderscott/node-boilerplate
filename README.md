node-boilerplate  [![Build Status](https://secure.travis-ci.org/alexanderscott/node-boilerplate.png)](http://travis-ci.org/alexanderscott/node-boilerplate)
================
Boilerplate node.js project generator.  Bootstrap new node.js projects from pre-defined or default project boilerplates. 

[![NPM](https://nodei.co/npm/node-boilerplate.png?downloads=true)](https://nodei.co/npm/node-boilerplate/)

## Install
    

    npm install -g node-boilerplate


## Usage
To create myAwesomeProject from the default template:

    
    node-boilerplate /path/to/myAwesomeProject [options]


Project variables will be replaced by `myAwesomeProject` and project author variables will be replaced by values inside of your current user's ~/.gitconfig. 


### Project Templates
Project templates are stored in the package level directory, prefixed by `tpl-`.  Edit the default inside of `tpl/` or add your own.


To create your own project template, add a new template directory to the project root (ex/ `tpl-proxy`) and include template files which will be parsed and copied into bootstrapped projects.  The following variables will be replaced by user & project local variables: `PROJECT_NAME, PROJECT_AUTHOR_NAME, PROJECT_AUTHOR_EMAIL, PROJECT_AUTHOR_SITE, PROJECT_AUTHOR_GITHUB, PROJECT_DESCRIPTION`



## Test
Install dev dependencies after cloning the repo: 

    git clone git@github.com:alexanderscott/node-boilerplate.git && cd node-boilerplate
    NODE_ENV=development npm install
    npm test


## Contribute
Fork & pull request


## License

The MIT License (MIT)

Copyright (c) 2013-2014 Alex Ehrnschwender (alexehrnschwender.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

