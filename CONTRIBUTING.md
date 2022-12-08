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

### 8. Visit the preview build
After the pull request has been opened, [Vercel](https://vercel.com/) will automatically deploy a preview build which can be accessed to see how your added changes would look and function in the final build. Take a minute to test it for any bugs.

## I18n - Internationalization and localization

We want the tracker to be as easy to use as possible and have therefore added support for different languages, hopefully making it more easy to understand.

All languages are welcome and to contribute a new language just follow these steps:

1. Follow steps 1-4 above to get the tracker running locally.
2. Create a new `.json` file in `./src/i18n/locales/` with the desired locale.
3. Copy the contents of the `en-US.json` file in the same directory.
4. Translate all values to the desired language.
5. Add your new locale file in [./i18n/locales.js](https://github.com/carlssonemil/orion/blob/main/src/i18n/locales.js):
```javascript
import enUs from './locales/en-US.json'
import svSE from './locales/sv-SE.json'
// import [locale] from './locales/[locale].json'

export default {
	'en-US': enUs,
	'sv-SE': svSE,
  // '[locale]': [locale]
}
```
6. Follow steps 6-8 above to finalize your contribution.

We use the [flag-icons](https://flagicons.lipis.dev/) library by [lipis](https://github.com/lipis) for the flags, so make sure that your locale has a supported flag in the library.

## Camouflage images

If you want to help contribute some images for the camouflages, the process is the same as described above but with a few preferable additions:

* The images should be in 1x1 format (perfectly squared, or close enough).
* No borders or background behind the camouflage, just the camouflage itself.
* The naming of the files should follow the [slug-format](https://en.wikipedia.org/wiki/Clean_URL#Slug) (`Desert Hybrid` -> `desert-hybrid`).
* The files should preferably be in `.png` file format.
* Place the files in the `./public/assets/camouflages` folder.

If you don't have access to any image editing software (besides Paint), [Photopea](https://www.photopea.com/) is an amazing and completely free Photoshop alternative. I will also happily accept any images, or in-game screenshots, of the camouflages on my email ([hello@emilcarlsson.se](hello@emilcarlsson.se)) and I can edit and add them to the site myself!

### 

### 

## License

By contributing your code, you agree to license your contribution under the [MIT License](https://github.com/carlssonemil/orion/blob/main/LICENSE).