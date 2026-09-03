# Adding New Projects

This portfolio uses an automated pipeline to scrape project context from GitHub and draft high-quality descriptions and highlights, saving you from writing boilerplate.

When you want to add a new project (or batch of projects) to the portfolio in the future, follow this process:

## Step 1: Create the Base Record
First, the project needs a baseline record in the database.
You can create this via SQL or Prisma Studio. The only required fields are the slug, title, and setting your GitHub URL(s).
*If it's a featured case study, ensure `isFeatured` is set to `true`. If it's a UI template, ensure the slug ends with `-template`.*

## Step 2: Fetch Repository Data
Run the scraping script to fetch the latest `package.json`, `README.md`, and `schema.prisma` from the project's GitHub repos using the GitHub Contents API.

```bash
npx tsx scratch/fetch-repo-data.ts
```
*Note: This script requires a valid `GITHUB_TOKEN` in your `.env` file with read access to the repos.*

This will output a `scratch/project-repo-data.json` file containing the raw data.

## Step 3: Generate Drafts
Run the drafting script to parse the raw data and generate formatted descriptions and highlights.

```bash
npx tsx scratch/draft-repo-data.ts
```

This script connects to your database to check the `isFeatured` flag and the project slug, categorizing the output:
- **Templates (`-template`)**: Automatically receive an honest one-liner description based on their tech stack, with no extra highlights.
- **Featured Projects**: Leave the `fullDescription` and `highlights` empty for you to write manually, but correctly flags them as `"low_confidence": true`.

The output is saved to `scratch/project-drafts.json`.

## Step 4: Manual Review & Editing
Open `scratch/project-drafts.json` and review the generated content.
- Search for `"low_confidence": true`.
- Fill in the missing `fullDescription` (Problem and Approach, separated by `\n\n`) and the missing `highlights` for your featured projects.
- Ensure no `[` or `]` placeholder brackets remain in the file.

## Step 5: Inject to Database
Run the injection script to push the finalized drafts into your live database.

```bash
npx tsx scratch/inject-repo-data.ts
```
This script includes a safety gate that will halt if it detects any unfinished placeholders in the JSON file. Once it succeeds, your new projects are live on the portfolio!
