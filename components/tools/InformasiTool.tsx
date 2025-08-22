
import React from 'react';
import { ToolPageLayout } from '../ToolPageLayout';

export const InformasiTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <ToolPageLayout title="Informasi Sistem" icon="info" onBack={onBack}>
      <div className="text-brand-text/90 space-y-4">
        <h3 className="text-xl font-semibold text-white">Tentang Sistem Intelijen v2.1</h3>
        <p>
          Sistem Intelijen adalah platform intelijen terpadu yang dirancang untuk membantu aparat penegak hukum dalam melakukan penyelidikan dan pengawasan. Sistem ini mengintegrasikan berbagai alat pelacakan dan analisis data untuk memberikan gambaran komprehensif terhadap target operasi.
        </p>
        
        <h4 className="text-lg font-semibold text-white pt-2">Panduan Penggunaan</h4>
        <ul className="list-disc list-inside space-y-2 pl-2">
            <li>
                <strong>Kerahasiaan:</strong> Seluruh data yang diakses melalui sistem ini bersifat RAHASIA. Dilarang keras menyebarkan informasi kepada pihak yang tidak berwenang.
            </li>
            <li>
                <strong>Akurasi Data:</strong> Sistem ini menggunakan data intelijen dari berbagai sumber untuk keperluan simulasi dan latihan operasional. Informasi yang ditampilkan tidak boleh dijadikan dasar tunggal untuk pengambilan tindakan lapangan aktual. Selalu lakukan verifikasi silang dengan sumber intelijen yang valid.
            </li>
            <li>
                <strong>Integritas:</strong> Gunakan sistem ini dengan penuh tanggung jawab dan sesuai dengan prosedur operasi standar (SOP) yang berlaku.
            </li>
             <li>
                <strong>Pelaporan:</strong> Jika menemukan anomali atau galat pada sistem, segera laporkan ke Divisi TI melalui kanal yang telah disediakan.
            </li>
        </ul>

         <p className="pt-4 text-sm text-brand-text/70 text-center">
            Divisi Teknologi & Informasi Badan Intelijen © 2024
        </p>
      </div>
    </ToolPageLayout>
  );
};