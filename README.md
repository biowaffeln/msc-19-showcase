# MSc '19 Showcase

Add your markdown files to the `src/markdown-pages` directory.

When adding vimeo embeds to markdown, make sure to have responsive sizing enabled.

## Deploy on CCI Servers

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

## Development

To start a development server:

```
$ yarn run develop
```
