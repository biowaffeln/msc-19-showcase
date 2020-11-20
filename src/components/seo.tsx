import React from 'react';
import { Helmet } from 'react-helmet';

interface Props {
  title?: string;
  description?: string;
  image?: string;
  slug?: string;
}

const SEO = ({ title, description, image, slug }: Props) => {
  return (
    <Helmet>
      <meta charSet='utf-8' />
      <html lang='en' />
      <meta name='robots' content='noindex' />
      <meta name='googlebot' content='noindex' />

      <meta property='og:type' content='website' />
      <meta property='twitter:card' content='summary_large_image' />

      <title>{title} | Graduate Showcase 2020</title>
      <meta name='title' content={`${title} | Graduate Showcase 2020`} />
      <meta property='og:title' content={`${title} | Graduate Showcase 2020`} />
      <meta
        property='twitter:title'
        content={`${title} | Graduate Showcase 2020`}
      />

      <meta name='description' content={description} />
      <meta property='og:description' content={description} />
      <meta property='twitter:description' content={description} />

      <meta property='twitter:image' content={image} />
      <meta property='og:image' content={image} />

      <link
        rel='canonical'
        href={`https://creativecomputing.cci.arts.ac.uk/${slug}`}
      />
      <meta
        property='twitter:url'
        content={`https://creativecomputing.cci.arts.ac.uk/${slug}`}
      />
      <meta
        property='og:url'
        content={`https://creativecomputing.cci.arts.ac.uk/${slug}`}
      />
    </Helmet>
  );
};

export default SEO;
