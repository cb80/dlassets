![CI/CD](https://github.com/cb80/dlassets/workflows/CI/CD/badge.svg)

# Description

This action can download all release assets. It supports GitHub Enterprise.

# Examples
```
uses: cb80/dlassets@latest
with:
  tag: latest
  repo: org/repo
```

Use a different token:
```
uses: cb80/dlassets@latest
with:
  tag: latest
  repo: org/repo
  token: ${{ secrets.MY_TOKEN }}
```

# Inputs

| Option    | Use       | Default                | Description |
|-----------|-----------|------------------------|-------------|
| `tag`     | mandatory |                        | The tag which identifies the release. |
| `repo`    | optional  | `github.repository`    | The `owner/repo` where the release exists. |
| `to`      | optional  | `.`                    | The target directory for storing files. |
| `token`   | optional  | `secrets.GITHUB_TOKEN` | The token for authentication and authorization. |

# Credits

This action is inspired by the official [typescript action template][tstpl].

[tstpl]: https://github.com/actions/typescript-action
