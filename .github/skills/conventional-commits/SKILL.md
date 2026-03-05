---
name: conventional-commits
description: Guidelines for writing clear, consistent, and informative Git commit messages in the Vincy Portfolio project. This skill should be used whenever creating commit messages for new work, bug fixes, refactoring, or any changes to the codebase. It covers the conventional commit format, best practices for message structure, and examples of good commit messages.
---

# Git Commit Message Guidelines

## Overview

Clear and consistent Git commit messages are essential for maintaining a readable project history, facilitating collaboration, and enabling tools that rely on commit metadata (like changelog generators). This guide outlines the conventions and best practices for writing commit messages in the Vincy Portfolio project.

## Conventional Commits Format

The Vincy Portfolio project follows the Conventional Commits specification (https://www.conventionalcommits.org/en/v1.0.0/). This format provides a standardized way to structure commit messages, making it easier to understand the intent of changes and automate release processes.

### Format

```<type>[optional scope]: <description>
[optional body]
[optional footer(s)]
```

### Types

- `feat`: A new feature for the user.
- `fix`: A bug fix for the user.
- `docs`: Documentation only changes.
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).
- `refactor`: A code change that neither fixes a bug nor adds a feature.
- `perf`: A code change that improves performance.
- `test`: Adding missing tests or correcting existing tests.
- `chore`: Changes to the build process or auxiliary tools and libraries such as documentation generation.
- `revert`: Reverts a previous commit.
