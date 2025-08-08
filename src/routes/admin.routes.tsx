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

  //   {
  //     name: "Travel Allowance",
  //     children: [
  //       {
  //         name: "Add Travel Allowance",
  //         path: "add_travel_allowance",
  //         element: <TravellingAllowanceForm />,
  //       },
  //       {
  //         path: "travel_allowance/:id",
  //         element: <TravellingAllowanceUpdate />,
  //       },
  //       {
  //         name: "All Travel Allowance",
  //         path: "all_travel_allowance",
  //         element: <TravellingAllowance />,
  //       },
  //     ],
  //   },
];
