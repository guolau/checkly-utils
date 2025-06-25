# About
A collection of Checkly utility scripts. This repository is not officially maintained by Checkly — use at your own risk!

# Getting started
1. Set your API key and target account ID as environment variables in a `.env` file. See `.env.example` for the required env variables.

2. Install NPM packages

```
npm install
```

# Available scripts

## Clean up alert channels
```
npx tsx clean-up-alert-channels.ts <filename>
```
Arguments:
- `filename`: Basic info about each deleted alert channel will be written to this file.
- `--dry-run`: Don't delete any alert channels. Helpful for checking to see what alert channels would be deleted, before actually deleting anything.

Example usage:
```
npx tsx clean-up-alert-channels.ts output/deleted-alert-channels.csv --dry-run
```