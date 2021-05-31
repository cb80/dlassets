import fs from 'fs';
import path from 'path';
import * as core from '@actions/core';
import * as github from '@actions/github';

const run = async function (): Promise<void> {
  try {
    const tag: string = core.getInput('tag');
    const ownerRepo: string = core.getInput('repo');
    const dir: string = core.getInput('to');
    const elements = ownerRepo.split('/');
    const owner = elements[0];
    const repo = elements[1];

    core.info(`Tag is: ${tag}`);
    core.info(`Owner is: ${owner}`);
    core.info(`Repo is: ${repo}`);
    core.info(`Target dir is: ${dir}`);
    core.info('Setting up Octokit');
    const token: string = core.getInput('token');
    const octokit = github.getOctokit(token);

    core.info(`Searching release by tag: ${tag}`);
    const { data: rel } = await octokit.rest.repos.getReleaseByTag({
      owner,
      repo,
      tag
    });

    core.debug(JSON.stringify(rel));
    const errorHandler = function (err: any): void {
      if (err) {
        throw err;
      }
    };

    fs.mkdir(dir, { recursive: true }, errorHandler);
    for (const { name, id } of rel.assets) {
      const trg = path.resolve(dir, name);

      core.info(`Downloading ${name} to ${trg}`);
      const resp = await octokit.rest.repos.getReleaseAsset({
        headers: {
          Accept: 'application/octet-stream'
        },
        owner,
        repo,
        asset_id: id
      });

      core.debug(JSON.stringify(resp));
      const file = fs.createWriteStream(trg);

      file.write(Buffer.from(resp.data as unknown as string));
      file.end();
    }
  } catch (ex: any) {
    core.setFailed(ex.message);
  }
};

run();
