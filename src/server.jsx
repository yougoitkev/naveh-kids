return {
  async fetch(request, env, ctx) {
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};