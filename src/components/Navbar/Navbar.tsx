import { LogOut } from "lucide-react";
import Logo from "../../assets/logomesa.png";
import { useAuth } from "../../hooks/useAuth";

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const getInitials = (name: string) => {
    if (!name) return "U";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <nav
      className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b
      border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4 group cursor-default">
            <div className="p-1 rounded-lg transition-colors group-hover:bg-slate-50">
              <img
                src={Logo}
                alt="MESA"
                className="h-9 w-auto object-contain"
              />
            </div>
            <div className="hidden md:block h-6 w-px bg-slate-200" />{" "}
            <h1 className="text-lg font-semibold tracking-tight text-slate-800">
              TIC<span className="text-blue-600">KETS</span>
            </h1>
          </div>

          {isAuthenticated && user && (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-bold text-slate-800 leading-tight">
                  {user.name}
                </span>
                <span
                  className="text-xs font-semibold text-blue-600 uppercase 
                  tracking-wide"
                >
                  {user.role}
                </span>
              </div>

              <div
                className="h-9 w-9 rounded-full bg-slate-100 border border-slate-200 
                flex items-center justify-center text-sm font-bold text-slate-600 
                shadow-sm"
              >
                {getInitials(user.name)}
              </div>

              <div className="h-6 w-px bg-slate-200 mx-1" />

              <button
                onClick={logout}
                title="Cerrar sesión"
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 
                rounded-lg transition-colors focus:outline-none focus:ring-2 
                focus:ring-red-500/20 hover:cursor-pointer"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
