import * as core from '@actions/core';
import * as github from '@actions/github';

const run = async function (): Promise<void> {
  try {
    const tag: string = core.getInput('tag');

    core.info(`Tag is: ${tag}`);
    const owner: string = core.getInput('owner');

    core.info(`Owner is: ${owner}`);
    const repo: string = core.getInput('repo');

    core.info(`Repo is: ${repo}`);
    core.info('Setting up Octokit');
    const token: string = core.getInput('token');
    const octokit = github.getOctokit(token);

    core.info(`Searching release by tag: ${tag}`);
    const { data: rel } = await octokit.rest.repos.getReleaseByTag({
      owner,
      repo,
      tag
    });

    core.debug(rel);
  } catch (ex: any) {
    core.setFailed(ex.message);
  }
};

run();
