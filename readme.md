# About
A collection of Checkly utility scripts. This repository is not officially maintained by Checkly — use at your own risk!

# Usage
Set your API key and target account key as environment variables in a `.env` file. You can copy from `.env.example` and fill in each variable.


To run a script:
```
npx tsx <filename>
```

For example, to clean up alert channels, you can run:
```
npx tsx clean-up-alert-channels.ts
```