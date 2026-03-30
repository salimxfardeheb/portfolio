
export const menuItems = [
  { id: 1, key: "home" as const, link: "/" },
  { id: 2, key: "about" as const, link: "/about" },
  { id: 3, key: "portfolio" as const, link: "/portfolio" },
  { id: 4, key: "services" as const, link: "/services" },
  { id: 5, key: "templates" as const, link: "/templates" },
];

export type FormData = {
  name: string;
  email: string;
  message: string;
};
