import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Lock, UserCircle, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [payRollNumber, setPayRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login({
        payRollNumber: Number(payRollNumber),
        password: password,
      });
      toast.success("¡Bienvenido!");
      navigate("/administrador");
    } catch (err: any) {
      setError(err.message || "Credenciales inválidas. Intenta nuevamente.");
      toast.error(err.message || "Credenciales inválidas. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 
      sm:px-6 lg:px-8 font-sans"
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <div
            className="w-16 h-16 bg-blue-600 rounded-xl flex items-center 
            justify-center shadow-lg"
          >
            <span className="text-white font-extrabold text-2xl">MS</span>
          </div>
        </div>
        <h2
          className="mt-2 text-center text-3xl font-extrabold text-slate-900 
          tracking-tight"
        >
          Sistemas - Tickets
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Inicia sesión para acceder al sistema de tickets
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div
          className="bg-white py-8 px-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] 
          sm:rounded-2xl sm:px-10 border border-slate-100"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div
                className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md 
                flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-500" />
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            )}

            <div>
              <label
                htmlFor="payroll"
                className="block text-sm font-semibold text-slate-700"
              >
                Número de Nómina
              </label>
              <div className="mt-2 relative rounded-md shadow-sm">
                <div
                  className="absolute inset-y-0 left-0 pl-3 flex items-center 
                  pointer-events-none"
                >
                  <UserCircle className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="payroll"
                  type="number"
                  required
                  value={payRollNumber}
                  onChange={(e) => setPayRollNumber(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 
                  rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 
                  sm:text-sm transition-colors"
                  placeholder="Ej. 12345"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-slate-700"
              >
                Contraseña
              </label>
              <div className="mt-2 relative rounded-md shadow-sm">
                <div
                  className="absolute inset-y-0 left-0 pl-3 flex items-center 
                  pointer-events-none"
                >
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 
                  rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 
                  sm:text-sm transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent 
                rounded-lg shadow-sm text-sm font-bold text-white bg-blue-600 
                hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed 
                transition-colors hover:cursor-pointer"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Iniciar Sesión"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
