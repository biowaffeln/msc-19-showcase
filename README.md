# MSc '19 Showcase

Add your markdown files to the `src/markdown-pages` directory.

When adding vimeo embeds to markdown, make sure to have responsive sizing enabled.

### Deployment

Builds static files to `public/` folder:

```
$ yarn run build
```

Copy them into public_html from root:

```
$ cp -r ./msc-19-showcase/public/* ./creativecomputing.cci.arts.ac.uk/public_html/
```

### Development

To start a development server:

```
$ yarn run develop
```

Format your code:

```
$ yarn run format
```

Clean build folders and cache:

```
$ yarn run clean
```
