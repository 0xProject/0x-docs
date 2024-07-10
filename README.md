# (Deprecated) 0x Docs

> [!WARNING] 
> This repo is no longer maintained, and has been replaced by https://github.com/0xProject/0x-labs/tree/main/sites/0x-docs
> This was previously the repo for that served `https://0x.org/docs/`. 

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

Then run this command to serve the website locally:

```
$ yarn serve
```

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
