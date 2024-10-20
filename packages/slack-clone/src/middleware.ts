import {
	convexAuthNextjsMiddleware,
	createRouteMatcher,
	isAuthenticatedNextjs,
	nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isPuclicPage = createRouteMatcher(["/auth"]);

export default convexAuthNextjsMiddleware((request) => {
	if (!isPuclicPage(request) && !isAuthenticatedNextjs()) {
		return nextjsMiddlewareRedirect(request, "/auth");
	}

	// If the user is authenticated, we can continue to the requested page.
	if (isPuclicPage(request) && isAuthenticatedNextjs()) {
		return nextjsMiddlewareRedirect(request, "/");
	}
});

export const config = {
	// The following matcher runs middleware on all routes
	// except static assets.
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
