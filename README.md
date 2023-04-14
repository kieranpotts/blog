# Thoughts on the crafting of software

This repository holds the source files, build and deployment scripts for my personal blog.

## Documentation

### Requirements

To set up the local development environment for this project, the following software must installed locally:

- Node ≥ v14.15.0
- Yarn ≥ v1.22.0 installed globally (`npm install --global yarn`)

[NVM for Unix](https://github.com/nvm-sh/nvm) or [NVM for Windows](https://github.com/coreybutler/nvm-windows) makes it easier to switch between different versions of Node for different projects. NVM for Windows does [not support the `.nvmrc` file](https://github.com/coreybutler/nvm-windows/issues/388), so Windows users must specify the version number on the command line.

```cli
$ nvm use
```

```cli
$ nvm use 14.15.0
```

### Dependencies

This project has only development dependencies, which are defined in the repository-level `package.json` file.

To install the development dependencies, run:

```bash
yarn install
```

(Yarn is preferred to NPM for package management.)

### Run-scripts

The following run-scripts are available:

- `yarn run dev:serve` statically serves the contents of the `dist` directory using a server that closely approximates the production environment, for example by enabling Netlify redirects and custom headers. Live reload is not enabled for this server, since this environment is intended to closely approximate the production environment. The website is served from `localhost:8080`. Type `Ctrl`+`C` to stop the server.

There is no build step, so no run-scripts are required to automate this process. A Git-based workflows is used to automate deployment – see below.

### Git workflow

This repository has two mainline branches:

- `dev`
- `stable`

New blog posts are created in `feature/**` side branches, which are squash-merged into `dev` when ready for publication. Other changes may be committed directly to the `dev` branch.

Updates to the `stable` branch in the reference repository are automatically deployed via Netlify. Therefore, to deploy the latest changes in the `dev` branch, simply rebase `stable` on `dev` and push those changes into the upstream repository. It takes just a few seconds for the changes to go live.

```txt
git switch stable
git rebase dev
git push
```

-----

© Kieran Potts – [CC BY-SA 4.0](./LICENSE.txt)
