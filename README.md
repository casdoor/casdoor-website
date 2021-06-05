# [casdoor.org](https://casdoor.org/)

The site configuration and documentation powering Casdoor's website: https://casdoor.org

## Getting started

### Prerequisites

1.  Git
1.  Node: install version 6.2.2 or greater. Node v14 would be ideal.
1.  Yarn: See [Yarn Installation](https://yarnpkg.com/lang/en/docs/install/)

### Installation

1.  `git clone https://github.com/casdoor/casdoor-website` to download source code.
1.  `cd casdoor-website` to go into the project root.
1.  `yarn install` to install the website's npm dependencies (or `npm install`, if not using Yarn).

### Running locally

1.  `yarn start` to start the development server (powered by Docusaurus) (or `npm start`, if not using Yarn).
1.  open `http://localhost:3000/` to open the site in your favorite browser.

### Publish manually (optional)

Whenever a new commit lands in `master`, the change will be automatically published to: https://casdoor.org. 

# Overview

If you're here because you would like to contribute an edit or addition to the docs, you'll probably want to take a look at the `docs/` directory.

To edit the internals of how the site is built, you may want to get familiarized with how the site is built. The Casdoor website is a static site generated using [Docusaurus](https://docusaurus.io). This directory is the frame of casdoor website. Visit the Docusaurus website to learn more about all the available configuration options.

## Directory structure

The following is a high-level overview of relevant files and folders.

```
casdoor-website/
├── docs/
│   ├── assets/
│   ├── overview.md
│   └── ...
├── blog/
│   ├── assets/
│   └── ...
├── src/
|   ├── pages/
|   │   └── en/
|   │       ├── ...
|   │       ├── index.js
|   │       └── ...
|   ├── css/
|   |	└── custom.css
|   └── components/
|    	├── HomepageFeature.js
|    	└── ...
├── static/
│   └── img/
├── packages.json
├── sidebars.js
├── docusaurus.config.js
├── babel.config.js
└── versions.json
```

## Documentation sources

As mentioned above, the `docs/` folder contains the source files for all of the docs in the Casdoor website. In most cases, you will want to edit the files within this directory. If you're adding a new doc or you need to alter the order the docs appear in the sidebar, take a look at the `sidebars.js`. The sidebars file contains a list of document ids that should match those defined in the header metadata (aka frontmatter) of the docs markdown files.

## Website configuration

The main config file for the website can be found at `docusaurus.config.js`. This file tells Docusaurus [how to build the website](http://docusaurus.io/docs/en/site-config.html). Edits to this file are rarely necessary.

The `src/pages/` subdirectory contains the Casdoor components that make up the
non-documentation pages of the site, such as the homepage.

## Contributing

### Create a branch

1.  `git checkout master` from any folder in your local `casdoor-website` repository.
1.  `git pull origin master` to ensure you have the latest main code.
1.  `git checkout -b the-name-of-my-branch` (replacing `the-name-of-my-branch`
    with a suitable name) to create a branch.

### Make the change

1.  Follow the [Running locally](#running-locally) instructions.
1.  Save the files and check in the browser. Some changes may require a server restart.
1.  Changes to `/docs` will only be visible in the latest version of the documentation (master).

### Test the change

1.  If possible, test any visual changes in all latest versions of common
    browsers, on both desktop and mobile.

### Push it

1.  Run `yarn prettier` to ensure your changes are consistent with other files in
    the repo
1.  `git add -A && git commit -m "My message"` (replacing `My message` with a
    commit message, such as `Fixed header logo on Android`) to stage and commit
    your changes
1.  `git push my-fork-name the-name-of-my-branch`
1.  Go to the [casdoor-website repo](https://github.com/casdoor/casdoor-website) and you should see recently pushed branches.
1.  Follow GitHub's instructions.
1.  If possible, include screenshots of visual changes.

---

## Translation

[Crowdin](https://crowdin.com/project/casdoor) is used for Casdoor website's translation. You can contribute to the translation of your proficient languages on that.

### Build the translation project locally
Please contact the Casdoor team for manager access on Crowdin.

### Manually trigger Crowdin [DEPRECATED]

- Install Crowdin CLI:

https://support.crowdin.com/cli-tool/

- Setup environment variable:

```
CROWDIN_PERSONAL_TOKEN = XXX
```

- Upload:

```
yarn run crowdin upload
```

- Download:

```
yarn run crowdin download
```

## License

Casdoor is [Apache licensed](./LICENSE).