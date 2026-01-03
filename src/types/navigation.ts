export type NavIconName = 'CircleUser' | 'ShoppingBag' | 'Heart' | 'Settings' | 'MapPin' | 'LogOut';

interface BaseLink {
	label: string;
}

export interface SimpleLink extends BaseLink {
	href: string;
	submenu?: false;
	type?: string;
}

export interface DescriptionItem {
	href: string;
	label: string;
	description: string;
}

export interface IconItem {
	href: string;
	label: string;
	icon: NavIconName;
}

export interface DescriptionSubmenu extends BaseLink {
	submenu: true;
	type: 'description';
	items: DescriptionItem[];
}

export interface IconSubmenu extends BaseLink {
	submenu: true;
	type: 'icon';
	items: IconItem[];
}

export type NavLink = SimpleLink | DescriptionSubmenu | IconSubmenu;
