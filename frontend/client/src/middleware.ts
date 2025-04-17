import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 1. Define ALL protected routes and their required roles
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

    // 3. First check - is this a public route?
    // if (PUBLIC_ROUTES.includes(currentPath) && token) {
    //     return NextResponse.next();
    // }

    // 4. Second check - is there NO token for a protected route?
    if (!token) {
        console.log("TOk wasn't there: :", token);
        return handleMissingToken(request, currentPath);
    }

    // 5. Third check - verify token and permissions
    try {
        const decoded = decodeJWT(token);
        const userRole = decoded.role;
        const redirectPath = roleRedirectMap[userRole] || '/dashboard';

        if (PUBLIC_ROUTES.includes(currentPath) && token) {
            return NextResponse.redirect(new URL(redirectPath, request.url));
        }

        // 6. Check if user has permission for this route
        if (!hasPermission(currentPath, userRole)) {
            return redirectToUnauthorized(request);
        }


        // 7. Add user info to headers for backend use
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
// HELPER FUNCTIONS
// ======================

function isPublicRoute(path: string): boolean {
    return PUBLIC_ROUTES.some(publicRoute =>
        path === publicRoute || path.startsWith(publicRoute)
    );
}

function handleMissingToken(request: NextRequest, currentPath: string): NextResponse {
    // Special case: API routes should return 401 instead of redirect
    // if (currentPath.startsWith('/api/')) {
    //     return new NextResponse(
    //         JSON.stringify({ error: 'Authentication required' }),
    //         { status: 401, headers: { 'content-type': 'application/json' } }
    //     );
    // }

    // For pages, redirect to login with return URL
    const loginUrl = new URL('/user/login', request.url);
    // loginUrl.searchParams.set('redirect', currentPath);
    return NextResponse.redirect(loginUrl);
}

function handleInvalidToken(request: NextRequest): NextResponse {
    // Clear invalid token
    const response = NextResponse.redirect(new URL('/user/login', request.url));
    response.cookies.delete('accessToken');
    return response;
}

function decodeJWT(token: string): { id: string; role: string } {
    const payload = token.split('.')[1];
    return JSON.parse(Buffer.from(payload, 'base64').toString());
}

function hasPermission(path: string, userRole: string): boolean {
    // Find the most specific matching route
    const matchedRoute = Object.entries(PROTECTED_ROUTES)
        .sort((a, b) => b[0].length - a[0].length) // Sort by longest path first
        .find(([route]) => path.startsWith(route));

    // If no matched route, deny access by default
    if (!matchedRoute) return false;

    const [, allowedRoles] = matchedRoute;
    return allowedRoles.includes(userRole);
}

function redirectToUnauthorized(request: NextRequest): NextResponse {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
}

// Middleware configuration
export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};