import { config, t } from './config';

export function generateLocalBusinessSchema(lang: string) {
  const hours: Array<{
    '@type': 'OpeningHoursSpecification';
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }> = [];

  for (const h of config.hours) {
    if (!h.time.includes('-') || ['Geschlossen', 'Fermé', 'Chiuso', 'Closed'].includes(h.time)) continue;
    const dayOfWeek = parseDays(h.days);
    const segments = h.time.split(',').map((s) => s.trim());
    for (const seg of segments) {
      const m = seg.match(/^(\d{1,2}:\d{2})-(\d{1,2}:\d{2})$/);
      if (m) {
        hours.push({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek,
          opens: m[1],
          closes: m[2],
        });
      }
    }
  }

  return {
    '@context': 'https://schema.org',
    '@type': config.seo.schema_type || 'LocalBusiness',
    name: config.business.name,
    legalName: config.business.legal_name,
    description: t(config.seo.description, lang),
    url: config.contact.website,
    telephone: config.contact.phone,
    email: config.contact.email,
    foundingDate: `${config.business.founded}`,
    image: `${config.contact.website}${config.seo.og_image}`,
    logo: `${config.contact.website}${config.business.logo}`,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: config.location.street,
      addressLocality: config.location.city,
      postalCode: config.location.zip,
      addressRegion: config.location.canton,
      addressCountry: config.location.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: config.location.geo.lat,
      longitude: config.location.geo.lng,
    },
    ...(hours.length ? { openingHoursSpecification: hours } : {}),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: config.reviews.average,
      reviewCount: config.reviews.count,
      bestRating: 5,
    },
    areaServed: config.seo.service_area.map((area) => ({
      '@type': 'City',
      name: area,
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: t(config.business.slogan, lang),
      itemListElement: config.services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: t(s.title, lang),
          description: t(s.description, lang),
        },
      })),
    },
  };
}

export function generateFaqSchema(lang: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: config.faq.map((item) => ({
      '@type': 'Question',
      name: t(item.question, lang),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t(item.answer, lang),
      },
    })),
  };
}

function parseDays(days: string): string[] {
  const map: Record<string, string> = {
    Mo: 'Monday',
    Di: 'Tuesday',
    Mi: 'Wednesday',
    Do: 'Thursday',
    Fr: 'Friday',
    Sa: 'Saturday',
    So: 'Sunday',
  };
  if (days.includes('-')) {
    const [start, end] = days.split('-');
    const weekdays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
    const startIdx = weekdays.indexOf(start);
    const endIdx = weekdays.indexOf(end);
    if (startIdx >= 0 && endIdx >= 0) {
      return weekdays
        .slice(startIdx, endIdx + 1)
        .map((d) => map[d])
        .filter(Boolean);
    }
  }
  return [map[days] || days];
}

