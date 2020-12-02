import React from 'react';
import { Helmet } from 'react-helmet';

interface Props {
  title?: string;
  description?: string;
  image?: string;
  slug?: string;
}

const SEO = ({ title, description, image, slug }: Props) => {
  const byline = `CCI Postgraduate Showcase 2020`;
  const seoTitle = title ? `${title} | ${byline}` : byline;
  const siteUrl = 'https://creativecomputing.cci.arts.ac.uk';
  const projectUrl = slug ? siteUrl + slug : siteUrl;

  return (
    <Helmet>
      <meta charSet='utf-8' />
      <html lang='en' />
      {/* <meta name='robots' content='noindex' /> */}
      {/* <meta name='googlebot' content='noindex' /> */}
      <meta property='og:type' content='website' />
      <meta property='twitter:card' content='summary_large_image' />

      <title>{seoTitle}</title>
      <meta name='title' content={seoTitle} />
      <meta property='og:title' content={seoTitle} />
      <meta property='twitter:title' content={seoTitle} />

      <meta name='description' content={description} />
      <meta property='og:description' content={description} />
      <meta property='twitter:description' content={description} />

      {image && <meta property='twitter:image' content={image} />}
      {image && <meta property='og:image' content={image} />}

      <link rel='canonical' href={projectUrl} />
      <meta property='twitter:url' content={projectUrl} />
      <meta property='og:url' content={projectUrl} />
    </Helmet>
  );
};

export default SEO;
