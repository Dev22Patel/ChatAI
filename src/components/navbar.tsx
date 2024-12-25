import { cn } from "@/lib/utils"
import { useAuth0 } from "@auth0/auth0-react";

export function Navbar({ className }: { className?: string }) {

    const { user, loginWithRedirect,isLoading,logout,isAuthenticated } = useAuth0();
    console.log(user);
  return (
    <nav
      className={cn(
        "w-full px-6 py-4 bg-black/50 backdrop-blur-sm fixed top-0 z-50",
        className
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-12">
          <a
            href="/"
            className="text-white font-semibold text-xl tracking-tight hover:opacity-90 transition-opacity"
          >
            AubergineAI
          </a>
          <div className="hidden md:flex items-center space-x-8">
            {[
              ['Research', '/research'],
              ['Products', '/products'],
              ['Safety', '/safety'],
              ['Company', '/company'],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="text-sm text-white/75 hover:text-white transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
        {!isLoading && (
  !isAuthenticated ? (
    <button
      onClick={() => loginWithRedirect()}
      className="hidden md:block text-sm text-white/75 hover:text-white transition-colors duration-200"
    >
      Sign in
    </button>
  ) : (
    <button
      onClick={() => logout()}
      className="hidden md:block text-sm text-white/75 hover:text-white transition-colors duration-200"
    >
      Logout
    </button>
  )
)}


          <a
            href="/try"
            className="hidden md:block px-4 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-white/90 transition-colors duration-200"
          >
            Try AubergineGPT
          </a>
        </div>
      </div>
    </nav>
  )
}
