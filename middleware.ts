import { withAuth } from "next-auth/middleware"

export default withAuth({
    callbacks: {
        authorized: ({ token }) => {
            // Só permite acesso se o usuário estiver autenticado
            return !!token
        },
    },
})

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/api/protected/:path*",
    ]
}

