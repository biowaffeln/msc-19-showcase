# MSc '19 Showcase

## Adding your project

Clone the repository. You can add your project by populating the `index.md` in your `src/markdown-pages/your-name` directory.

```
mardown-pages
└── your-name
    ├── index.md
    ├── image1.jpg
    ├── image2.jpg
    ├── image3.jpg
    └── image4.jpg
```

If you wish to spin up a development server, run `yarn install && yarn run develop`. This step is optional but will help you see the changes you made.

**Your markdown's frontmatter should include a slug, artist name, project title, thumbnail URL and description.** A slug is the part of the URL that uniquely identifies a page.

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

For the rest, treat the file as you'd treat a Github README. You can add quotes, images, youtube embeds…whatever suits your needs. Unlike Github, the website will display video embeds. When adding Vimeo embeds, make sure to have responsive sizing enabled.

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
