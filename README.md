# 0x Docs

This website is built using [Fern](https://buildwithfern.com/). 

---

## Requirements

- Node 18 or higher
- A [GitHub](https://github.com) account
- Knowledge of the command line

## Local Development


### Step 1: Install the CLI

Install the Fern Command Line Interface (CLI) by running:

```bash
npm install -g fern-api
```

### Step 2: Preview docs

The files and folders discussed in the following steps will be inside the `fern/` folder in your repository.

```bash
fern docs dev
```

### Step 3: Generate your documentation

If you need to resync the live docs and redeploy from local to prod, checkout your git repo locally, pull the latest from the `main` branch, and run the following command:

```bash
fern generate --docs
```

You will be prompted to log in and connect your GitHub account. 

You might also be prompted, `yes` or `no`, about if you want to proceed with generating docs and informed that you can choose between using the `--preview` flag or not. You can choose to use either `fern generate --docs` or `fern generate --docs --preview` at this time. This decision is important later, when you are making changes that might affect a production docs environment, but it won't impact your docs project now.

### Step 4: Preview your documentation
You can generate documentation previews

#### Generate previews from CLI

To preview updates to your documentation before publishing changes, run `fern generate --docs --preview`.

### Fern Docs
To modify site styles and navigation, or to add new pages:

- See [Writing Content](https://buildwithfern.com/learn/docs/content/write-markdown?utm_source=github&utm_medium=readme&utm_campaign=docs-starter-openapi&utm_content=step7).

To learn about Fern's built-in component library you can use within MDX files:

- See the [Component Library](https://buildwithfern.com/learn/docs/content/components/overview?utm_source=github&utm_medium=readme&utm_campaign=docs-starter-openapi&utm_content=step7).
