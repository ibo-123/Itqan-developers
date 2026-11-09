export type NavLink = {
  href: string;
  label: string;
};

export type Specialization = {
  id: string;
  title: string;
  description: string;
};

export type ProjectPreview = {
  slug: string;
  name: string;
  status: string;
  description: string;
  tags: readonly string[];
};
