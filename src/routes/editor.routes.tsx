import Articles from "../pages/Articles/Articles";
import Dashboard from "../pages/Dashboard";

export const editorPaths = [
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
        path: "article/:id",
        element: "<ArticleUpdate />",
      },
      {
        name: "All Articles",
        path: "all_articles",
        element: <Articles />,
      },
    ],
  },
];
