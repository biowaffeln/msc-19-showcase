# MSc '19 Showcase

<!---
#### ⚠️ When sending subsequent pull requests, be sure to [rebase](https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase#:~:text=What%20is%20git%20rebase%3F,of%20a%20feature%20branching%20workflow.) your branch, as I might have made some corrections to your file in the meantime. This will prevent merge conflicts.
-->

## Adding your project

Clone the repository with: `git clone https://github.com/moritzsalla/msc-19-showcase.git`

You can add your project by populating the `index.md` in your `src/markdown-pages/your-name` directory.

```
markdown-pages
└── your-name
    ├── index.md
    ├── image1.jpg
    ├── image2.jpg
    ├── image3.jpg
    └── image4.jpg
```

If you wish to spin up a development server, run `yarn install && yarn run develop`. This step is optional but will help you see the changes you made.

**Your markdown's frontmatter should include a slug, artist name, project title, thumbnail URL and description.** The slug is already filled out, no need to change it.

```
---
slug: "/aleksi-halttunen"
artist: "Aleksi Halttunen"
title: "Example Project"
thumbnail: "./thumbnail.jpg"
description: "A small sub header of what the project is so people can have a quick overview"
---

# Example Project

Type away…
```

For the rest, treat the file as you'd treat a Github README. You can add text, quotes, images…whatever suits your needs. **Unlike Github, the website will display video embeds**.

When adding Vimeo embeds, make sure to have responsive sizing enabled. Youtube embeds need to be enclosed by a `<div class="iframe-wrapper"></div>` to make them responsive.

```
### Example of a youtube embed in a markdown file

<div class='iframe-wrapper'>
  <iframe
    width='560'
    height='315'
    src='https://www.youtube.com/embed/jYRutUkP-9Y'
    frameborder='0'
    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
    allowfullscreen
  ></iframe>
</div>
```

If you try to simply `git push origin main` it will prompt you to create a fork instead. Do so.

Stage a pull request and I'll merge it.

Once I've done so, you can see a preview here: https://msc-19-showcase.vercel.app.

## Deploying on CCI Servers

1. Clone repo

2. Add a `.env` file

3. Add font files

4. Builds static files to `public/` folder:

```
$ yarn run build
```

5. Copy them into public_html from root:

```
$ cp -r ./msc-19-showcase/public/* ./creativecomputing.cci.arts.ac.uk/public_html/
```

6. Copy font files to server. Example:

```
$ scp -R /some/folder username:~/public_html -P 2020
```
