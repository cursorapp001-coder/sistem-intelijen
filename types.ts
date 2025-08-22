export interface LocationData {
  address: string;
  timestamp: string;
  latitude: number;
  longitude: number;
}

export interface LocationHistoryItem {
  address: string;
  timestamp: string;
}

export interface SocialMediaPost {
  platform: 'Facebook' | 'Twitter' | 'Instagram' | 'TikTok' | 'LinkedIn';
  post: string;
  timestamp: string;
  url: string;
}

export interface SocialMediaProfile {
  platform: 'Facebook' | 'Twitter' | 'Instagram' | 'TikTok' | 'LinkedIn';
  username: string;
  url: string;
}

export interface SuspectProfile {
  name: string;
  age: number;
  status: 'Buron' | 'Diawasi' | 'Dicari';
  phoneNumber: string;
  photoUrl: string;
  lastKnownLocation: LocationData;
  locationHistory: LocationHistoryItem[];
  socialMediaProfiles: SocialMediaProfile[];
  recentActivity: SocialMediaPost[];
}

export interface CheckPostData {
  plateNumber: string;
  ownerName: string;
  vehicleType: string;
  color: string;
  registrationYear: number;
  status: string;
  lastSeen: {
    location: string;
    timestamp: string;
  };
}

export interface MsisdnData {
  msisdn: string;
  registeredName: string;
  address: string;
  provider: string;
  lastPing: {
    location: string;
    latitude: number;
    longitude: number;
    timestamp: string;
  };
}

export interface DataDiri {
  nik: string;
  fullName: string;
  dateOfBirth: string;
  address: string;
  occupation: string;
  maritalStatus: string;
  photoUrl: string;
}

export interface ImeiData {
  imei: string;
  deviceModel: string;
  msisdn: string;
  locationHistory: {
    location: string;
    timestamp: string;
  }[];
}

export interface SadapHpData {
  targetNumber: string;
  callLogs: {
    direction: 'Masuk' | 'Keluar';
    number: string;
    duration: string;
    timestamp: string;
  }[];
  messages: {
    direction: 'Masuk' | 'Keluar';
    number: string;
    content: string;
    timestamp: string;
  }[];
}

export interface SosmedData {
  searchQuery: string;
  profiles: {
    platform: 'Facebook' | 'Twitter' | 'Instagram' | 'TikTok' | 'LinkedIn';
    username: string;
    url: string;
    bio: string;
  }[];
}

export interface TrackedLocation {
  address: string;
  timestamp: string;
  latitude: number;
  longitude: number;
  accuracy: number;
  source: string;
}

export interface SantetHpResult {
  targetNumber: string;
  status: 'BERHASIL' | 'GAGAL' | 'DIPROSES';
  message: string;
  effects: string[];
}

export interface DataIntelijenReport {
  query: string;
  reportSummary: string;
  relatedEntities: string[];
  confidenceLevel: 'Tinggi' | 'Sedang' | 'Rendah';
  source: string;
}

export interface ETilangRecord {
  nomorReferensi: string;
  pelanggaran: string;
  lokasi: string;
  tanggal: string; // ISO 8601
  status: 'Belum Dibayar' | 'Dibayar' | 'Kadaluarsa';
  denda: number;
}

export interface TahananRecord {
    idTahanan: string;
    nama: string;
    fotoUrl: string;
    kasus: string;
    lokasiTahanan: string;
    status: 'Aktif' | 'Bebas' | 'Dipindahkan';
}

export interface ForensikReport {
    idKasus: string;
    ringkasan: string;
    barangBukti: string[];
    analis: string;
    tanggalAnalisis: string; // ISO 8601
}

export interface JaringanKomunikasiStatus {
    status: 'Aman' | 'Rentan' | 'Disadap';
    detail: string;
    timestamp: string; // ISO 8601
}
