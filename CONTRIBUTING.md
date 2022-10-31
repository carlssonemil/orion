# Contributing
Your contribution is greatly appreciated and I hope this document helps you along the way. If you have any questions or problems, don't hesitate to send me an email. ([hello@emilcarlsson.se](mailto:hello@emilcarlsson.se)).

## Pull request process

### 1. Fork this repository.
Fork this repository by clicking on the fork button on the top of this page. This will create a copy of this repository in your account.

### 2. Clone the repository
Now clone the forked repository to your machine. Go to your GitHub account, open the forked repository, click on the clone button and choose a way of cloning. If you go with the HTTPS option, it will look like this:
```bash
git clone https://github.com/[your username]/orion.git
```

### 3. Create a branch
First change to the repository directory on your computer (if you're not already there):
```bash
cd orion
```
Create a branch using the `git checkout` command:
```bash
git checkout -b <add-your-new-branch-name>
```
The branch name can be whatever you want, but try to keep it relevant to what you are changing, or adding.

### 4. Get the project running locally
> Make sure you have [Node.js](https://nodejs.org/) (v.16+) installed before continuing.

Run the following commands in the terminal:
```bash
# Install dependencies
$ npm install

# Compiles and hot-reloads for development
$ npm run dev
```
Follow the given localhost URL in the terminal and you should be up and running.

### 5. Make necessary changes and commit those changes
Fix what you intended to fix and commit the changes to the branch you created earlier.

### 6. Push changes to GitHub
Push your changes using the command `git push`:
```bash
git push origin <your-branch>
```

### 7. Submit your changes for review
If you go to your repository on GitHub, you'll see a `Compare & pull request` button. Click on that button and open a new pull request with your changes.


## License

By contributing your code, you agree to license your contribution under the [MIT License](https://github.com/carlssonemil/orion/blob/main/LICENSE).