type SiteConfig = {
  site_domain: string;
  site_name: string;
  site_description: string;
  support_phone: string;
  support_hours: string;
  support_email: string;
  address: string;
  socials: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
  };
};

export const siteConfig: SiteConfig = {
  site_name: "next-woo",
  site_description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is dummy text of the printing.",
  site_domain: "https://next-woo.com",
  support_phone: "09678242404",
  support_hours: "7 Days customer support",
  support_email: "example@example.com",
  address: "Brooklyn, New York, United States",
  socials: {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com",
  },
};
