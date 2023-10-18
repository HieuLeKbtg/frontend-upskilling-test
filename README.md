# AgriCart Web

Web app built using NX and NextJS.

## Dev Setup

### Prerequisites

#### Run MongoDB

```
# run via docker
docker run \
-d \
-p 27017:27017 \
--name agricart-mongodb \
mongo:latest
```

#### Useful tools

1. MongoDB client (e.g. Compass)

### Clone repo

```
# clone repo
git clone {REPO_URL}

# cd into repo
cd {REPO_NAME}

# install dependencies
npm install

# open in your IDE
```

### Generate seed data

There is a script in the `/tools` directory that we can run.
```
# set env variable for script
export MONGODB_URI=mongodb://localhost:27017/agri-cart

# run script
npx ts-node tools/data/scripts/write-json-to-mongo.ts
```

### Run demo app

For the purpose of this exercise, we will run apps using the NX CLI.

See NX documentation for more details: https://nx.dev/getting-started/intro

1. Create a root `.env` file and set the DB env variable:
```
MONGODB_URI=mongodb://localhost:27017/agri-cart
```

2. Now we are ready to run the demo app.
```
# run demo app
npx nx serve demo-app
```

3. Visit http://localhost:4200 and verify that the app is running

4. Visit http://localhost:4200/api/farms and verify that you are getting a non-empty JSON response

Congrats! You are now ready to start developing :D

## Important considerations

### NX

#### Development
For the sake of this exercise, we will serve apps on different ports. This means if you have 2-3 apps as part of one-front end, you can navigate from one to the other using different ports. Example:

1. App 1: localhost:4200
1. App 2: localhost:4201
1. App 3: localhost:4203

#### CLI

Helpful commands:
1. Generate new app: `npx nx @nx/next:app my-new-app`
1. Generate new library: `npx nx @nx/next:lib my-new-lib`
1. Generate new component for library: `npx nx @nx/next:component my-new-component --project=my-new-lib`

### Cypress

You can open the cypress app to view and run tests using: `npx cypress open`

Helpful commands:
1. Run E2E test via NX: `npx nx e2e my-new-app-e2e`
1. Run unit tests via NX: `npx nx test my-new-app`

## Git Workflow

For this exercise we will be using stacked pull requests, which means each PR will depend on the previous PR. See sample flow below.

Please make sure each PR is descriptive and includes relevant context as well as any screenshot or verification of the resulting changes. Example content:
1. Context (brief summary of context/motivation for the changes)
2. Changes (brief summary of what changes you made)
3. Demo / screenshots (evidence that the changes are working as intended)

Sample git flow
```
// checkout branch for first exercise
git checkout -b branch-1

// make changes and commit(s)
git add --all
git commit
git push origin branch-1

// go to github and make a PR with master as the base

// checkout branch for second exercise
git checkout -b branch-2

// make changes and commit(s)
git add --all
git commit
git push origin branch-2

// go to github and make a PR with branch-1 as the base

// repeat for next branches...
```

At the end you should have PRs that are stacked like this:
* PR x (branch 5 <- branch x)
* PR 5 (branch 4 <- branch 5)
* PR 4 (branch 3 <- branch 4)
* PR 3 (branch 2 <- branch 3)
* PR 2 (branch 1 <- branch 2)
* PR 1 (master <- branch 1)

## Time Execution Tracking

Please add your planned working dates here (Mon - Fri).

### Actual dates
| date    | Start    | Stop    |
| -------- | ------- | ------- |
| 2023-10-18 | 9.am | 18.pm |
| 2023-10-19 | 9.am | 18.pm |
| 2023-10-20 | 9.am | 18.pm |
| 2023-10-23 | 9.am | 18.pm |
| 2023-10-24 | 9.am | 18.pm |

### Sample dates
|date|
|-|
|2023-10-18|
|2023-10-19|
|2023-10-20|
|2023-10-23|
|2023-10-24|
