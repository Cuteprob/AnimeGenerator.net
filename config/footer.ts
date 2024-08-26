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
          href: "https://animegenerator.net",
        },
      ],
    },
    {
      title: "usefulLinks",
      links: [],
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