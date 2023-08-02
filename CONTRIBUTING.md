# Contributing

We are glad that you are willing to contribute to the TinyCLI open source project. There are many forms of contribution, and you can choose one or more of them according to your strengths and interests:

- Report [new defect](https://github.com/opentiny/tiny-cli/issues/new?template=bug-report.yml)
- Provide more detailed information for [existing defects](https://github.com/opentiny/tiny-cli/labels/bug), such as supplementary screenshots, more detailed reproduction steps, minimum reproducible demo links, etc.
- Submit Pull requests to fix typos in the document or make the document clearer and better
- Add the official assistant WeChat `opentiny-official` and join the technical exchange group to participate in the discussion.

When you personally use the TinyCLI component library and participate in many of the above contributions, as you become familiar with TinyCLI, you can try to do something more challenging, such as:

- Fix defects, you can start with [Good-first issue](https://github.com/opentiny/tiny-cli/labels/good%20first%20issue).
- Implement new features.
- Improve unit testing.
- Translate the document.
- Participate in code review.

## Bug Reports

If you encounter problems in the process of using TinyCLI components, you are welcome to submit Issue to us. Before submitting Issue, please read the relevant [official documentation](https://opentiny.design) carefully to confirm whether this is a defect or an unimplemented function.

If it is a defect, select [Bug report](https://github.com/opentiny/tiny-cli/issues/new?template=bug-report.yml) template when creating a new Issue. The title follows the format of `[toolkitName/pluginName/CliCore] defect description`. For example: `[tiny-toolkit-xxx] a xxx error was occurred after the 'tiny start' command was run by the xxx toolkit`.

Issue that reports defects mainly needs to fill in the following information:
- Version numbers of `tiny` and `node`.
- The performance of the defect can be illustrated by screenshot, and if there is an error, the error message can be posted.
- Defect reproduction step, preferably with a minimum reproducible demo link.

If it is a new feature, select [Feature request](https://github.com/opentiny/tiny-cli/issues/new?template=feature-request.yml) template. The title follows the format of `[toolkitName/pluginName/CliCore] new feature description`. For example: `[CliCore] added the switch command to support switching of the NPM source`.

The following information is required for the Issue of the new feature:
- What problems does this feature mainly solve for users?
- What is the api of this feature?

## Pull Requests

Before submitting pull request, please make sure that your submission is in line with the overall plan of TinyVue. Generally, issues that marked as [bug](https://github.com/opentiny/tiny-cli/labels/bug) are encouraged to submit pull requests. If you are not sure, you can create a [Discussion](https://github.com/opentiny/tiny-cli/discussions) for discussion.

Local startup steps:

- Click the Fork button in the upper right corner of the [TinyCLI](https://github.com/opentiny/tiny-cli) code repository to Fork the upstream repository to the personal repository.
- Clone personal repository to local.
- Run `npm init` under the TinyCLI root directory to install node dependencies.
- Run `npm run dev` to launch the local website for develop.

```shell
# You need to replace username with your own user name
git clone git@github.com:username/tiny-cli.git
cd tiny-cli
git remote add upstream git@github.com:opentiny/tiny-cli.git
npm i

# Launch
npm run dev
```

To submit a PR:

- Create a new branch `git checkout -b username/feature1`. The name of the branch should be `username/feat-xxx` / `username/fix-xxx`.
- Local coding.
- Submit according to [Commit Message Format](https://www.conventionalcommits.org/zh-hans/v1.0.0/) specification. PR that do not conform to the submission specification will not be merged.
- Submit to remote repository: `git push origin branchName`.
- (Optional) Synchronize upstream repository dev branch latest code: `git pull upstream dev`.
- Open the [Pull requests](https://github.com/opentiny/tiny-cli/pulls) link of the TinyCLI code repository and click the New pull request button to submit the PR.
- Project Committer conducts Code Review and makes comments.
- The PR author adjusts the code according to the opinion. Please note that when a branch initiates PR, the subsequent commit will be synchronized automatically, and there is no need to resubmit the PR.
- Project administrator merges PR.

The contribution process is over, thank you for your contribution!

## Join OpenTiny community

If you are interested in our open source project, you are welcome to join our open source community in the following ways.

- Add official assistant WeChat: opentiny-official to join our technical exchange group.
- Add to the mailing list: opentiny@googlegroups.com
