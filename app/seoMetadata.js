const siteName = "West Midlands Cleaner";
const siteUrl = "https://www.westmidlandscleaner.co.uk";
const defaultImage = "/wmc-logo-horizontal.png";

function normalisePath(path = "/") {
  if (path === "/") return "/";
  const clean = String(path || "/").replace(/\/$/, "");
  return clean.startsWith("/") ? clean : `/${clean}`;
}

function absoluteUrl(path = "/") {
  const cleanPath = normalisePath(path);
  return `${siteUrl}${cleanPath === "/" ? "" : cleanPath}`;
}

export function buildSeoMetadata({
  title,
  description,
  path = "/",
  image = defaultImage,
  noIndex = false
}) {
  const cleanPath = normalisePath(path);
  const url = absoluteUrl(cleanPath);
  const imageUrl = String(image || defaultImage).startsWith("http")
    ? image
    : absoluteUrl(image || defaultImage);

  return {
    title: {
      absolute: title
    },
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      type: "website",
      locale: "en_GB",
      url,
      siteName,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${siteName} logo`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl]
    },
    robots: noIndex
      ? {
          index: false,
          follow: false
        }
      : {
          index: true,
          follow: true
        }
  };
}
