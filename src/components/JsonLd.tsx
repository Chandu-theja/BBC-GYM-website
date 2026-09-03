import { site } from "@/data/site";

/**
 * HealthClub structured data. This is what lets Google show the rating, hours
 * and directions directly in search results for "gym in Tirupati" — the single
 * highest-leverage SEO element on a local business site.
 */
export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HealthClub",
    "@id": `${site.url}#gym`,
    name: site.name,
    alternateName: [site.legalName, "Bouncers Gym", "BBC Bouncers Fitness GYM"],
    description: site.description,
    url: site.url,
    telephone: site.phone,
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.line1}, ${site.address.line2}`,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: site.mapsUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: site.hours.opens,
        closes: site.hours.closes,
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating.value,
      reviewCount: site.rating.count,
      bestRating: 5,
    },
    amenityFeature: [
      "Free weights",
      "Cardio equipment",
      "CrossFit rig",
      "Group classes",
      "Ladies' batches",
      "Personal training",
    ].map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
