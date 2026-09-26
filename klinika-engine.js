/**
 * KLINIKA.ID - SHARED DATA ENGINE & UTILITIES
 * Engine client-side berbasis localStorage untuk Hospital & Clinic Management System.
 * Mengelola data master dokter, antrean, tempat tidur (BOR), billing transaksi, dan audio synthesizer.
 */

const KlinikaEngine = (function () {
  "use strict";

  // Kunci Penyimpanan LocalStorage
  const KEYS = {
    QUEUES: "klinika_queues",
    TRANSACTIONS: "klinika_transactions",
    DOCTORS: "klinika_doctors",
    ROOMS: "klinika_rooms",
    SERVICES: "klinika_services",
    SETTINGS: "klinika_settings",
  };

  // 1. DEFAULT MASTER DATA: DOKTER SPESIALIS (8 Dokter)
  const DEFAULT_DOCTORS = [
    {
      id: "DOC-001",
      name: "dr. Jonathan Barnes, Sp.PD",
      specialty: "Spesialis Penyakit Dalam",
      polyCode: "POLI-DALAM",
      polyName: "Poli Penyakit Dalam",
      room: "Ruang 201",
      fee: 200000,
      schedule: "Senin - Kamis (09:00 - 14:00 WIB)",
      days: ["Senin", "Selasa", "Rabu", "Kamis"],
      status: "Praktik Hari Ini",
      avatar:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80",
      experience: "14 Tahun Pengalaman",
    },
    {
      id: "DOC-002",
      name: "dr. Sarah Wijaya, Sp.JP, FIHA",
      specialty: "Spesialis Jantung & Pembuluh Darah",
      polyCode: "POLI-JANTUNG",
      polyName: "Poli Jantung & Kardiovaskular",
      room: "Ruang 103",
      fee: 250000,
      schedule: "Senin - Jumat (16:00 - 20:00 WIB)",
      days: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"],
      status: "Praktik Sore",
      avatar:
        "https://images.unsplash.com/photo-1623854767648-e7bb8009f0db?auto=format&fit=crop&w=400&q=80",
      experience: "11 Tahun Pengalaman",
    },
    {
      id: "DOC-003",
      name: "dr. Hendra Gunawan, Sp.A",
      specialty: "Spesialis Kesehatan Anak (Pediatri)",
      polyCode: "POLI-ANAK",
      polyName: "Poli Anak & Tumbuh Kembang",
      room: "Ruang 104",
      fee: 180000,
      schedule: "Selasa - Sabtu (08:30 - 13:00 WIB)",
      days: ["Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
      status: "Praktik Hari Ini",
      avatar:
        "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80",
      experience: "9 Tahun Pengalaman",
    },
    {
      id: "DOC-004",
      name: "drg. Maya Putri, Sp.KGA",
      specialty: "Spesialis Gigi Anak & Konservasi Gigi",
      polyCode: "POLI-GIGI",
      polyName: "Poli Gigi & Mulut",
      room: "Ruang 105",
      fee: 150000,
      schedule: "Senin - Jumat (10:00 - 16:00 WIB)",
      days: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"],
      status: "Praktik Hari Ini",
      avatar:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
      experience: "8 Tahun Pengalaman",
    },
    {
      id: "DOC-005",
      name: "dr. Dimas Prasetyo, Sp.N",
      specialty: "Spesialis Neurologi / Saraf",
      polyCode: "POLI-SARAF",
      polyName: "Poli Saraf & Gangguan Otak",
      room: "Ruang 204",
      fee: 220000,
      schedule: "Rabu - Sabtu (13:00 - 18:00 WIB)",
      days: ["Rabu", "Kamis", "Jumat", "Sabtu"],
      status: "Praktik Hari Ini",
      avatar:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80",
      experience: "12 Tahun Pengalaman",
    },
    {
      id: "DOC-006",
      name: "dr. Cynthia Lestari, Sp.OG",
      specialty: "Spesialis Obstetri & Ginekologi (Kandungan)",
      polyCode: "POLI-KANDUNGAN",
      polyName: "Poli Kandungan & Kebidanan",
      room: "Ruang 206",
      fee: 220000,
      schedule: "Senin - Kamis (08:00 - 12:00 WIB)",
      days: ["Senin", "Selasa", "Rabu", "Kamis"],
      status: "Praktik Hari Ini",
      avatar:
        "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&w=400&q=80",
      experience: "10 Tahun Pengalaman",
    },
    {
      id: "DOC-007",
      name: "dr. Farhan Ramadhan, Sp.B",
      specialty: "Spesialis Bedah Umum",
      polyCode: "POLI-BEDAH",
      polyName: "Poli Bedah & Tindakan Medis",
      room: "Ruang 208",
      fee: 250000,
      schedule: "Senin - Jumat (14:00 - 19:00 WIB)",
      days: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"],
      status: "Praktik Sore",
      avatar:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80",
      experience: "15 Tahun Pengalaman",
    },
    {
      id: "DOC-008",
      name: "dr. Ratna Dewi, Sp.Rad",
      specialty: "Spesialis Radiologi & Diagnostik Imaging",
      polyCode: "POLI-RADIOLOGI",
      polyName: "Instalasi Radiologi & Imaging",
      room: "Ruang Lab Imaging",
      fee: 190000,
      schedule: "Senin - Sabtu (08:00 - 16:00 WIB)",
      days: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
      status: "Praktik Hari Ini",
      avatar:
        "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=400&q=80",
      experience: "9 Tahun Pengalaman",
    },
  ];

  // 2. DEFAULT MASTER DATA: KAPASITAS TEMPAT TIDUR (BOR Rawat Inap)
  const DEFAULT_ROOMS = [
    {
      classId: "VVIP",
      className: "VVIP Presidential Suite",
      totalBeds: 10,
      occupiedBeds: 8,
      ratePerDay: 1500000,
      facilities: [
        "Smart TV 55 inch",
        "Sofa Bed Keluarga",
        "Kulkas & Microwave",
        "AC & Water Heater",
        "Free High-Speed WiFi",
        "3x Menu Khusus Chef",
      ],
      floor: "Lantai 5 (Executive Wing)",
    },
    {
      classId: "VIP",
      className: "VIP Deluxe Room",
      totalBeds: 25,
      occupiedBeds: 20,
      ratePerDay: 950000,
      facilities: [
        "TV LED 43 inch",
        "Sofa Bed Penunggu",
        "Kulkas Mini",
        "AC & Kamar Mandi Dalam",
        "Free WiFi",
        "3x Makan Sehat",
      ],
      floor: "Lantai 4",
    },
    {
      classId: "KELAS-1",
      className: "Rawat Inap Kelas 1 (2 Bed)",
      totalBeds: 40,
      occupiedBeds: 32,
      ratePerDay: 500000,
      facilities: [
        "2 Pasien per Kamar",
        "Tirai Sekat Privasi",
        "TV Bersama",
        "AC & Kamar Mandi Dalam",
        "Nurse Call di Tiap Bed",
      ],
      floor: "Lantai 3",
    },
    {
      classId: "KELAS-2-3",
      className: "Rawat Inap Kelas 2 & 3",
      totalBeds: 35,
      occupiedBeds: 27,
      ratePerDay: 300000,
      facilities: [
        "4-6 Pasien per Kamar",
        "Tirai Sekat Pasien",
        "AC Central",
        "Kamar Mandi Dalam",
        "Nurse Call",
      ],
      floor: "Lantai 2",
    },
    {
      classId: "ICU",
      className: "Intensive Care Unit (ICU/NICU)",
      totalBeds: 10,
      occupiedBeds: 7,
      ratePerDay: 2200000,
      facilities: [
        "Ventilator Canggih & Monitor EKG Vital",
        "Bed Elektrik Medis",
        "Monitoring Intensif 24/7",
        "Rasio Perawat 1:1",
      ],
      floor: "Lantai 2 (Critical Wing)",
    },
  ];

  // 3. DEFAULT MASTER DATA: KATALOG TINDAKAN & OBAT
  const DEFAULT_SERVICES = {
    consultation: [
      { id: "C-UMUM", name: "Konsultasi Dokter Umum", fee: 75000 },
      { id: "C-SPESIALIS", name: "Konsultasi Dokter Spesialis", fee: 200000 },
      {
        id: "C-SUBSPESIALIS",
        name: "Konsultasi Konsultan / Subspesialis",
        fee: 350000,
      },
    ],
    procedures: [
      { id: "P-EKG", name: "Pemeriksaan Rekam Jantung (EKG)", fee: 120000 },
      { id: "P-RONTGEN", name: "Rontgen Thorax Digital (X-Ray)", fee: 180000 },
      {
        id: "P-LAB-DARAH",
        name: "Pemeriksaan Darah Lengkap (Hematologi)",
        fee: 150000,
      },
      {
        id: "P-GULA-KOLEST",
        name: "Cek Gula Darah, Asam Urat & Kolesterol",
        fee: 85000,
      },
      { id: "P-USG", name: "USG Abdomen / 4D Screening", fee: 250000 },
      { id: "P-NEBULIZER", name: "Terapi Inhalasi Nebulizer Uap", fee: 95000 },
      { id: "P-FISIO", name: "Fisioterapi & Rehabilitasi Medis", fee: 130000 },
    ],
    pharmacy: [
      {
        id: "PHARM-LIGHT",
        name: "Paket Obat Ringan (Simtomatik & Vitamin)",
        fee: 75000,
      },
      {
        id: "PHARM-MED",
        name: "Paket Obat Sedang (Antibiotik & Terapi Spesifik)",
        fee: 150000,
      },
      {
        id: "PHARM-HEAVY",
        name: "Paket Obat Lengkap / Spesialistis",
        fee: 350000,
      },
    ],
  };

  // 4. DEFAULT INITIAL DATA: ANTREAN POLIKLINIK (8 Antrean Awal)
  const DEFAULT_QUEUES = [
    {
      id: "Q-2026-001",
      queueNumber: "A-012",
      polyCode: "POLI-UMUM",
      polyName: "Poli Umum",
      patientName: "Budi Santoso",
      patientNik: "3171012304850001",
      patientPhone: "081288991122",
      gender: "Laki-laki",
      doctorName: "dr. Sarah Wijaya, Sp.JP",
      doctorRoom: "Ruang 101",
      paymentMethod: "BPJS Kesehatan",
      bpjsNumber: "0001827465910",
      timestamp: "2026-09-25T08:15:00",
      status: "Sedang Dilayani", // 'Menunggu', 'Dipanggil', 'Sedang Dilayani', 'Selesai', 'Batal'
      notes: "Demam 3 hari disertai batuk pilek",
    },
    {
      id: "Q-2026-002",
      queueNumber: "A-013",
      polyCode: "POLI-UMUM",
      polyName: "Poli Umum",
      patientName: "Siti Rahmawati",
      patientNik: "3171012304850002",
      patientPhone: "081399882233",
      gender: "Perempuan",
      doctorName: "dr. Sarah Wijaya, Sp.JP",
      doctorRoom: "Ruang 101",
      paymentMethod: "Umum / Mandiri",
      bpjsNumber: "-",
      timestamp: "2026-09-25T08:25:00",
      status: "Dipanggil",
      notes: "Keluhan pusing berputar sejak pagi",
    },
    {
      id: "Q-2026-003",
      queueNumber: "A-014",
      polyCode: "POLI-UMUM",
      polyName: "Poli Umum",
      patientName: "Ahmad Fauzi",
      patientNik: "3171012304850003",
      patientPhone: "081577663344",
      gender: "Laki-laki",
      doctorName: "dr. Sarah Wijaya, Sp.JP",
      doctorRoom: "Ruang 101",
      paymentMethod: "BPJS Kesehatan",
      bpjsNumber: "0001827465911",
      timestamp: "2026-09-25T08:35:00",
      status: "Menunggu",
      notes: "Kontrol rutin tekanan darah",
    },
    {
      id: "Q-2026-004",
      queueNumber: "B-005",
      polyCode: "POLI-ANAK",
      polyName: "Poli Anak (Pediatri)",
      patientName: "An. Rizky Pratama",
      patientNik: "3171012304850004",
      patientPhone: "081255447788",
      gender: "Laki-laki",
      doctorName: "dr. Hendra Gunawan, Sp.A",
      doctorRoom: "Ruang 104",
      paymentMethod: "Asuransi Swasta",
      bpjsNumber: "POLIS-PRU-9921",
      timestamp: "2026-09-25T08:40:00",
      status: "Sedang Dilayani",
      notes: "Imunisasi DPT lanjutan dan konsultasi gizi",
    },
    {
      id: "Q-2026-005",
      queueNumber: "B-006",
      polyCode: "POLI-ANAK",
      polyName: "Poli Anak (Pediatri)",
      patientName: "An. Kayla Azzahra",
      patientNik: "3171012304850005",
      patientPhone: "081344338899",
      gender: "Perempuan",
      doctorName: "dr. Hendra Gunawan, Sp.A",
      doctorRoom: "Ruang 104",
      paymentMethod: "BPJS Kesehatan",
      bpjsNumber: "0001827465912",
      timestamp: "2026-09-25T08:50:00",
      status: "Menunggu",
      notes: "Batuk berdahak 4 hari",
    },
    {
      id: "Q-2026-006",
      queueNumber: "C-003",
      polyCode: "POLI-GIGI",
      polyName: "Poli Gigi & Mulut",
      patientName: "Dian Permata Sari",
      patientNik: "3171012304850006",
      patientPhone: "081922334455",
      gender: "Perempuan",
      doctorName: "drg. Maya Putri, Sp.KGA",
      doctorRoom: "Ruang 105",
      paymentMethod: "Umum / Mandiri",
      bpjsNumber: "-",
      timestamp: "2026-09-25T09:00:00",
      status: "Sedang Dilayani",
      notes: "Pembersihan karang gigi (Scaling) & tambal",
    },
    {
      id: "Q-2026-007",
      queueNumber: "D-002",
      polyCode: "POLI-JANTUNG",
      polyName: "Poli Jantung & Kardiovaskular",
      patientName: "Bambang Subagio",
      patientNik: "3171012304850007",
      patientPhone: "081177889900",
      gender: "Laki-laki",
      doctorName: "dr. Sarah Wijaya, Sp.JP, FIHA",
      doctorRoom: "Ruang 103",
      paymentMethod: "BPJS Kesehatan",
      bpjsNumber: "0001827465913",
      timestamp: "2026-09-25T09:10:00",
      status: "Menunggu",
      notes: "Pemeriksaan ritme detak jantung & EKG",
    },
    {
      id: "Q-2026-008",
      queueNumber: "E-008",
      polyCode: "POLI-DALAM",
      polyName: "Poli Penyakit Dalam",
      patientName: "Hj. Nurlela",
      patientNik: "3171012304850008",
      patientPhone: "081866778899",
      gender: "Perempuan",
      doctorName: "dr. Jonathan Barnes, Sp.PD",
      doctorRoom: "Ruang 201",
      paymentMethod: "BPJS Kesehatan",
      bpjsNumber: "0001827465914",
      timestamp: "2026-09-25T08:00:00",
      status: "Selesai",
      notes: "Konsultasi diabetes melitus tipe 2 & cek lab",
    },
  ];

  // 5. DEFAULT INITIAL DATA: RIWAYAT TRANSAKSI MEDIS (8 Transaksi Awal)
  const DEFAULT_TRANSACTIONS = [
    {
      invoiceId: "INV-KLN-2026-089",
      queueNumber: "A-012",
      patientName: "Budi Santoso",
      patientNik: "3171012304850001",
      polyName: "Poli Penyakit Dalam",
      doctorName: "dr. Jonathan Barnes, Sp.PD",
      date: "2026-09-25",
      time: "08:45 WIB",
      items: [
        { name: "Jasa Konsultasi Dokter Spesialis", cost: 200000 },
        { name: "Cek Darah Lengkap & Gula Darah", cost: 150000 },
        { name: "Paket Obat Terapi Penyakit Dalam", cost: 120000 },
      ],
      subtotal: 470000,
      discountCover: 470000,
      totalDue: 0,
      paymentMethod: "BPJS Kesehatan",
      paymentStatus: "Lunas",
      cashier: "Siti Aminah, S.Ak",
      notes: "Ditanggung 100% oleh BPJS Kesehatan",
    },
    {
      invoiceId: "INV-KLN-2026-090",
      queueNumber: "C-003",
      patientName: "Dian Permata Sari",
      patientNik: "3171012304850006",
      polyName: "Poli Gigi & Mulut",
      doctorName: "drg. Maya Putri, Sp.KGA",
      date: "2026-09-25",
      time: "09:20 WIB",
      items: [
        { name: "Pemeriksaan & Konsultasi Dokter Gigi", cost: 150000 },
        {
          name: "Pembersihan Karang Gigi (Scaling Rahang Atas/Bawah)",
          cost: 250000,
        },
        { name: "Paket Obat Analgetik & Anti-inflamasi", cost: 65000 },
      ],
      subtotal: 465000,
      discountCover: 0,
      totalDue: 465000,
      paymentMethod: "Mandiri / QRIS",
      paymentStatus: "Lunas",
      cashier: "Siti Aminah, S.Ak",
      notes: "Pembayaran digital via QRIS Bank Mandiri",
    },
    {
      invoiceId: "INV-KLN-2026-091",
      queueNumber: "B-005",
      patientName: "An. Rizky Pratama",
      patientNik: "3171012304850004",
      polyName: "Poli Anak (Pediatri)",
      doctorName: "dr. Hendra Gunawan, Sp.A",
      date: "2026-09-25",
      time: "09:35 WIB",
      items: [
        { name: "Konsultasi Spesialis Anak & Tumbuh Kembang", cost: 180000 },
        { name: "Paket Vaksinasi & Imunisasi Anak", cost: 320000 },
        { name: "Vitamin & Suplemen Daya Tahan Tubuh", cost: 85000 },
      ],
      subtotal: 585000,
      discountCover: 468000, // 80% dicover asuransi
      totalDue: 117000, // Co-pay 20%
      paymentMethod: "Asuransi Swasta",
      paymentStatus: "Lunas",
      cashier: "Bambang Triatmojo",
      notes: "Prudential Asuransi (Cover 80%, Co-Pay Pasien 20%)",
    },
    {
      invoiceId: "INV-KLN-2026-092",
      queueNumber: "E-008",
      patientName: "Hj. Nurlela",
      patientNik: "3171012304850008",
      polyName: "Poli Penyakit Dalam",
      doctorName: "dr. Jonathan Barnes, Sp.PD",
      date: "2026-09-25",
      time: "09:50 WIB",
      items: [
        { name: "Konsultasi Rutin Spesialis Penyakit Dalam", cost: 200000 },
        { name: "Tes HbA1c, Kolesterol & Fungsi Ginjal", cost: 260000 },
        { name: "Paket Obat Antidiabetik Kronis 30 Hari", cost: 195000 },
      ],
      subtotal: 655000,
      discountCover: 655000,
      totalDue: 0,
      paymentMethod: "BPJS Kesehatan",
      paymentStatus: "Lunas",
      cashier: "Siti Aminah, S.Ak",
      notes: "Klaim Kronis PRB BPJS Kesehatan Lunas",
    },
    {
      invoiceId: "INV-KLN-2026-093",
      queueNumber: "D-001",
      patientName: "Ir. H. Gunawan",
      patientNik: "3171012304850009",
      polyName: "Poli Jantung & Kardiovaskular",
      doctorName: "dr. Sarah Wijaya, Sp.JP, FIHA",
      date: "2026-09-24",
      time: "14:15 WIB",
      items: [
        { name: "Pemeriksaan Spesialis Kardiologi", cost: 250000 },
        { name: "Pemeriksaan EKG & Treadmill Test", cost: 450000 },
        { name: "Echocardiografi USG Jantung", cost: 650000 },
        { name: "Obat Antihipertensi & Pengencer Darah", cost: 280000 },
      ],
      subtotal: 1630000,
      discountCover: 0,
      totalDue: 1630000,
      paymentMethod: "Kartu Debit / EDC",
      paymentStatus: "Lunas",
      cashier: "Bambang Triatmojo",
      notes: "Pembayaran Debit BCA di Loket Kasir Lantai 1",
    },
    {
      invoiceId: "INV-KLN-2026-094",
      queueNumber: "A-010",
      patientName: "Rina Marlina",
      patientNik: "3171012304850010",
      polyName: "Poli Umum",
      doctorName: "dr. Sarah Wijaya, Sp.JP",
      date: "2026-09-24",
      time: "15:30 WIB",
      items: [
        { name: "Konsultasi Dokter Umum", cost: 75000 },
        { name: "Pemeriksaan Cek Kolesterol Instan", cost: 45000 },
        { name: "Paket Obat Vitamin & Analgetik", cost: 50000 },
      ],
      subtotal: 170000,
      discountCover: 0,
      totalDue: 170000,
      paymentMethod: "Tunai / Cash",
      paymentStatus: "Lunas",
      cashier: "Siti Aminah, S.Ak",
      notes: "Pembayaran Tunai Pasien Umum",
    },
    {
      invoiceId: "INV-KLN-2026-095",
      queueNumber: "F-003",
      patientName: "Widodo Santoso",
      patientNik: "3171012304850011",
      polyName: "Instalasi Radiologi",
      doctorName: "dr. Ratna Dewi, Sp.Rad",
      date: "2026-09-24",
      time: "16:45 WIB",
      items: [
        { name: "Konsultasi & Pembacaan Hasil Radiologi", cost: 190000 },
        { name: "Rontgen Thorax AP/Lateral Digital", cost: 220000 },
        { name: "Cetak Film & File Digital DICOM", cost: 50000 },
      ],
      subtotal: 460000,
      discountCover: 460000,
      totalDue: 0,
      paymentMethod: "BPJS Kesehatan",
      paymentStatus: "Lunas",
      cashier: "Bambang Triatmojo",
      notes: "Rujukan Poli Penyakit Dalam via BPJS",
    },
    {
      invoiceId: "INV-KLN-2026-096",
      queueNumber: "G-001",
      patientName: "Melati Indah",
      patientNik: "3171012304850012",
      polyName: "Rawat Inap Deluxe (VIP)",
      doctorName: "dr. Jonathan Barnes, Sp.PD",
      date: "2026-09-24",
      time: "18:00 WIB",
      items: [
        { name: "Sewa Kamar VIP Deluxe (2 Hari)", cost: 1900000 },
        { name: "Visite Dokter Spesialis (2x)", cost: 400000 },
        { name: "Pemasangan Infus & Cairan Ringer Laktat", cost: 250000 },
        { name: "Paket Obat Farmasi Rawat Inap", cost: 420000 },
      ],
      subtotal: 2970000,
      discountCover: 2000000, // BPJS Cover Plafon
      totalDue: 970000, // Selisih biaya naik kelas
      paymentMethod: "Transfer Bank Mandiri",
      paymentStatus: "Lunas",
      cashier: "Siti Aminah, S.Ak",
      notes: "Selisih biaya hak rawat inap BPJS naik ke VIP",
    },
  ];

  // ==========================================
  // METODE INISIALISASI & SEEDING LOCALSTORAGE
  // ==========================================

  function init() {
    try {
      if (!localStorage.getItem(KEYS.DOCTORS)) {
        localStorage.setItem(KEYS.DOCTORS, JSON.stringify(DEFAULT_DOCTORS));
      } else {
        // Auto-patch jika avatar dokter masih menggunakan URL lama yang rusak
        const currentDocs = JSON.parse(
          localStorage.getItem(KEYS.DOCTORS) || "[]",
        );
        let patched = false;
        currentDocs.forEach((d) => {
          if (
            d.id === "DOC-002" &&
            d.avatar !==
              "https://images.unsplash.com/photo-1623854767648-e7bb8009f0db?auto=format&fit=crop&w=400&q=80"
          ) {
            d.avatar =
              "https://images.unsplash.com/photo-1623854767648-e7bb8009f0db?auto=format&fit=crop&w=400&q=80";
            patched = true;
          }
        });
        if (patched) {
          localStorage.setItem(KEYS.DOCTORS, JSON.stringify(currentDocs));
        }
      }
      if (!localStorage.getItem(KEYS.ROOMS)) {
        localStorage.setItem(KEYS.ROOMS, JSON.stringify(DEFAULT_ROOMS));
      }
      if (!localStorage.getItem(KEYS.SERVICES)) {
        localStorage.setItem(KEYS.SERVICES, JSON.stringify(DEFAULT_SERVICES));
      }
      if (!localStorage.getItem(KEYS.QUEUES)) {
        localStorage.setItem(KEYS.QUEUES, JSON.stringify(DEFAULT_QUEUES));
      }
      if (!localStorage.getItem(KEYS.TRANSACTIONS)) {
        localStorage.setItem(
          KEYS.TRANSACTIONS,
          JSON.stringify(DEFAULT_TRANSACTIONS),
        );
      }
      console.log(
        "✅ KlinikaEngine: Inisialisasi master data localStorage berhasil.",
      );
    } catch (e) {
      console.warn(
        "⚠️ KlinikaEngine: LocalStorage tidak dapat diakses atau dibatasi browser.",
        e,
      );
    }
  }

  function resetToDefaults() {
    try {
      localStorage.setItem(KEYS.DOCTORS, JSON.stringify(DEFAULT_DOCTORS));
      localStorage.setItem(KEYS.ROOMS, JSON.stringify(DEFAULT_ROOMS));
      localStorage.setItem(KEYS.SERVICES, JSON.stringify(DEFAULT_SERVICES));
      localStorage.setItem(KEYS.QUEUES, JSON.stringify(DEFAULT_QUEUES));
      localStorage.setItem(
        KEYS.TRANSACTIONS,
        JSON.stringify(DEFAULT_TRANSACTIONS),
      );
      console.log(
        "🔄 KlinikaEngine: Data berhasil di-reset ke sample seeding default.",
      );
      dispatchUpdate();
      return true;
    } catch (e) {
      console.error("Gagal reset data:", e);
      return false;
    }
  }

  function dispatchUpdate() {
    window.dispatchEvent(
      new CustomEvent("klinika_data_updated", {
        detail: { timestamp: new Date().toISOString() },
      }),
    );
  }

  // ==========================================
  // HELPER FORMAT & GENERATOR
  // ==========================================

  function formatRupiah(number) {
    if (isNaN(number) || number === null) return "Rp 0";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  }

  function formatTanggal(isoOrDateStr) {
    if (!isoOrDateStr) return "-";
    const date = new Date(isoOrDateStr);
    if (isNaN(date.getTime())) return isoOrDateStr;
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  function formatWaktu(isoOrDateStr) {
    if (!isoOrDateStr) return "-";
    const date = new Date(isoOrDateStr);
    if (isNaN(date.getTime())) return isoOrDateStr;
    return (
      date.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }) + " WIB"
    );
  }

  function generateRMNumber() {
    const year = new Date().getFullYear();
    const queues = getQueues();
    const sequence = String(queues.length + 158).padStart(4, "0");
    return `RM-${year}-${sequence}`;
  }

  function getPolyPrefix(polyCode) {
    switch (polyCode) {
      case "POLI-UMUM":
        return "A";
      case "POLI-ANAK":
        return "B";
      case "POLI-GIGI":
        return "C";
      case "POLI-JANTUNG":
        return "D";
      case "POLI-DALAM":
        return "E";
      case "POLI-SARAF":
        return "F";
      case "POLI-KANDUNGAN":
        return "G";
      case "POLI-BEDAH":
        return "H";
      default:
        return "A";
    }
  }

  function generateQueueNumber(polyCode) {
    const prefix = getPolyPrefix(polyCode);
    const queues = getQueues();
    const samePolyQueues = queues.filter(
      (q) => q.queueNumber && q.queueNumber.startsWith(prefix),
    );
    const nextNum = samePolyQueues.length + 1;
    return `${prefix}-${String(nextNum).padStart(3, "0")}`;
  }

  function generateInvoiceId() {
    const year = new Date().getFullYear();
    const txs = getTransactions();
    const seq = String(txs.length + 89).padStart(3, "0");
    return `INV-KLN-${year}-${seq}`;
  }

  // ==========================================
  // OPERASI DATA ANTREAN (QUEUES)
  // ==========================================

  function getQueues() {
    try {
      const data = localStorage.getItem(KEYS.QUEUES);
      return data ? JSON.parse(data) : DEFAULT_QUEUES;
    } catch (e) {
      return DEFAULT_QUEUES;
    }
  }

  function saveQueues(queues) {
    try {
      localStorage.setItem(KEYS.QUEUES, JSON.stringify(queues));
      dispatchUpdate();
      return true;
    } catch (e) {
      console.error("Error saveQueues:", e);
      return false;
    }
  }

  function addQueue(formData) {
    const queues = getQueues();
    const polyCode = formData.polyCode || "POLI-UMUM";
    const queueNumber = formData.queueNumber || generateQueueNumber(polyCode);
    const now = new Date();

    const newQueue = {
      id: "Q-" + now.getTime(),
      queueNumber: queueNumber,
      polyCode: polyCode,
      polyName: formData.polyName || "Poli Umum",
      patientName: formData.patientName || "Pasien Umum",
      patientNik: formData.patientNik || "-",
      patientPhone: formData.patientPhone || "-",
      gender: formData.gender || "Laki-laki",
      doctorName: formData.doctorName || "dr. Sarah Wijaya, Sp.JP",
      doctorRoom: formData.doctorRoom || "Ruang 101",
      paymentMethod: formData.paymentMethod || "Umum / Mandiri",
      bpjsNumber: formData.bpjsNumber || "-",
      timestamp: now.toISOString(),
      status: "Menunggu",
      notes: formData.notes || "-",
    };

    queues.unshift(newQueue);
    saveQueues(queues);
    return newQueue;
  }

  function updateQueueStatus(queueIdOrNumber, newStatus) {
    const queues = getQueues();
    const target = queues.find(
      (q) => q.id === queueIdOrNumber || q.queueNumber === queueIdOrNumber,
    );
    if (target) {
      target.status = newStatus;
      saveQueues(queues);
      return target;
    }
    return null;
  }

  function getActiveQueueByPoly(polyCode) {
    const queues = getQueues();
    return (
      queues.find(
        (q) =>
          (!polyCode || q.polyCode === polyCode) &&
          (q.status === "Sedang Dilayani" || q.status === "Dipanggil"),
      ) || null
    );
  }

  function getNextWaitingQueue(polyCode) {
    const queues = getQueues();
    return queues.filter(
      (q) => (!polyCode || q.polyCode === polyCode) && q.status === "Menunggu",
    );
  }

  // ==========================================
  // OPERASI DATA TRANSAKSI (TRANSACTIONS)
  // ==========================================

  function getTransactions() {
    try {
      const data = localStorage.getItem(KEYS.TRANSACTIONS);
      return data ? JSON.parse(data) : DEFAULT_TRANSACTIONS;
    } catch (e) {
      return DEFAULT_TRANSACTIONS;
    }
  }

  function saveTransactions(transactions) {
    try {
      localStorage.setItem(KEYS.TRANSACTIONS, JSON.stringify(transactions));
      dispatchUpdate();
      return true;
    } catch (e) {
      console.error("Error saveTransactions:", e);
      return false;
    }
  }

  function addTransaction(txData) {
    const transactions = getTransactions();
    const now = new Date();

    const newTx = {
      invoiceId: txData.invoiceId || generateInvoiceId(),
      queueNumber: txData.queueNumber || "-",
      patientName: txData.patientName || "Pasien",
      patientNik: txData.patientNik || "-",
      polyName: txData.polyName || "Rawat Jalan",
      doctorName: txData.doctorName || "dr. Jaga",
      date: now.toISOString().split("T")[0],
      time:
        now.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }) + " WIB",
      items: txData.items || [],
      subtotal: txData.subtotal || 0,
      discountCover: txData.discountCover || 0,
      totalDue: txData.totalDue || 0,
      paymentMethod: txData.paymentMethod || "Mandiri / Cash",
      paymentStatus: txData.paymentStatus || "Lunas",
      cashier: txData.cashier || "Kasir Klinika.id",
      notes: txData.notes || "Transaksi pelayanan medis",
    };

    transactions.unshift(newTx);
    saveTransactions(transactions);
    return newTx;
  }

  // ==========================================
  // OPERASI DATA DOKTER & KAMAR
  // ==========================================

  function getDoctors() {
    try {
      const data = localStorage.getItem(KEYS.DOCTORS);
      return data ? JSON.parse(data) : DEFAULT_DOCTORS;
    } catch (e) {
      return DEFAULT_DOCTORS;
    }
  }

  function getRooms() {
    try {
      const data = localStorage.getItem(KEYS.ROOMS);
      return data ? JSON.parse(data) : DEFAULT_ROOMS;
    } catch (e) {
      return DEFAULT_ROOMS;
    }
  }

  function getServices() {
    try {
      const data = localStorage.getItem(KEYS.SERVICES);
      return data ? JSON.parse(data) : DEFAULT_SERVICES;
    } catch (e) {
      return DEFAULT_SERVICES;
    }
  }

  // ==========================================
  // METRIK & KPI AGGREGATOR
  // ==========================================

  function getKPIStats() {
    const queues = getQueues();
    const transactions = getTransactions();
    const rooms = getRooms();

    // 1. Total Kunjungan
    const totalVisits = queues.length + 134; // Agregat realistis harian

    // 2. Antrean Aktif
    const activeQueues = queues.filter(
      (q) => q.status === "Menunggu" || q.status === "Dipanggil",
    ).length;

    // 3. Bed Occupancy Rate (BOR)
    let totalBeds = 0;
    let occupiedBeds = 0;
    rooms.forEach((r) => {
      totalBeds += r.totalBeds;
      occupiedBeds += r.occupiedBeds;
    });
    const borPercentage =
      totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 78;

    // 4. Pendapatan Harian
    const todayTotalRevenue = transactions.reduce(
      (sum, tx) => sum + (tx.subtotal || 0),
      28450000,
    );

    return {
      totalVisits: totalVisits,
      activeQueues: activeQueues,
      totalBeds: totalBeds,
      occupiedBeds: occupiedBeds,
      borPercentage: borPercentage,
      totalRevenue: todayTotalRevenue,
      formattedRevenue: formatRupiah(todayTotalRevenue),
    };
  }

  // ==========================================
  // VOICE & AUDIO SYNTHESIZER (WEB SPEECH API)
  // ==========================================

  function playChime() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.15); // A5

      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } catch (e) {
      console.log("AudioContext chime not available.");
    }
  }

  function speakQueue(queueNumber, polyName, roomName) {
    playChime();

    if ("speechSynthesis" in window) {
      setTimeout(() => {
        window.speechSynthesis.cancel(); // Hentikan suara sebelumnya jika ada

        // Pisahkan huruf dan angka agar dieja dengan jelas
        const parts = (queueNumber || "").split("-");
        let spelledNumber = queueNumber;
        if (parts.length === 2) {
          const letter = parts[0];
          const digits = parts[1].split("").join(" ");
          spelledNumber = `${letter}, ${digits}`;
        }

        const textToSpeak = `Nomor antrean... ${spelledNumber}... silakan menuju ke ${polyName || "Poliklinik"}, ${roomName || "Ruang Periksa"}`;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = "id-ID";
        utterance.rate = 0.88;
        utterance.pitch = 1.05;

        // Coba temukan suara Bahasa Indonesia
        const voices = window.speechSynthesis.getVoices();
        const idVoice = voices.find(
          (v) => v.lang.includes("id") || v.lang.includes("ID"),
        );
        if (idVoice) {
          utterance.voice = idVoice;
        }

        window.speechSynthesis.speak(utterance);
      }, 500);
    } else {
      console.warn("SpeechSynthesis API tidak didukung pada browser ini.");
    }
  }

  // ==========================================
  // EXPORT DATA KE CSV
  // ==========================================

  function exportTransactionsToCSV() {
    const transactions = getTransactions();
    if (!transactions || transactions.length === 0) {
      alert("Tidak ada data transaksi untuk diekspor.");
      return;
    }

    const headers = [
      "No. Invoice",
      "No. RM / Pasien",
      "Poliklinik",
      "Dokter",
      "Tanggal",
      "Waktu",
      "Metode Bayar",
      "Subtotal (IDR)",
      "Diskon/Cover (IDR)",
      "Total Bayar Pasien (IDR)",
      "Status Pembayaran",
    ];

    const rows = transactions.map((tx) => [
      `"${tx.invoiceId}"`,
      `"${tx.patientName}"`,
      `"${tx.polyName}"`,
      `"${tx.doctorName}"`,
      `"${tx.date}"`,
      `"${tx.time}"`,
      `"${tx.paymentMethod}"`,
      tx.subtotal,
      tx.discountCover,
      tx.totalDue,
      `"${tx.paymentStatus}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `Laporan_Transaksi_Klinika_${new Date().toISOString().split("T")[0]}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Otomatis jalankan inisialisasi
  init();

  // Public API
  return {
    init: init,
    resetToDefaults: resetToDefaults,
    formatRupiah: formatRupiah,
    formatTanggal: formatTanggal,
    formatWaktu: formatWaktu,
    generateRMNumber: generateRMNumber,
    generateQueueNumber: generateQueueNumber,
    generateInvoiceId: generateInvoiceId,
    getQueues: getQueues,
    saveQueues: saveQueues,
    addQueue: addQueue,
    updateQueueStatus: updateQueueStatus,
    getActiveQueueByPoly: getActiveQueueByPoly,
    getNextWaitingQueue: getNextWaitingQueue,
    getTransactions: getTransactions,
    saveTransactions: saveTransactions,
    addTransaction: addTransaction,
    getDoctors: getDoctors,
    getRooms: getRooms,
    getServices: getServices,
    getKPIStats: getKPIStats,
    speakQueue: speakQueue,
    playChime: playChime,
    exportTransactionsToCSV: exportTransactionsToCSV,
  };
})();

// Daftarkan ke window agar bisa diakses global oleh seluruh skrip halaman
if (typeof window !== "undefined") {
  window.KlinikaEngine = KlinikaEngine;
}
