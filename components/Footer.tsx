import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark border-t border-brand-accent/30 mt-auto py-6">
      <div className="container mx-auto px-4 text-center text-brand-gray text-sm">
        <p className="font-bold text-yellow-400 uppercase tracking-wider mb-2">
          Akses Terbatas - Sistem Rahasia Negara
        </p>
        <p className="mb-1">
          Sistem Intelijen v2.1
        </p>
        <p>
          &copy; {currentYear} Divisi Teknologi & Informasi Badan Intelijen. Hak Cipta Dilindungi Undang-Undang.
        </p>
      </div>
    </footer>
  );
};
