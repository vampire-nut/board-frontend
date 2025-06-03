const Menu_Nav_List = [
  {
    id: "home",
    title: "Home",
    icon: "solar:home-angle-outline",
    path: "/home",
  },
  {
    id: "ourblog",
    title: "Our Blog",
    icon: "material-symbols-light:edit-square-outline",
    path: "/our-blog",
  },
];

export default Menu_Nav_List;

export interface MenuItemProps {
  [x: string]: any;
  id: string;
  title: string;
  icon: string;
  path: string;
}

