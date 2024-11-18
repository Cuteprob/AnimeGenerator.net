import { FooterProps } from "@/types/footer";

export const footerData: FooterProps = {
  productTitle: "productTitle",
  productDescription: "productDescription",
  columns: [
    {
      title: "ourProducts",
      links: [
        {
          name: "aiAnimeGenerator",
          title: "aiAnimeGeneratorTitle",
          href: "https://www.animegenerator.net",
        },
      ],
    },
    {
      title: "usefulLinks",
      links: [
        {
          name: "sprunkiPhase",
          title: "sprunkiPhaseTitle",
          href: "https://sprunkiphase.xyz",
        },
        {
          name: "shadyBears",
          title: "shadyBearsTitle",
          href: "https://www.shadybears.org",
        },
        {
          name: "sprunkiPhase4",
          title: "sprunkiPhase4Title",
          href: "https://sprunkiphase4.app",
        },
      ],
    },
    {
      title: "resources",
      links: [
        {
          name: "privacyPolicy",
          title: "privacyPolicyTitle",
          href: "/privacy-policy",
        },
        { 
          name: "termsOfService", 
          title: "termsOfServiceTitle", 
          href: "/terms-of-service" 
        },
        {
          name: "contactUs",
          title: "contactUsTitle",
          href: "mailto:support@animegenerator.net",
        },
      ],
    },
  ],
};