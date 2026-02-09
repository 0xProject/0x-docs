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

Run the following command:

```bash
fern generate --docs
```

You will be prompted to log in and connect your GitHub account. 

You might also be prompted, `yes` or `no`, about if you want to proceed with generating docs and informed that you can choose between using the `--preview` flag or not. You can choose to use either `fern generate --docs` or `fern generate --docs --preview` at this time. This decision is important later, when you are making changes that might affect a production docs environment, but it won't impact your docs project now.

Once the documentation is generated, you will receive the URL where your documentation is published. For example:

```shell
┌─
│ ✓  your-company-name.docs.buildwithfern.com
└─
```

### Step 4: Preview your documentation
You can generate documentation previews

#### Generate previews from CLI

To preview updates to your documentation before publishing changes, run `fern generate --docs --preview`.

#### Configure PR previews

Your quickstart Fern project also includes GitHub Actions, including an action that enables generating previews in PRs. You don't need to update anything in the GitHub actions, but you do need to create a `FERN_TOKEN` auth token to enable them.

1. Open your GitHub repository and [create a new repository secret](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets#creating-secrets-for-a-repository).
2. For the **Name**, use `FERN_TOKEN`.
3. In your local terminal, run [`fern token`](https://buildwithfern.com/learn/cli-api-reference/cli-reference/commands#detailed-command-documentation) to generate an auth token value.
4. Copy the output from your terminal, and paste in GitHub as the **Value**.
5. Save your new secret.

You might need to re-run preview builds for any PRs that were opened before you configured the `FERN_TOKEN`.

For more information about built-in automation for previews and the `preview-docs.yml` GitHub action, see the [Previewing changes in a PR](https://buildwithfern.com/learn/docs/preview-publish/previewing-changes-in-a-pr#usage-in-github-actions) Fern docs.

### Step 5: Customize your documentation

You must run `fern generate --docs` after any modifications to re-generate and publish your documentation site.

To use your own OpenAPI specification file or to update the existing one:

- Update or replace the OpenAPI specification file in the `openapi/` folder.
- _Note: Don't have an OpenAPI spec? Use Fern's simpler format to define your API._ [_Learn more_](https://github.com/fern-api/docs-starter-fern-definition?utm_source=github&utm_medium=readme&utm_campaign=docs-starter-openapi&utm_content=step7).

To modify the other docs pages:

- Update the Markdown files located in the `docs/pages/` folder, such as `welcome.mdx`.

To modify site styles and navigation, or to add new pages:

- See [Writing Content](https://buildwithfern.com/learn/docs/content/write-markdown?utm_source=github&utm_medium=readme&utm_campaign=docs-starter-openapi&utm_content=step7).

To learn about Fern's built-in component library you can use within MDX files:

- See the [Component Library](https://buildwithfern.com/learn/docs/content/components/overview?utm_source=github&utm_medium=readme&utm_campaign=docs-starter-openapi&utm_content=step7).
