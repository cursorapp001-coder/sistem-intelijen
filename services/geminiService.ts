import { GoogleGenAI, Type } from "@google/genai";
import { SuspectProfile, CheckPostData, MsisdnData, DataDiri, ImeiData, SadapHpData, SosmedData, TrackedLocation, ETilangRecord, TahananRecord, ForensikReport, JaringanKomunikasiStatus, SantetHpResult, DataIntelijenReport } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

// --- Schemas ---

const profileSchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING, description: "Nama lengkap tersangka" },
    age: { type: Type.INTEGER, description: "Usia tersangka" },
    status: { type: Type.STRING, description: "Status tersangka (pilih salah satu: Buron, Diawasi, Dicari)" },
    phoneNumber: { type: Type.STRING, description: "Nomor telepon yang dicari" },
    photoUrl: { type: Type.STRING, description: "URL gambar placeholder dari picsum.photos, format: https://picsum.photos/200" },
    lastKnownLocation: {
      type: Type.OBJECT,
      properties: {
        address: { type: Type.STRING, description: "Alamat lokasi terakhir di Indonesia" },
        timestamp: { type: Type.STRING, description: "Waktu lokasi terakhir terdeteksi (format ISO 8601)" },
        latitude: { type: Type.NUMBER, description: "Garis lintang lokasi di Indonesia" },
        longitude: { type: Type.NUMBER, description: "Garis bujur lokasi di Indonesia" },
      },
      required: ['address', 'timestamp', 'latitude', 'longitude']
    },
    locationHistory: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          address: { type: Type.STRING, description: "Alamat riwayat lokasi di Indonesia" },
          timestamp: { type: Type.STRING, description: "Waktu riwayat lokasi terdeteksi (format ISO 8601)" },
        }
      }
    },
    socialMediaProfiles: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          platform: { type: Type.STRING, description: "Platform media sosial (pilih: Facebook, Twitter, Instagram, TikTok, LinkedIn)" },
          username: { type: Type.STRING, description: "Username" },
          url: { type: Type.STRING, description: "URL profil" },
        }
      }
    },
    recentActivity: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          platform: { type: Type.STRING, description: "Platform media sosial (pilih: Facebook, Twitter, Instagram, TikTok, LinkedIn)" },
          post: { type: Type.STRING, description: "Konten postingan singkat (maksimal 2-3 kalimat)" },
          timestamp: { type: Type.STRING, description: "Waktu postingan (format ISO 8601)" },
          url: { type: Type.STRING, description: "URL postingan" },
        }
      }
    }
  },
  required: ['name', 'age', 'status', 'phoneNumber', 'photoUrl', 'lastKnownLocation', 'locationHistory', 'socialMediaProfiles', 'recentActivity']
};

const checkPostSchema = {
    type: Type.OBJECT,
    properties: {
        plateNumber: { type: Type.STRING },
        ownerName: { type: Type.STRING },
        vehicleType: { type: Type.STRING, description: "Contoh: Toyota Avanza, Honda Vario 150" },
        color: { type: Type.STRING },
        registrationYear: { type: Type.INTEGER },
        status: { type: Type.STRING, description: "Contoh: Pajak Hidup, Pajak Mati 2 Tahun, Diblokir" },
        lastSeen: {
            type: Type.OBJECT,
            properties: {
                location: { type: Type.STRING, description: "Nama jalan atau area" },
                timestamp: { type: Type.STRING, description: "Format ISO 8601" }
            }
        }
    }
};

const msisdnSchema = {
    type: Type.OBJECT,
    properties: {
        msisdn: { type: Type.STRING },
        registeredName: { type: Type.STRING },
        address: { type: Type.STRING },
        provider: { type: Type.STRING, description: "Contoh: Telkomsel, Indosat, XL" },
        lastPing: {
            type: Type.OBJECT,
            properties: {
                location: { type: Type.STRING, description: "Nama BTS atau area" },
                latitude: { type: Type.NUMBER },
                longitude: { type: Type.NUMBER },
                timestamp: { type: Type.STRING, description: "Format ISO 8601" }
            }
        }
    }
};

const dataDiriSchema = {
    type: Type.OBJECT,
    properties: {
        nik: { type: Type.STRING },
        fullName: { type: Type.STRING },
        dateOfBirth: { type: Type.STRING, description: "Format YYYY-MM-DD" },
        address: { type: Type.STRING },
        occupation: { type: Type.STRING },
        maritalStatus: { type: Type.STRING },
        photoUrl: { type: Type.STRING, description: "URL gambar placeholder dari picsum.photos, format: https://picsum.photos/200" }
    }
};

const imeiSchema = {
    type: Type.OBJECT,
    properties: {
        imei: { type: Type.STRING },
        deviceModel: { type: Type.STRING, description: "Contoh: Samsung Galaxy S23, iPhone 14 Pro" },
        msisdn: { type: Type.STRING, description: "Nomor telepon terakhir yang terasosiasi" },
        locationHistory: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    location: { type: Type.STRING, description: "Nama BTS atau area" },
                    timestamp: { type: Type.STRING, description: "Format ISO 8601" }
                }
            }
        }
    }
};

const sadapHpSchema = {
    type: Type.OBJECT,
    properties: {
        targetNumber: { type: Type.STRING },
        callLogs: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    direction: { type: Type.STRING, description: "Masuk atau Keluar" },
                    number: { type: Type.STRING },
                    duration: { type: Type.STRING, description: "Contoh: 2m 15s" },
                    timestamp: { type: Type.STRING, description: "Format ISO 8601" }
                }
            }
        },
        messages: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    direction: { type: Type.STRING, description: "Masuk atau Keluar" },
                    number: { type: Type.STRING },
                    content: { type: Type.STRING, description: "Isi pesan singkat" },
                    timestamp: { type: Type.STRING, description: "Format ISO 8601" }
                }
            }
        }
    }
};

const sosmedSchema = {
    type: Type.OBJECT,
    properties: {
      searchQuery: { type: Type.STRING },
      profiles: {
          type: Type.ARRAY,
          items: {
              type: Type.OBJECT,
              properties: {
                  platform: { type: Type.STRING, description: "Pilih: Facebook, Twitter, Instagram, TikTok, LinkedIn" },
                  username: { type: Type.STRING },
                  url: { type: Type.STRING },
                  bio: { type: Type.STRING, description: "Bio profil singkat" }
              }
          }
      }
    }
};

const locationSchema = {
    type: Type.OBJECT,
    properties: {
        address: { type: Type.STRING, description: "Alamat lokasi di Indonesia" },
        timestamp: { type: Type.STRING, description: "Waktu lokasi terdeteksi (format ISO 8601), harus baru saja terjadi" },
        latitude: { type: Type.NUMBER, description: "Garis lintang lokasi di Indonesia" },
        longitude: { type: Type.NUMBER, description: "Garis bujur lokasi di Indonesia" },
        accuracy: { type: Type.INTEGER, description: "Perkiraan akurasi dalam meter" },
        source: { type: Type.STRING, description: "Sumber data lokasi (misal: 'Triangulasi Sinyal GSM', 'WhatsApp Live Location', 'Postingan Instagram')" }
    },
    required: ['address', 'timestamp', 'latitude', 'longitude', 'accuracy', 'source']
};

const eTilangSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            nomorReferensi: { type: Type.STRING, description: "Nomor referensi unik untuk tilang" },
            pelanggaran: { type: Type.STRING, description: "Deskripsi pelanggaran, contoh: 'Melanggar batas kecepatan'" },
            lokasi: { type: Type.STRING, description: "Lokasi kejadian pelanggaran" },
            tanggal: { type: Type.STRING, description: "Tanggal dan waktu kejadian dalam format ISO 8601" },
            status: { type: Type.STRING, description: "Status pembayaran (Belum Dibayar, Dibayar, Kadaluarsa)" },
            denda: { type: Type.INTEGER, description: "Jumlah denda dalam Rupiah" },
        }
    }
};

const tahananSchema = {
    type: Type.OBJECT,
    properties: {
        idTahanan: { type: Type.STRING, description: "ID unik tahanan" },
        nama: { type: Type.STRING, description: "Nama lengkap tahanan" },
        fotoUrl: { type: Type.STRING, description: "URL gambar placeholder dari picsum.photos, format: https://picsum.photos/200" },
        kasus: { type: Type.STRING, description: "Kasus utama yang menjerat tahanan" },
        lokasiTahanan: { type: Type.STRING, description: "Nama lembaga pemasyarakatan atau rutan" },
        status: { type: Type.STRING, description: "Status tahanan (Aktif, Bebas, Dipindahkan)" }
    }
};

const forensikSchema = {
    type: Type.OBJECT,
    properties: {
        idKasus: { type: Type.STRING },
        ringkasan: { type: Type.STRING, description: "Ringkasan singkat dari temuan analisis forensik" },
        barangBukti: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Daftar barang bukti digital yang dianalisis" },
        analis: { type: Type.STRING, description: "Nama analis forensik yang bertanggung jawab" },
        tanggalAnalisis: { type: Type.STRING, description: "Tanggal analisis selesai dalam format ISO 8601" }
    }
};

const jaringanKomunikasiSchema = {
    type: Type.OBJECT,
    properties: {
        status: { type: Type.STRING, description: "Status keamanan jaringan (Aman, Rentan, Disadap)" },
        detail: { type: Type.STRING, description: "Penjelasan singkat mengenai status keamanan" },
        timestamp: { type: Type.STRING, description: "Waktu pengecekan dalam format ISO 8601" }
    }
};

const santetHpSchema = {
    type: Type.OBJECT,
    properties: {
        targetNumber: { type: Type.STRING },
        status: { type: Type.STRING, description: "Status operasi (BERHASIL, GAGAL, DIPROSES)" },
        message: { type: Type.STRING, description: "Pesan status yang dramatis mengenai hasil operasi" },
        effects: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Daftar efek yang terjadi pada perangkat target" }
    }
};

const dataIntelijenSchema = {
    type: Type.OBJECT,
    properties: {
        query: { type: Type.STRING },
        reportSummary: { type: Type.STRING, description: "Ringkasan laporan intelijen yang relevan" },
        relatedEntities: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Daftar entitas (orang, tempat) yang terkait" },
        confidenceLevel: { type: Type.STRING, description: "Tingkat kepercayaan data (Tinggi, Sedang, Rendah)" },
        source: { type: Type.STRING, description: "Sumber informasi intelijen (contoh: Laporan Lapangan, Analisis SIGINT)" }
    }
};


// --- Generic API Caller ---

const generateAndParse = async <T>(prompt: string, schema: object): Promise<T> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema,
                temperature: 0.9,
            },
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as T;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Gagal mengambil data dari sistem. Silakan coba lagi.");
    }
};

// --- Exported Functions ---

export const generateSuspectProfile = async (query: string): Promise<SuspectProfile> => {
    const prompt = `Buatkan profil tersangka untuk sistem pelacakan "Sistem Intelijen". Input pencarian adalah: "${query}". Hasilkan data yang terlihat sangat realistis dan relevan untuk konteks penegakan hukum di Indonesia. Nama tersangka harus nama umum di Indonesia, tetapi harus berbeda dan unik untuk setiap permintaan. Buat riwayat lokasi dan aktivitas media sosial yang konsisten secara kronologis, dengan peristiwa terbaru terjadi dalam beberapa jam terakhir. Waktu untuk 'lastKnownLocation' harus yang paling baru.`;
    const result = await generateAndParse<SuspectProfile>(prompt, profileSchema);
    // Force the last known location timestamp to be the current time for maximum realism.
    result.lastKnownLocation.timestamp = new Date().toISOString();
    return result;
};

export const generateCheckPostData = async (plate: string): Promise<CheckPostData> => {
    const prompt = `Sistem "Chek Post" mendeteksi plat nomor "${plate}". Buatkan data kendaraan yang terkait. Pastikan nama pemilik yang dihasilkan adalah nama yang umum di Indonesia dan selalu bervariasi untuk setiap permintaan.`;
    const result = await generateAndParse<CheckPostData>(prompt, checkPostSchema);
    result.lastSeen.timestamp = new Date().toISOString();
    return result;
};

export const generateMsisdnData = async (msisdn: string): Promise<MsisdnData> => {
    const prompt = `Sistem "ETRACK MSISDN" melacak nomor telepon "${msisdn}". Buatkan data registrasi dan lokasi ping terakhir untuk nomor ini. Pastikan nama terdaftar yang dihasilkan adalah nama yang umum di Indonesia dan selalu bervariasi untuk setiap permintaan.`;
    const result = await generateAndParse<MsisdnData>(prompt, msisdnSchema);
    result.lastPing.timestamp = new Date().toISOString();
    return result;
};

export const generateCekDataDiri = (nik: string): Promise<DataDiri> => {
    const prompt = `Sistem "CEK DATA DIRI" mencari NIK "${nik}". Buatkan data kependudukan dari database Dukcapil. Pastikan nama lengkap yang dihasilkan adalah nama yang umum di Indonesia dan selalu bervariasi untuk setiap permintaan.`;
    return generateAndParse<DataDiri>(prompt, dataDiriSchema);
};

export const generateTrackImei = async (imei: string): Promise<ImeiData> => {
    const prompt = `Sistem "TRACK IMEI" melacak IMEI "${imei}". Buatkan model perangkat dan riwayat 5 lokasi untuk IMEI ini. Pastikan riwayat lokasi berurutan secara kronologis, dengan lokasi terakhir terjadi dalam satu jam terakhir.`;
    const result = await generateAndParse<ImeiData>(prompt, imeiSchema);
    // Sort to ensure chronological order, just in case. Newest first.
    result.locationHistory.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return result;
};

export const generateSadapHp = async (number: string): Promise<SadapHpData> => {
    const prompt = `Sistem "SADAP HP" memonitor nomor "${number}". Buatkan 3 log panggilan dan 3 log pesan yang terjadi dalam 24 jam terakhir. Urutkan hasilnya dari yang paling baru ke yang paling lama.`;
    const result = await generateAndParse<SadapHpData>(prompt, sadapHpSchema);
    // Sort to ensure chronological order, newest first.
    result.callLogs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    result.messages.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return result;
};

export const generateCekDataSosmed = (query: string): Promise<SosmedData> => {
    const prompt = `Sistem "CEK DATA SOSMED" mencari profil media sosial untuk kata kunci "${query}". Buatkan daftar profil dari berbagai platform untuk kata kunci ini.`;
    return generateAndParse<SosmedData>(prompt, sosmedSchema);
};

export const generateGsmLocation = async (phoneNumber: string): Promise<TrackedLocation> => {
    const prompt = `Sistem "Chek Post" melakukan pelacakan lokasi via triangulasi sinyal GSM untuk nomor ${phoneNumber}. Buatkan data lokasi terkini yang realistis seolah-olah didapat dari menara BTS terdekat di sebuah kota di Indonesia.`;
    const result = await generateAndParse<TrackedLocation>(prompt, locationSchema);
    result.timestamp = new Date().toISOString();
    return result;
};

export const generateWhatsAppLocation = async (phoneNumber: string): Promise<TrackedLocation> => {
    const prompt = `Sistem "Chek Post" mencegat data lokasi dari fitur "Live Location" WhatsApp untuk nomor ${phoneNumber}. Buatkan data lokasi terkini yang sangat akurat di sebuah lokasi spesifik (seperti kafe atau taman) di Indonesia.`;
    const result = await generateAndParse<TrackedLocation>(prompt, locationSchema);
    result.timestamp = new Date().toISOString();
    return result;
};

export const generateSocialMediaLocation = async (query: string): Promise<TrackedLocation> => {
    const prompt = `Sistem "Chek Post" melacak lokasi dari aktivitas media sosial terbaru (seperti check-in atau geotag foto) untuk akun dengan username/nama "${query}". Buatkan data lokasi terkini di sebuah tempat umum yang populer di Indonesia.`;
    const result = await generateAndParse<TrackedLocation>(prompt, locationSchema);
    result.timestamp = new Date().toISOString();
    return result;
};

export const generateETilangData = (plate: string): Promise<ETilangRecord[]> => {
    const prompt = `Sistem "E-Tilang" mencari catatan pelanggaran untuk plat nomor "${plate}". Buatkan 1 sampai 3 catatan pelanggaran lalu lintas yang realistis.`;
    return generateAndParse<ETilangRecord[]>(prompt, eTilangSchema);
};

export const generateTahananData = (query: string): Promise<TahananRecord> => {
    const prompt = `Sistem "Database Tahanan" mencari data untuk "${query}". Buatkan profil seorang tahanan. Pastikan nama yang dihasilkan adalah nama yang umum di Indonesia dan selalu bervariasi untuk setiap permintaan.`;
    return generateAndParse<TahananRecord>(prompt, tahananSchema);
};

export const generateForensikData = (caseId: string): Promise<ForensikReport> => {
    const prompt = `Sistem "Analisis Forensik Digital" diminta untuk memberikan laporan kasus ID "${caseId}". Buatkan ringkasan laporan forensik yang terlihat profesional.`;
    return generateAndParse<ForensikReport>(prompt, forensikSchema);
};

export const generateJaringanKomunikasiStatus = async (): Promise<JaringanKomunikasiStatus> => {
    const prompt = `Sistem "Jaringan Komunikasi Terenkripsi" sedang memeriksa status keamanan. Buatkan hasil pemeriksaan status jaringan saat ini.`;
    const result = await generateAndParse<JaringanKomunikasiStatus>(prompt, jaringanKomunikasiSchema);
    result.timestamp = new Date().toISOString();
    return result;
};

export const generateSantetHpData = (number: string): Promise<SantetHpResult> => {
    const prompt = `Sistem "SANTET HP" diaktifkan untuk nomor target "${number}". Buatkan hasil operasi yang dramatis. Status bisa 'BERHASIL' atau 'GAGAL'. Sertakan pesan status yang menegangkan dan daftar efek yang terjadi pada perangkat target, seperti 'Layar Berkedip', 'Baterai Terkuras', 'Aplikasi Tertutup Paksa'.`;
    return generateAndParse<SantetHpResult>(prompt, santetHpSchema);
};

export const generateDataIntelijen = (query: string): Promise<DataIntelijenReport> => {
    const prompt = `Sistem "Akses Data Intelijen" menerima permintaan informasi tentang "${query}". Buatkan ringkasan laporan intelijen singkat namun padat, sebutkan entitas terkait, tingkat kepercayaan, dan sumber informasi (contoh: 'Laporan Lapangan', 'Analisis SIGINT', 'Sumber Terbuka').`;
    return generateAndParse<DataIntelijenReport>(prompt, dataIntelijenSchema);
};