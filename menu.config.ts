// Define the menu items
export const mainMenu = {
  home: "/",
  shop: "/shop",
  blog: "/posts",
  about: "https://github.com/9d8dev/next-wp",
};

// Primary navigation shown in the header's bottom bar
// ("Categories" is rendered separately as the leading dropdown)
export const headerMenu: Record<string, string> = {
  Shop: "/shop",
  "About Us": "/pages/about-us",
  Blog: "/posts",
};

// Secondary navigation shown on the right of the header's bottom bar
export const headerMenuRight: Record<string, string> = {
  "Help & FAQ": "/pages/faq",
  "Contact Us": "/pages/contact",
};

// Utility links shown in the header's top bar
export const topMenu: Record<string, string> = {
  "About Us": "/pages/about-us",
  "Order Tracking": "/account/orders",
};

// Footer link columns
export const footerMenu: Record<string, Record<string, string>> = {
  Company: {
    About: "/pages/about-us",
    Blog: "/posts",
    "All Products": "/shop",
    "Locations Map": "/pages/locations",
    FAQ: "/pages/faq",
    "Contact us": "/pages/contact",
  },
  "Services.": {
    "Order tracking": "/account/orders",
    "Wish List": "/account",
    Login: "/account",
    "My account": "/account",
    "Terms & Conditions": "/pages/terms",
    "Promotional Offers": "/shop",
  },
  "Customer Care": {
    Login: "/account",
    "My account": "/account",
    "Wish List": "/account",
    "Order tracking": "/account/orders",
    FAQ: "/pages/faq",
    "Contact us": "/pages/contact",
  },
};

export const contentMenu = {
  categories: "/posts/categories",
  tags: "/posts/tags",
  authors: "/posts/authors",
};

export const shopMenu = {
  products: "/shop",
  cart: "/cart",
  account: "/account",
};
