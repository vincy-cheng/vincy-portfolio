export const revalidateSeconds = 86400;

const defaultUrl = "http://localhost:3000";

export const siteConfig = {
  name: "Vincy Cheng",
  title: "Vincy Cheng",
  description:
    "Designing and shipping web products with clarity, speed, and care.",
  url: process.env.SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? defaultUrl,
  links: {
    github: "https://github.com/vincy-cheng",
    linkedin: "https://www.linkedin.com/in/vincy-cheng-ab00a323a/",
    email: "mailto:vincy.c.work23@gmail.com",
  },
};
