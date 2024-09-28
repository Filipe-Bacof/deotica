import type { ReactNode } from "react";

export interface MenuItem {
  id: number;
  href: string;
  icon: ReactNode;
  alt: string;
  title: string;
  permission?: string[];
}
