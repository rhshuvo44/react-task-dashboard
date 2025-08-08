import Dashboard from "../pages/Dashboard";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    type: "divider",
  },

  {
    name: "Articles",
    children: [
      {
        name: "Add Article",
        path: "add_article",
        element: "<ArticleForm />",
      },
      {
        path: "article/:id",
        element: "<ArticleUpdate />",
      },
      {
        name: "All Articles",
        path: "all_articles",
        element: "<ArticlesList />",
      },
    ],
  },
];
