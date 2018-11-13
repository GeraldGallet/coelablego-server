# coelablego-server's git
This is the repository for the server part of the Co-Elab project of an automatic robot used to sort Lego pieces.

## Setup guide
You will need to install the Visual Studio Build Tools in order to use the package *opencv4nodejs*. To do so, run an administrator cmd and run :
```
$ npm install --global windows-build-tools
```

The command can be quite long. Once it is over, go to C:/Users/you/.windows-build-tools and run, as an admin, the program *vs_BuildTools.exe*. Then again, it can be quite long. When it's over, reopen a cmd, go to this directory and run :
```
$ npm install --save opencv4nodejs
```
To do so, you will need some commands that don't usually exist in the Windows cmd :
- cd
- git
- cmake
