import { Fragment } from "react";
import Image from "next/image";

type EventsHeroProps = {
  eyebrow: string;
  lines: string[]; // each rendered as its own line; last line gets the accent colour
  intro: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  image: { src: string; alt: string; position?: string };
  photoLabel: string;
  captionEyebrow: string;
  captionTitle: string;
};

/**
 * The shared hero shell for the events hub and each dedicated
 * occasion page — same composition, different copy/photo per page,
 * so the four pages read as one family rather than four one-offs.
 */
export default function EventsHero({
  eyebrow,
  lines,
  intro,
  primary,
  secondary,
  image,
  photoLabel,
  captionEyebrow,
  captionTitle,
}: EventsHeroProps) {
  return (
    <section className="events-hero events-container">
      <div className="events-hero-copy">
        <p className="events-eyebrow">
          <span /> {eyebrow}
        </p>
        <h1>
          {lines.map((line, i) =>
            i === lines.length - 1 ? (
              <span key={line}>{line}</span>
            ) : (
              <Fragment key={line}>
                {line}
                <br />
              </Fragment>
            )
          )}
        </h1>
        <p className="events-intro">{intro}</p>
        <div className="events-actions">
          <a href={primary.href} className="events-button">
            {primary.label} <span aria-hidden="true">↗</span>
          </a>
          {secondary && (
            <a href={secondary.href} className="events-text-link">
              {secondary.label} <span aria-hidden="true">↓</span>
            </a>
          )}
        </div>
        <div className="events-location">
          <span aria-hidden="true">◎</span> Sector 89, Faridabad <span className="events-location-divider" /> Open 24 hours
        </div>
      </div>
      <figure className="events-hero-image">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          preload
          sizes="(min-width: 900px) 55vw, 100vw"
          className="object-cover"
          style={image.position ? { objectPosition: image.position } : undefined}
        />
        <div className="events-image-shade" />
        <span className="events-photo-label">{photoLabel}</span>
        <figcaption>
          <span>{captionEyebrow}</span>
          <strong>{captionTitle}</strong>
        </figcaption>
      </figure>
    </section>
  );
}
