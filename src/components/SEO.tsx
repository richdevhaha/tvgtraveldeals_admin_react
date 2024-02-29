import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  name: string;
  type: string;
  keywords?: string;
  url?: string;
  image?: string;
  scripts?: string[];
}
export const SEO = ({ title, description, name, type, keywords, url, image, scripts }: SEOProps) => (
  <Helmet>
    {/* Standard metadata tags */}
    <title>{title}</title>
    <meta name="description" content={description} />
    {keywords && <meta name="keywords" content={keywords} />}

    {/* Facebook tags */}
    <meta property="og:type" content={type} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    {url && <meta property="og:url" content={url} />}
    {image && <meta property="og:image" content={image} />}

    {/* Twitter tags */}
    <meta name="twitter:creator" content={name} />
    <meta name="twitter:card" content={type} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />

    {/* dynamic scripts */}
    {scripts?.map((path, index) => <script key={index} src={path} type="text/javascript" defer async={false} />)}

    {/* End Twitter tags */}
  </Helmet>
);
