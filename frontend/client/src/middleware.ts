import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ... your PROTECTED_ROUTES and PUBLIC_ROUTES remain the same
const PROTECTED_ROUTES = {
    //Employee routes
    "/employee/dashboard": ['employee'],

    //Super-Manager routes
    "/super-manager/dashboard": ['supermanager'],

    // User routes
    '/user/dashboard': ['user', 'admin', 'superadmin', 'employee'],
    '/user/home': ['user', 'admin', 'superadmin', 'employee'],
    '/user/profile': ['user', 'admin', 'superadmin', 'employee'],

    // Admin routes
    '/admin/dashboard': ['admin', 'superadmin'],
    '/admin/users': ['admin', 'superadmin'],

    // Superadmin routes
    '/superadmin': ['superadmin'],

    // API routes
    '/api/users': ['admin', 'superadmin'],
    '/api/settings': ['superadmin'],
};

// 2. Define truly public routes (no token needed)
const PUBLIC_ROUTES = [
    '/',                     // Homepage
    '/user/login',           // Login page
    '/user/register',        // Registration page
    '/password-reset',       // Password reset
    '/public/',              // Any public assets
    '/_next/',               // Next.js internal paths
    '/favicon.ico',          // Favicon
    '/api/public/'           // Public APIs
];

const roleRedirectMap: Record<string, string> = {
    employee: '/employee/dashboard',
    manager: '/manager/dashboard',
    supermanager: '/super-manager/dashboard',
};

export function middleware(request: NextRequest) {
    const currentPath = request.nextUrl.pathname;
    const token = request.cookies.get('accessToken')?.value;

    console.log("Current Path: ", currentPath);


    // ✅ 1. If public route, allow it even without token
    if (isPublicRoute(currentPath)) {
        return NextResponse.next();
    }


    // ✅ 2. If token missing for protected route
    if (!token) {
        console.log("Token wasn't there for:", currentPath);
        return handleMissingToken(request, currentPath);
    }

    // ✅ 3. Decode token and handle permissions
    try {
        const decoded = decodeJWT(token);
        const userRole = decoded.role;

        // ✅ Redirect logged-in user from public routes (like /user/login) to dashboard
        if (isPublicRoute(currentPath)) {
            const redirectPath = roleRedirectMap[userRole] || '/dashboard';
            return NextResponse.redirect(new URL(redirectPath, request.url));
        }

        // ✅ Check if the user has permission for the current route
        if (!hasPermission(currentPath, userRole)) {
            return redirectToUnauthorized(request);
        }

        // ✅ Optionally forward user info to backend via headers
        const headers = new Headers(request.headers);
        headers.set('x-user-id', decoded.id);
        headers.set('x-user-role', userRole);

        return NextResponse.next({ request: { headers } });

    } catch (error) {
        console.error('JWT Error:', error);
        return handleInvalidToken(request);
    }
}

// ======================
// Helper functions
// ======================

function isPublicRoute(path: string): boolean {
    return PUBLIC_ROUTES.some(publicRoute =>
        path === publicRoute || path.startsWith(publicRoute)
    );
}

function handleMissingToken(request: NextRequest, currentPath: string): NextResponse {
    const loginUrl = new URL('/user/login', request.url);
    return NextResponse.redirect(loginUrl);
}

function handleInvalidToken(request: NextRequest): NextResponse {
    const response = NextResponse.redirect(new URL('/user/login', request.url));
    response.cookies.delete('accessToken');
    return response;
}

function decodeJWT(token: string): { id: string; role: string } {
    const payload = token.split('.')[1];
    return JSON.parse(Buffer.from(payload, 'base64').toString());
}

function hasPermission(path: string, userRole: string): boolean {
    const matchedRoute = Object.entries(PROTECTED_ROUTES)
        .sort((a, b) => b[0].length - a[0].length)
        .find(([route]) => path.startsWith(route));

    if (!matchedRoute) return false;

    const [, allowedRoles] = matchedRoute;
    return allowedRoles.includes(userRole);
}

function redirectToUnauthorized(request: NextRequest): NextResponse {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
}

export const config = {
    matcher: ["/((?!_next|favicon.ico).*)"],
};
