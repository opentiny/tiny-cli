# Tiny CLI
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

English | [简体中文](README.zh-CN.md)

> Tiny CLI is a powerful front-end engineering command line tool.

[Tiny CLI Website](https://opentiny.design/tiny-cli/home)


## Installation

Open git bash, zsh, and other command-line tools, type the following command, and press Enter：

```bash
npm i @opentiny/cli npminstall@3 -g
```

Wait for a while. After the installation is complete, run `$tiny -v` on the terminal. If the version information is displayed, the installation is successful.

Note: tiny-cli depends on the nodejs (12.x or later) and npm environments. Before installing Tiny CLI, ensure that nodejs and npm have been installed on the local host.

## Docs

* [CLI Tool Design Document](docs/tool-design.md)
* User Documentation
	* [Introduction to tiny-cli](docs/use-summary.md)
	* [Install tiny-cli](docs/use-install.md)
	* [Basic commands of tiny-cli](docs/use-cli.md)
	* [Using the tiny-cli toolkit](docs/use-toolkit.md)
	* [Using the tiny-cli plugin](docs/use-plugin.md)
	* [tiny-cli configuration file](docs/use-config.md)
* Developer Documentation
	* [tiny-cli API](docs/api.md)
	* [Toolkit development guide](docs/dev-toolkit.md)
	* [Plugin development guide](docs/dev-plugin.md)

## Usage

You can enter `$tiny -h` on the terminal to view the Tiny Help.

```bash
 tiny help info:  $ tiny [command] [options]

    $  tiny                     The help information is displayed. If a toolkit is used in the directory, the help information of the toolkit is also displayed.
    $  tiny init [toolkitName]  Initialization Kit
    $  tiny update [name]       Update module
    $  tiny list [type]         Plug-in list
    $  tiny i                   Installing the NPM Module
    $  tiny clear               Clear the local cache of Tiny.
    $  tiny help                Displays suite help information.
    $  tiny [name]              Other Invoking Plug-in Commands

   Options:

     -h, --help                Displays help information.
     -v, --version             Show Tiny Version


  Hint:
		Toolkits - To view help information about toolkits used in your project, execute this command in the project root directory.
		Plugins - To view the help information about the plugin, run the tiny [name] help command, for example, tiny git help.
```

### Quick start

The `@opentiny/tiny-toolkit-dev` toolkit is used as an example to describe the development process.


1. Initializing a project

	```bash
	# Create and enter the project folder
	$ mkdir my-project && cd $_
	
	# Initializing the Dev Development Environment
	$ tiny init dev
	```
	
3. Enable the local environment.

	```bash
	# Enabling the Dev Development Environment
	$ tiny start
	```

4. Compile and package the project.

	```bash
	$ tiny build
	```	

## ChangeLog

[CHANGELOG.md](CHANGELOG.md)

## Support

If problems occur during development and use, create issues in the code repository.

## Development Document

### Prerequisites

* Ensure that lerna has been installed: `npm install --global lerna`
* Ensure that the node version is v12.x or later.

### Local Development and Debugging Commands

Initialize：`npm run init`
Development：`npm run dev`
Build：`npm run build`
Verify: `npm run link`

### Build Process

Run the `npm run build` command in the root directory. The lib and dist directories are packed.


## Participating in contributions

If you are interested in our open source project, please join us!

Please read [Contribution Guide] (CONTRIBUTING.md) before participating in a contribution.

- Add the official assistant WeChat `opentiny-official` and join the technical exchange group.
- Join the mailing list opentiny@googlegroups.com

## License

[MIT](LICENSE)
## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/fengyon"><img src="https://avatars.githubusercontent.com/u/84690330?v=4?s=100" width="100px;" alt="fengyon"/><br /><sub><b>fengyon</b></sub></a><br /><a href="https://github.com/opentiny/tiny-cli/commits?author=fengyon" title="Documentation">📖</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!