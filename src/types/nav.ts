import type { ComponentType, SVGProps } from "react";

export interface NavItem {
  label: string;
  path?: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  section?: string;
}
