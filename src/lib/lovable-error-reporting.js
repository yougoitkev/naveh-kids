import React from "react";
// import React, { ErrorBoundary } from "react";
export function reportLovableError(error: unknown) {
  if (typeof window === "undefined") return;
  // window.__lovableEvents?.captureException?.(
  //   error, // This needs a context to be able to set it in the editor.
  //   { source: "react_error_boundary", route: window.location.pathname },
  //   { mechanism: "react_error_boundary" }, // Not actually used by Lovable
  // );
  const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : String(error);
  const stack = error instanceof Error ? error.stack : undefined;
  window.__lovableReportRuntimeError?.({
    message,
    ...(stack !== undefined && { stack }),
    filename: window.location.pathname,
  });
}