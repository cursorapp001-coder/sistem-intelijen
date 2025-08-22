import React, { useState } from "react";

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      // Hardcoded credentials for simulation purposes
      if (username === "admin" && password === "admin") {
        onLoginSuccess();
      } else {
        setError("Username atau password salah. Akses ditolak.");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen font-sans text-brand-text flex items-center justify-center p-4 bg-brand-dark">
      <div className="w-full max-w-md bg-brand-light-blue/50 backdrop-blur-sm border border-brand-accent/50 rounded-lg p-8 shadow-2xl animate-fade-in">
        <div className="text-center mb-8">
          <img
            src="https://i.ibb.co/XrTCLpN4/san-jose-state-university-logo-indonesian-state-intelligence-agency-san-jose-state-spartans-men-s-ba.png"
            alt="Logo Badan Intelijen Negara"
            className="h-24 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-white">Sistem Intelijen</h1>
          <p className="text-brand-primary">Badan Intelijen Negara</p>
          <p className="text-brand-gray mt-1">Akses Terbatas</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-brand-text/80 mb-2"
            >
              Username Operator
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              className="w-full bg-brand-light-blue border-2 border-brand-accent placeholder-brand-gray text-brand-text rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-brand-text/80 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="w-full bg-brand-light-blue border-2 border-brand-accent placeholder-brand-gray text-brand-text rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            />
          </div>

          {error && (
            <div className="text-center text-red-400 bg-red-900/50 p-3 rounded-lg border border-red-700 text-sm">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center bg-blue-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 disabled:bg-brand-gray disabled:cursor-not-allowed transition duration-200"
            >
              {isLoading ? "Memverifikasi..." : "Login"}
            </button>
          </div>
        </form>

        <p className="text-xs text-brand-gray text-center mt-8">
          Seluruh aktivitas di sistem ini diawasi. Penggunaan tanpa otorisasi
          akan ditindak sesuai hukum yang berlaku.
        </p>
      </div>
    </div>
  );
};
