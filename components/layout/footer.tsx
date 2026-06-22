import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";

import { Section, Container } from "@/components/craft";
import { FooterNewsletter } from "@/components/layout/footer-newsletter";
import { footerMenu } from "@/menu.config";
import { siteConfig } from "@/site.config";
import Logo from "@/public/logo.svg";

const ACCENT = "#80B500";

const paymentMethods = ["PayPal", "VISA", "DISCOVER", "Mastercard", "AMEX"];

export function Footer() {
  const { socials } = siteConfig;

  const socialLinks = [
    { href: socials.facebook, label: "Facebook", Icon: Facebook },
    { href: socials.twitter, label: "Twitter", Icon: Twitter },
    { href: socials.linkedin, label: "LinkedIn", Icon: Linkedin },
    { href: socials.youtube, label: "YouTube", Icon: Youtube },
  ].filter((s) => s.href);

  return (
    <footer className="border-t bg-muted/30">
      <Section>
        <Container className="grid gap-10 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1.4fr] not-prose">
          {/* Brand / contact */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={Logo}
                alt={siteConfig.site_name}
                className="dark:invert"
                width={36}
                height={22.66}
              />
              <span className="text-xl font-bold">{siteConfig.site_name}</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {siteConfig.site_description}
            </p>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 flex-shrink-0" style={{ color: ACCENT }} />
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 flex-shrink-0" style={{ color: ACCENT }} />
                <a href={`tel:${siteConfig.support_phone}`} className="hover:underline">
                  {siteConfig.support_phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 flex-shrink-0" style={{ color: ACCENT }} />
                <a href={`mailto:${siteConfig.support_email}`} className="hover:underline">
                  {siteConfig.support_email}
                </a>
              </li>
            </ul>
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-3">
                {socialLinks.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground transition-colors hover:text-[var(--accent)]"
                    style={{ ["--accent" as string]: ACCENT }}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Link columns */}
          {Object.entries(footerMenu).map(([heading, links]) => (
            <div key={heading} className="flex flex-col gap-3 text-sm">
              <h5 className="text-base font-bold">{heading}</h5>
              {Object.entries(links).map(([label, href]) => (
                <Link
                  key={`${heading}-${label}`}
                  href={href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {label}
                </Link>
              ))}
            </div>
          ))}

          {/* Newsletter */}
          <div className="flex flex-col gap-4">
            <h5 className="text-base font-bold">Newsletter</h5>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Subscribe to our weekly Newsletter and receive updates via email.
            </p>
            <FooterNewsletter />
            <div className="mt-2">
              <h6 className="mb-2 text-sm font-bold">We Accept</h6>
              <div className="flex flex-wrap items-center gap-2">
                {paymentMethods.map((method) => (
                  <span
                    key={method}
                    className="rounded border bg-background px-2 py-1 text-[10px] font-semibold tracking-wide text-muted-foreground"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>

        <Container className="border-t not-prose">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {siteConfig.site_name}. All rights
            reserved.
          </p>
        </Container>
      </Section>
    </footer>
  );
}
