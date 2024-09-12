import type { NavItemDto } from "./nav.item.dto";

export interface NavGroupDto {
  title: string;
  to?: { name: string };
  activeRoutes: string[];
  icon: string;
  isGroup: boolean;
  items: NavItemDto[];
}
