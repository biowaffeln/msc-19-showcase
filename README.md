# MSc '19 Showcase

## Adding your project

Clone the repository. Add your files by placing them in a `src/markdown-pages` directory.

```
mardown-pages
└── your-name
    ├── index.md
    ├── image1.jpg
    ├── image2.jpg
    ├── image3.jpg
    └── image4.jpg
```

Your markdown's frontmatter should include a slug, artist name, project title, thumbnail URL and description.

```
---
slug: "/aleksi-halttunen"
artist: "Aleksi Halttunen"
title: "Example Project"
thumbnail: "./thumbnail.jpg"
description: "A small sub header of what the project is so people can have a quick overview"
---
```

For the rest, treat the file as you'd treat a Github README. You can add quotes, images, youtube embeds…whatever suits your needs. When adding Vimeo embeds, make sure to have responsive sizing enabled.

Stage a pull request and I'll merge it.

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
