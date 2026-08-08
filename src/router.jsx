const getRouter = () => {
  // Define a QueryClient instance
  const queryClient = new QueryClient();

  // Create the router using createRouter from @tanstack/react-router
  const router = createRouter({
    routeTree, // Use your route tree here
    context: { queryClient }, // Pass the QueryClient to the router's context
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};