# 📘 DEVELOPER.MD — Bimblue & Teach Blue

Dokumen ini adalah panduan teknis utama (*Single Source of Truth*) bagi tim **Frontend (Expo / React Native)** dan **Backend (Next.js App Router + PostgreSQL/Supabase)** dalam mengembangkan ekosistem **Bimblue** (User/Siswa) dan **Teach Blue** (Admin/Tutor & Superadmin).

## 1. Struktur Folder Proyek (End-to-End)

Berdasarkan repositori saat ini (`Bimblue-4fc8767`) yang telah memiliki fondasi `before` (Onboarding/Splash) dan `Authenticate` (User & Admin Auth), berikut adalah struktur folder lengkap yang menggabungkan kondisi saat ini (*Existing*) dan modul yang wajib dibangun (*To-Be*) beserta sisi Backend Next.js:

```
bimblue-ecosystem/
├── apps/
│   ├── mobile/                                  # [FRONTEND] Expo Router (React Native)
│   │   ├── assets/
│   │   │   └── images/
│   │   │       ├── tabIcons/                    # [Existing] Ikon navigasi bawah
│   │   │       └── teach-blue/                  # [Existing] 19 aset SVG khusus Teach Blue
│   │   ├── src/
│   │   │   ├── app/                             # File-based Routing (Expo Router)
│   │   │   │   ├── _layout.tsx                  # [Existing] Root Layout, Auth & Theme Provider
│   │   │   │   ├── index.tsx                    # [Existing] Entry Gate / Role Redirector
│   │   │   │   ├── before/                      # [Existing] Pre-Auth Screens
│   │   │   │   │   ├── splash.tsx
│   │   │   │   │   ├── motivation-splash.tsx
│   │   │   │   │   └── onboarding.tsx
│   │   │   │   ├── Authenticate/                # [Existing] Auth & Partner Verification Flow
│   │   │   │   │   ├── login.tsx
│   │   │   │   │   ├── register.tsx
│   │   │   │   │   ├── otp-verification.tsx
│   │   │   │   │   ├── user-info.tsx
│   │   │   │   │   ├── forgot-password.tsx
│   │   │   │   │   ├── forgot-password-otp.tsx
│   │   │   │   │   ├── reset-password.tsx
│   │   │   │   │   └── admin/
│   │   │   │   │       ├── register.tsx
│   │   │   │   │       ├── otp-verification.tsx
│   │   │   │   │       ├── profile.tsx          # Form Perseorangan vs Instansi + Upload
│   │   │   │   │       ├── pending-validation.tsx
│   │   │   │   │       ├── document-revision.tsx
│   │   │   │       │   └── validated.tsx
│   │   │   │   ├── (user)/                      # [To-Be] Modul Pelajar (Bimblue)
│   │   │   │   │   ├── _layout.tsx              # Bottom Tabs: Beranda, Chat & Pesanan, Profil
│   │   │   │   │   ├── home/
│   │   │   │   │   │   ├── index.tsx            # Beranda & Discovery
│   │   │   │   │   │   ├── search.tsx           # Pencarian, Filter & Sortir
│   │   │   │   │   │   ├── subjects/index.tsx   # Daftar 15+ Mata Pelajaran
│   │   │   │   │   │   ├── tutor/[id].tsx       # Profil Publik Tutor / Lembaga
│   │   │   │   │   │   └── package/[id].tsx     # Detail Paket Bimbel
│   │   │   │   │   ├── learn-contact/
│   │   │   │   │   │   ├── index.tsx            # Tab: Riwayat Chat, Komunitas, Pesanan
│   │   │   │   │   │   ├── chat/[roomId].tsx    # Ruang Chat 1-on-1 & Kartu Penawaran
│   │   │   │   │   │   ├── community/[id].tsx   # Detail, Join Request & Ruang Komunitas
│   │   │   │   │   │   ├── checkout/[orderId].tsx
│   │   │   │   │   │   └── payment/[orderId].tsx
│   │   │   │   │   └── profile/
│   │   │   │   │       ├── index.tsx            # Menu Profil Pelajar
│   │   │   │   │       ├── detail.tsx           # Detail Pelajar & Dokumen (Ijazah/Rapor)
│   │   │   │   │       ├── preferences.tsx      # Preferensi Belajar, Radius & Budget
│   │   │   │   │       ├── saved-items.tsx      # Koleksi Chat & Materi Tersimpan
│   │   │   │   │       ├── change-password.tsx
│   │   │   │   │       ├── notifications.tsx
│   │   │   │   │       └── faq.tsx
│   │   │   │   ├── (admin)/                     # [To-Be] Modul Pengajar (Teach Blue)
│   │   │   │   │   ├── _layout.tsx              # Bottom Tabs: Dasbor, Paket Les, Akun
│   │   │   │   │   ├── dashboard/
│   │   │   │   │   │   ├── index.tsx            # Ringkasan Metrik, Siswa & Chat Terkini
│   │   │   │   │   │   ├── statistics.tsx       # Grafik Aktivitas Bulanan & Respons
│   │   │   │   │   │   ├── students/index.tsx   # Daftar Siswa Aktif
│   │   │   │   │   │   ├── students/[id].tsx    # Detail Progres Pertemuan & Presensi
│   │   │   │   │   │   ├── chat/index.tsx       # Daftar Chat Masuk
│   │   │   │   │   │   ├── chat/[roomId].tsx    # Ruang Chat Admin + Buat Penawaran
│   │   │   │   │   │   ├── earnings/index.tsx   # Pendapatan Bersih (Potongan 3%)
│   │   │   │   │   │   ├── earnings/withdraw.tsx# Ambil Pendapatan (Syarat 27 Poin)
│   │   │   │   │   │   └── points/              # Ekosistem Poin Ku
│   │   │   │   │   │       ├── index.tsx        # Saldo & Riwayat Mutasi Poin
│   │   │   │   │   │       ├── topup.tsx        # Beli Poin (30, 60, 100) & Upload Bukti
│   │   │   │   │   │       └── events.tsx       # Tugas Event & Klaim Bonus Poin
│   │   │   │   │   ├── products/
│   │   │   │   │   │   ├── index.tsx            # Katalog Paket Les
│   │   │   │   │   │   ├── create.tsx           # Tambah Paket
│   │   │   │   │   │   └── [id]/edit.tsx        # Edit & Soft-Delete Paket
│   │   │   │   │   └── account/
│   │   │   │   │       ├── index.tsx            # Pusat Kendali Admin & Ringkasan Dokumen
│   │   │   │   │       ├── edit-profile.tsx
│   │   │   │   │       ├── documents/index.tsx  # Status 3 Dokumen Verifikasi
│   │   │   │   │       ├── documents/upload.tsx # Unggah / Revisi Dokumen
│   │   │   │   │       ├── bank-account.tsx     # Rekening Penerima Penarikan
│   │   │   │   │       └── settings.tsx
│   │   │   │   └── (superadmin)/                # [To-Be] Modul Pengelola Sistem
│   │   │   │       ├── _layout.tsx
│   │   │   │       ├── index.tsx                # Dashboard Global Platform
│   │   │   │       ├── partners/[id].tsx        # Persetujuan Pengajuan Mitra
│   │   │   │       ├── documents/[id].tsx       # Keputusan Verifikasi Dokumen Admin
│   │   │   │       ├── finance/index.tsx        # Verifikasi Top-Up Poin & Pencairan Dana
│   │   │   │       └── moderation/[userId].tsx  # Suspend / Nonaktifkan Akun
│   │   │   ├── components/                      # Komponen UI Terpadu
│   │   │   ├── services/                        # REST API Client & Endpoints
│   │   │   ├── stores/                          # Global State (Zustand)
│   │   │   ├── hooks/                           # Custom Hooks
│   │   │   ├── constants/                       # Tema & Konfigurasi
│   │   │   └── types/                           # Definisi TypeScript & DTO
│   └── backend/                                 # [BACKEND] Next.js App Router
│       ├── src/
│       │   ├── app/
│       │   │   ├── (superadmin-web)/            # Panel Web Superadmin
│       │   │   └── api/v1/                      # REST API Route Handlers
│       │   ├── lib/                             # DB Client, Auth JWT, Storage, Payment
│       │   ├── services/                        # Business Logic Layer
│       │   ├── validators/                      # Zod Schemas
│       │   └── middleware.ts                    # Auth, RBAC & Rate Limit Middleware
│       └── supabase/migrations/                 # File migrasi SQL (BIMBLUE.sql)

```

## 2. Sisi Frontend: Isi Folder & Pemanggilan Komponen

Bagian ini memetakan komponen di dalam `src/components/` beserta layar mana saja yang wajib memanggilnya agar tidak terjadi duplikasi kode.

### A. Komponen yang Sudah Ada (`src/components/authenticate/`)

1. **`AuthBrand.tsx`**: Header logo dan identitas visual Bimblue / Teach Blue.

   * *Dipanggil di*: Seluruh layar di `src/app/Authenticate/**`.

2. **`AuthControls.tsx`**: Input teks berikon, *password field* dengan toggle mata (`password-eye.svg`), tombol utama, dan pemilih opsi (*Segmented Control* Perseorangan vs Instansi).

   * *Dipanggil di*: `login.tsx`, `register.tsx`, `user-info.tsx`, `admin/profile.tsx`, serta dapat diekstrak ke `components/ui/` untuk form profil & produk.

3. **`FileUploadCard.tsx`**: Kartu pemilih dokumen (PDF/JPG/PNG) lengkap dengan pratinjau nama berkas dan ukuran.

   * *Dipanggil di*: `Authenticate/admin/profile.tsx`, `Authenticate/admin/document-revision.tsx`, `(admin)/account/documents/upload.tsx`, `(admin)/dashboard/points/topup.tsx` (bukti transfer), dan `(user)/profile/detail.tsx` (unggah rapor/ijazah siswa).

4. **`AuthFileStatusCard.tsx`**: Kartu indikator status dokumen (`Disetujui`, `Sedang ditinjau`, `Ditolak` beserta pesan alasan revisi).

   * *Dipanggil di*: `Authenticate/admin/pending-validation.tsx`, `document-revision.tsx`, `(admin)/account/documents/index.tsx`.

5. **`TeachBlueComponents.tsx` & `theme.ts`**: Banner status validasi, *timeline clock*, dan palet warna spesifik Teach Blue.

### B. Komponen Baru yang Wajib Dibuat (`src/components/`)

| Folder / Nama Komponen | Kegunaan Utama | Dipanggil pada Layar (`src/app/...`) | 
| ----- | ----- | ----- | 
| `common/VisibilityBanner.tsx` | Menampilkan peringatan *"2 dari 3 dokumen disetujui. Profil & produk belum tampil publik"*. | `(admin)/dashboard/index.tsx`, `(admin)/products/index.tsx`, `(admin)/products/create.tsx`, `(admin)/account/index.tsx` | 
| `discovery/TutorCard.tsx` | Kartu ringkasan tutor (Rating $\star$, nama, mapel, tarif/sesi). | `(user)/home/index.tsx`, `(user)/home/search.tsx` | 
| `discovery/SubjectChipGrid.tsx` | Grid 15 mata pelajaran dengan *multi-select* atau navigasi. | `(user)/home/index.tsx`, `(user)/home/subjects/index.tsx`, `(user)/profile/preferences.tsx` | 
| `discovery/FilterBottomSheet.tsx` | Modal filter jenjang, metode (Online/Offline/Hybrid), radius ($2\text{ km}$, $5\text{ km}$, $10\text{ km}$), & budget. | `(user)/home/search.tsx`, `(user)/profile/preferences.tsx` | 
| `chat/ChatBubble.tsx` | Gelembung pesan teks, lampiran materi PDF/Video, status waktu & `Dibaca`, serta aksi *Bookmark*. | `(user)/learn-contact/chat/[roomId].tsx`, `(admin)/dashboard/chat/[roomId].tsx` | 
| `chat/InChatOfferCard.tsx` | Kartu **Penawaran Bimbel Privat** di dalam ruang chat dengan tombol `Pesan sekarang`. | `(user)/learn-contact/chat/[roomId].tsx` (tampilan tombol checkout), `(admin)/dashboard/chat/[roomId].tsx` (modal pembuat penawaran) | 
| `community/CommunityPostCard.tsx` | Render postingan komunitas: Teks, Video Bekal UTBK, *Polling* interaktif, dan 5 tombol reaksi emoji (❤️, 😊, 👍, 😭, 🔥). | `(user)/learn-contact/community/[id].tsx` | 
| `transaction/OrderSummaryCard.tsx` | Ringkasan pesanan (`BLJ-YYMMDD-XXX`), batas waktu bayar, dan status lunas/menunggu. | `(user)/learn-contact/index.tsx`, `checkout/[orderId].tsx`, `payment/[orderId].tsx` | 
| `admin/EarningsChartCard.tsx` | Grafik batang aktivitas mingguan & pendapatan bruto vs bersih. | `(admin)/dashboard/index.tsx`, `(admin)/dashboard/statistics.tsx`, `(admin)/dashboard/earnings/index.tsx` | 
| `admin/StudentProgressCard.tsx` | Kartu siswa dengan *progress bar* pertemuan (misal $4/8$ pertemuan $\rightarrow 50\%$) & jadwal berikutnya. | `(admin)/dashboard/students/index.tsx`, `(admin)/dashboard/students/[id].tsx` | 
| `admin/EventTaskCard.tsx` | Kartu misi pengajar dengan tahapan langkah (*multi-step*) dan tombol `Ikuti Event` / `Klaim`. | `(admin)/dashboard/points/events.tsx` | 
| `admin/WithdrawalTimeline.tsx` | Stepper 4 tahap pencairan dana (`Diajukan` $\rightarrow$ `Diverifikasi` $\rightarrow$ `Diproses` $\rightarrow$ `Berhasil`). | `(admin)/dashboard/earnings/index.tsx`, `(admin)/dashboard/earnings/withdraw.tsx` | 
| `feedback/StateViews.tsx` | Komponen terpusat untuk *Loading Skeleton*, *Empty State*, *Offline State*, dan *Modal Konfirmasi*. | Seluruh layar yang memuat data asinkron atau aksi destruktif (Logout, Hapus Produk). | 

## 3. Integrasi REST API dalam Frontend

Semua komunikasi jaringan diletakkan di `src/services/` menggunakan `axios` atau `fetch` wrapper yang terhubung dengan **TanStack Query (React Query)**.

### Struktur Folder `src/services/`

* `apiClient.ts`: Konfigurasi `BASE_URL`, *Request Interceptor* (menyisipkan header `Authorization: Bearer <access_token>` dari `expo-secure-store`), dan *Response Interceptor* (menangani *auto-refresh token* pada HTTP `401` dan deteksi *Offline Mode*).

* `auth.service.ts`: Login, registrasi user/admin, verifikasi OTP, *reset password*, dan *onboarding* profil.

* `discovery.service.ts`: Mengambil daftar pelajaran, pencarian tutor dengan parameter geospasial (`lat`, `lng`, `radius_km`), detail tutor, dan paket les.

* `chat.service.ts`: Mengambil daftar *room*, pesan per *room*, mengirim pesan/lampiran, membuat *In-Chat Offer*, dan *bookmark* pesan.

* `community.service.ts`: Detail komunitas, pengajuan gabung (*join request*), daftar postingan, *vote polling*, dan reaksi emoji.

* `order.service.ts`: *Checkout* paket/penawaran chat, memilih metode pembayaran, mengecek status pembayaran (`BLJ-...`), dan mengirim ulasan/rating.

* `admin.service.ts`: Metrik dashboard, CRUD paket les, manajemen dokumen verifikasi, buku besar pendapatan, pengajuan *withdrawal* (`WDR-...`), top-up poin (`POIN-...`), dan klaim event.

## 4. Batasan (Constraints & Guardrails) di Setiap Tampilan Frontend

Developer Frontend **wajib** menerapkan validasi dan batasan UI berikut sebelum mengirimkan request ke Backend:

1. **Layar Autentikasi & OTP (`Authenticate/*`)**:

   * Password minimal $8$ karakter dan wajib identik dengan *Konfirmasi Password*.

   * Input OTP wajib $6$ digit numerik.

   * Tombol `Kirim ulang OTP` dikunci (*disabled*) dengan hitung mundur $30\text{ detik}$, sedangkan masa berlaku kode ditampilkan $5\text{ menit}$.

2. **Layar Dokumen Verifikasi Admin (`Authenticate/admin/profile.tsx` & `account/documents/*`)**:

   * Tipe **Perseorangan**: Wajib mengunggah $2$ berkas (KTP & Ijazah/Sertifikat).

   * Tipe **Instansi**: Wajib mengunggah $2$ berkas (Izin Lembaga/NIB & KTP Penanggung Jawab), sedangkan Ijazah Pengajar Utama bersifat opsional.

   * Validasi di sisi *client* sebelum unggah: format hanya `.pdf`, `.jpg`, `.jpeg`, `.png` dengan ukuran maksimal $5\text{ MB}$ ($5.242.880\text{ bytes}$).

   * Pada layar `document-revision.tsx`, dokumen yang sudah berstatus `Diterima` dikunci (*read-only*) agar pengguna hanya mengunggah ulang dokumen yang berstatus `Ditolak`.

3. **Layar Manajemen Paket Les (`(admin)/products/*`)**:

   * **Visibility Gate**: Meskipun akun belum *Fully Approved* (misal baru $2$ dari $3$ dokumen disetujui), tombol `Tambah Produk`, `Edit`, dan `Hapus` **tetap aktif**. Namun, wajib menampilkan *banner* informasi bahwa produk belum tampil di pencarian publik.

   * Aksi `Hapus Produk` wajib memunculkan modal konfirmasi yang menjelaskan bahwa penghapusan bersifat *Soft Delete* (data siswa aktif dan jadwal berjalan tidak ikut terhapus).

4. **Layar Preferensi & Pencarian Siswa (`(user)/profile/preferences.tsx` & `home/search.tsx`)**:

   * Pilihan radius lokasi hanya mengizinkan nilai diskrit: $2\text{ km}$, $5\text{ km}$, atau $10\text{ km}$ (hanya aktif jika metode belajar adalah *Offline* atau *Hybrid*).

   * *Slider* atau input budget memvalidasi $\text{Budget Maksimum} \ge \text{Budget Minimum}$.

5. **Layar Komunitas Belajar (`(user)/learn-contact/community/[id].tsx`)**:

   * Jika status belum bergabung, ruang percakapan hanya menampilkan *Intipan Percakapan (Read-only Preview)*.

   * Form `Alasan ingin bergabung` dibatasi maksimal $200\text{ karakter}$ (`0/200`) dan wajib mencentang persetujuan aturan komunitas.

   * Pada ruang komunitas bertipe *Satu Arah* (`is_one_way_broadcast = true`), *input bar* pesan disembunyikan untuk siswa; siswa hanya bisa menekan tombol 5 reaksi emoji atau memilih opsi *Polling* ($1\times$ klik per pengguna).

6. **Layar Pendapatan & Penarikan Dana (`(admin)/dashboard/earnings/withdraw.tsx`)**:

   * Tombol `Ajukan Penarikan` **wajib dinonaktifkan (*disabled*)** apabila salah satu kondisi berikut terjadi:

     * Nominal penarikan $< \text{Rp}100.000$.

     * Nominal penarikan $> \text{Saldo Pendapatan Tersedia}$.

     * Saldo Poin Ku $< 27\text{ poin}$.

     * Rekening bank pribadi belum didaftarkan di menu `Akun Pembayaran`.

     * *Checkbox* pernyataan pemeriksaan mandiri belum dicentang.

7. **Layar Tugas Event & Poin Ku (`(admin)/dashboard/points/*`)**:

   * Tombol `Klaim` pada kartu Tugas Event hanya aktif jika status partisipasi adalah `dapat_diklaim` (seluruh langkah selesai & disetujui tim Bimblue). Sebelum diklaim, poin tidak boleh ditambahkan ke angka saldo utama di UI.

## 5. Rekomendasi Pengembangan Versi AI (Enhancement Sisi Frontend)

Agar pengalaman pengguna (*UX*) dan performa aplikasi jauh lebih unggul, berikut adalah pengembangan arsitektur yang direkomendasikan:

1. **Optimistic UI Updates pada Chat, Polling & Emoji Komunitas**:

   * Saat siswa menekan emoji reaksi (❤️/🔥) atau memberikan suara pada *polling* UTBK, perbarui angka *counter* secara instan di layar menggunakan `onMutate` dari TanStack Query tanpa menunggu respons server selesai.

2. **Offline-First & Smart Caching (`MMKV` + `NetInfo`)**:

   * Karena sudah terdapat rancangan layar `# Kamu sedang offline`, integrasikan `@react-native-community/netinfo` dengan *persister* `react-native-mmkv`. Siswa tetap dapat membuka menu **Kelas tersimpan dan materi** (termasuk membaca PDF yang sudah di-cache secara lokal di `expo-file-system`) meskipun tanpa koneksi internet.

3. **Client-Side Image Compression Sebelum Upload**:

   * Banyak pendaftar tutor yang memotret KTP/Ijazah menggunakan kamera beresolusi tinggi ($>8\text{ MB}$) sehingga gagal melewati batas $5\text{ MB}$. Gunakan `expo-image-manipulator` untuk mengompresi foto secara otomatis menjadi $\le 1.5\text{ MB}$ dengan tetap menjaga ketajaman teks NIK sebelum dikirim ke API.

4. **Deep Linking Transaksi & Notifikasi Push**:

   * Konfigurasikan skema URI `bimblue://checkout/BLJ-241024-021` dan `bimblue://admin/documents` di `app.json` agar ketika pengguna mengetuk notifikasi *Push* (misal: *"Hore! Dokumen KTP kamu disetujui"* atau *"Tawaran kelas baru dari Kak Nabila"*), aplikasi langsung membuka layar terkait.

## 6. Sisi Backend (Next.js App Router): Daftar File & Kegunaannya

Karena Backend dibangun menggunakan **Next.js (App Router)**, proyek ini sekaligus dapat melayani **REST API untuk Mobile App** dan **Web Dashboard untuk Superadmin**.

| Path File di Next.js (`src/...`) | Kegunaan & Tanggung Jawab | 
| ----- | ----- | 
| `middleware.ts` | Memvalidasi JWT Bearer Token pada setiap route `/api/v1/*`, memeriksa kecocokan *Role* (`user`, `admin`, `superadmin`), mengatur CORS, dan menerapkan *Rate Limiting* berbasis IP/User. | 
| `lib/supabase/server.ts` | Inisialisasi koneksi PostgreSQL/Supabase menggunakan `SERVICE_ROLE_KEY` (khusus operasi server internal/RPC) dan klien berbasiskan konteks user. | 
| `lib/storage/s3-presign.ts` | Menghasilkan *Presigned Upload URL* (untuk unggah dokumen) dan *Signed Read URL* berdurasi pendek ($15\text{ menit}$) untuk berkas sensitif seperti KTP & Ijazah. | 
| `lib/payment/gateway.ts` | Modul integrasi *Payment Gateway* (Midtrans/Xendit) untuk menghasilkan kode QRIS, *Virtual Account* BCA/BNI/BRI/Mandiri, dan memverifikasi *Webhook Signature*. | 
| `lib/mail/otp-mailer.ts` | Pengiriman email transaksional berisi kode OTP $6$ digit menggunakan Resend / Nodemailer. | 
| `validators/*.schema.ts` | Kumpulan skema validasi input menggunakan **Zod** (memastikan tipe data, batas karakter, dan aturan nominal sebelum menyentuh database). | 
| `services/earnings.service.ts` | Logika pemanggilan prosedur PostgreSQL `rpc_complete_teaching_session` dan `rpc_request_withdrawal` secara atomik. | 
| `app/(superadmin-web)/layout.tsx` | Layout antarmuka Web Superadmin (Sidebar navigasi: Dashboard, Pengajuan Mitra, Verifikasi Dokumen, Moderasi Akun, Keuangan & Top Up Poin). | 
| `app/(superadmin-web)/verifications/page.tsx` | Tampilan Web bagi Superadmin untuk memeriksa dokumen KTP/Izin Lembaga secara berdampingan (*side-by-side PDF/Image viewer*) dan memberikan keputusan `Approve` / `Reject` beserta alasan revisi. | 
| `app/(superadmin-web)/finance/page.tsx` | Tampilan Web bagi Superadmin untuk memverifikasi bukti transfer Top-Up Poin (`POIN-...`) dan memproses tahapan pencairan dana pengajar (`WDR-...`). | 

## 7. Sisi Backend: Daftar Lengkap Endpoint REST API

Seluruh endpoint berada di bawah prefix `/api/v1`:

### A. Autentikasi & Akun (`/api/v1/auth/*`)

* `POST /auth/register` — Registrasi akun baru (`user` atau `admin`) & kirim OTP ke email.

* `POST /auth/verify-otp` — Validasi kode $6$ digit OTP (cek masa berlaku $5\text{ menit}$).

* `POST /auth/resend-otp` — Kirim ulang OTP (validasi jeda waktu $\ge 30\text{ detik}$).

* `POST /auth/login` — Autentikasi email/username & password atau Google OAuth token; mengembalikan JWT + `role` + `account_status`.

* `POST /auth/forgot-password` & `POST /auth/reset-password` — Pemulihan kata sandi via OTP.

* `PATCH /auth/change-password` — Ganti password dari menu pengaturan akun.

### B. Modul Pelajar / User (`/api/v1/student/*` & `/api/v1/discovery/*`)

* `PUT /student/onboarding` — Simpan data langkah 3 registrasi (Nama, Umur, Gender, Tingkat Sekolah).

* `GET /student/profile` & `PUT /student/profile` — Ambil & perbarui profil detail pelajar, info wali, serta unggah dokumen pendukung (Ijazah/Sertifikat/Rapor).

* `GET /student/preferences` & `PUT /student/preferences` — Kelola preferensi jenjang, mapel, metode, koordinat lokasi, radius ($2/5/10\text{ km}$), dan budget.

* `GET /discovery/home` — Beranda siswa (daftar mata pelajaran, tutor populer, dan komunitas gratis).

* `GET /discovery/tutors` — Pencarian & filter tutor (hanya mengembalikan admin dengan `is_publicly_visible = true`). Mendukung query `?q=&subject_id=&level=&method=&lat=&lng=&radius_km=&min_price=&max_price=&sort=`.

* `GET /discovery/tutors/:adminId` — Profil publik tutor/lembaga, katalog paket aktif (`deleted_at IS NULL`), dan ulasan siswa.

* `GET /student/saved-items` & `POST /student/saved-items` & `DELETE /student/saved-items/:id` — Kelola *bookmark* chat dan materi belajar.

### C. Ruang Chat, Komunitas & Transaksi (`/api/v1/chats/*`, `/api/v1/communities/*`, `/api/v1/orders/*`)

* `GET /chats` — Daftar ruang percakapan beserta *unread count*.

* `GET /chats/:roomId/messages` & `POST /chats/:roomId/messages` — Riwayat pesan & kirim pesan/lampiran baru.

* `POST /chats/:roomId/offers` — **(Khusus Admin)** Mengirim Kartu Penawaran Bimbel Privat di dalam chat.

* `POST /chats/:roomId/report` & `POST /chats/:roomId/disconnect` — Laporkan pengguna atau putus hubungan chat.

* `GET /communities` & `GET /communities/:id` — Detail komunitas & pratinjau percakapan.

* `POST /communities/:id/join` — Ajukan gabung komunitas (alasan maks $200\text{ karakter}$).

* `POST /communities/:id/posts/:postId/vote` — Memberikan suara pada *polling* komunitas.

* `POST /communities/:id/posts/:postId/reactions` — Toggle reaksi emoji (❤️, 😊, 👍, 😭, 🔥).

* `POST /orders/checkout` — Buat pesanan kelas (`BLJ-YYMMDD-XXX`) dari Paket Les atau dari Kartu Penawaran Chat (`chat_offer_id`).

* `GET /orders` & `GET /orders/:orderCode` — Daftar pesanan (`Belum dibayar` / `Telah dibayar`) & rincian instruksi bayar (QRIS/VA/E-Wallet).

* `POST /webhooks/payment` — **(Public Webhook)** Endpoint callback dari Midtrans/Xendit untuk mengubah status pesanan menjadi `paid` dan otomatis membuat `student_enrollments`.

* `POST /orders/:orderCode/review` — Kirim rating ($\star 1.0 - 5.0$) dan ulasan setelah sesi selesai.

### D. Modul Admin / Pengajar (`/api/v1/admin/*`)

* `POST /admin/verification/submit` — Kirim profil mitra (Perseorangan/Instansi) & metadata dokumen verifikasi.

* `GET /admin/verification/status` & `PUT /admin/verification/documents/:docType` — Pantau status dokumen & unggah revisi berkas yang ditolak.

* `GET /admin/dashboard` & `GET /admin/statistics` — Ringkasan siswa aktif, total percakapan, tingkat respons ($\%$), waktu respons rata-rata, dan pendapatan bulan berjalan.

* `GET /admin/students` & `GET /admin/students/:enrollmentId` — Daftar siswa bergabung & detail progres pertemuan.

* `POST /admin/sessions/:sessionId/complete` — Konfirmasi selesai mengajar $1$ sesi (memicu pencairan pendapatan bersih $97\%$ dan menambah progres Tugas Event).

* `GET /admin/packages` & `POST /admin/packages` & `PUT /admin/packages/:id` & `DELETE /admin/packages/:id` — CRUD paket les (`DELETE` melakukan *Soft Delete* dengan mengisi `deleted_at = NOW()`).

* `GET /admin/earnings` & `POST /admin/withdrawals` — Riwayat buku besar pendapatan & pengajuan penarikan dana (`WDR-YYMMDD-XXX`).

* `GET /admin/bank-accounts` & `PUT /admin/bank-accounts` — Simpan rekening bank pribadi penerima penarikan.

* `GET /admin/points` & `POST /admin/points/topup` & `POST /admin/points/topup/:invoiceCode/proof` — Cek mutasi poin, buat invoice beli poin (`POIN-YYMMDD-XXX`), & unggah bukti transfer.

* `GET /admin/events` & `POST /admin/events/:eventId/join` & `POST /admin/events/:eventId/submit` & `POST /admin/events/:eventId/claim` — Kelola partisipasi Tugas Event dan klaim bonus poin.

### E. Modul Superadmin (`/api/v1/superadmin/*`)

* `GET /superadmin/metrics` — Statistik seluruh platform.

* `PATCH /superadmin/partners/:requestId/decision` — Setujui atau tolak pengajuan mitra baru.

* `PATCH /superadmin/documents/:docId/decision` — Setujui atau tolak dokumen per item (otomatis memicu *trigger* `fn_sync_admin_verification_visibility`).

* `PATCH /superadmin/withdrawals/:id/status` — Perbarui tahap penarikan (`diverifikasi` $\rightarrow$ `diproses` $\rightarrow$ `berhasil` melalui `rpc_complete_withdrawal`).

* `PATCH /superadmin/points/topup/:id/verify` — Setujui bukti transfer pembelian poin & tambahkan saldo poin pengajar.

* `PATCH /superadmin/users/:userId/status` — Suspend atau nonaktifkan akun yang melanggar aturan.

## 8. Skema Database & Pengembangan Lanjutan (Evolusi Skema)

Fondasi utama database Anda di `BIMBLUE.sql` sudah sangat solid (mencakup 11 modul, PostGIS Geolocation, serta Stored Procedures untuk *Visibility Gate*, *Revenue Recognition* potongan $3\%$, dan *Hold/Deduct* $27$ Poin penarikan).

Untuk menyempurnakan sistem saat masuk ke tahap produksi (*Production-Grade*), berikut adalah **5 tabel pengembangan tambahan (Ekstensi Skema)** yang direkomendasikan untuk ditambahkan ke migrasi berikutnya:

```
-- 1. Tabel Escrow / Saldo Tertahan Platform (Memisahkan uang paket utuh vs sesi yang sudah dicairkan)
CREATE TABLE IF NOT EXISTS escrow_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    enrollment_id UUID UNIQUE NOT NULL REFERENCES student_enrollments(id) ON DELETE RESTRICT,
    order_id UUID NOT NULL REFERENCES class_orders(id) ON DELETE RESTRICT,
    total_locked_amount NUMERIC(14, 2) NOT NULL,      -- Contoh: Rp350.000 (8 sesi)
    released_gross_amount NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    remaining_escrow_amount NUMERIC(14, 2) GENERATED ALWAYS AS (total_locked_amount - released_gross_amount) STORED,
    status VARCHAR(30) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'fully_released', 'refunded', 'disputed')),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Tabel Pengajuan Reschedule Jadwal Sesi (Agar perubahan jadwal disepakati kedua pihak)
CREATE TABLE IF NOT EXISTS session_reschedule_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES enrollment_sessions(id) ON DELETE CASCADE,
    requested_by UUID NOT NULL REFERENCES users(id),
    proposed_date DATE NOT NULL,
    proposed_start_time TIME NOT NULL,
    proposed_end_time TIME NOT NULL,
    reason TEXT NOT NULL,
    status verification_status NOT NULL DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    responded_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Tabel Token Perangkat untuk Push Notification (Expo Push Token / FCM)
CREATE TABLE IF NOT EXISTS user_push_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expo_push_token VARCHAR(255) UNIQUE NOT NULL,
    device_os VARCHAR(20) NOT NULL, -- 'android', 'ios', 'web'
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    last_used_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Tabel Log Webhook Pembayaran & Idempotency (Mencegah saldo masuk 2x akibat retry webhook)
CREATE TABLE IF NOT EXISTS payment_webhook_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    gateway_name VARCHAR(50) NOT NULL, -- 'midtrans', 'xendit'
    external_event_id VARCHAR(150) UNIQUE NOT NULL, -- Kunci Idempotency!
    order_code VARCHAR(50) NOT NULL,
    raw_payload JSONB NOT NULL,
    is_processed BOOLEAN NOT NULL DEFAULT FALSE,
    processed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Tabel Audit Keamanan & Aksi Sensitif (Mencatat akses dokumen KTP & perubahan rekening)
CREATE TABLE IF NOT EXISTS security_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action_type VARCHAR(100) NOT NULL, -- 'VIEW_KTP_DOCUMENT', 'UPDATE_BANK_ACCOUNT', 'APPROVE_WITHDRAWAL'
    target_entity VARCHAR(100) NOT NULL,
    target_id UUID,
    ip_address VARCHAR(64),
    user_agent TEXT,
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

```

## 9. To-Do List Keamanan Aplikasi Backend (Do's & Don'ts)

Berikut adalah daftar periksa (*checklist*) aturan keamanan yang **WAJIB DILAKUKAN (DO's)** dan **DILARANG KERAS (DON'Ts)** oleh developer Backend Next.js:

### ✅ YANG WAJIB DILAKUKAN (DO's)

* \[ \] **Gunakan Database Transaction & `SELECT ... FOR UPDATE` pada Operasi Keuangan**: Semua pencairan pendapatan sesi ($3\%$ *fee*), pengajuan penarikan ($\ge \text{Rp}100.000$), dan pemotongan $27$ poin wajib dieksekusi melalui fungsi RPC PostgreSQL (`rpc_request_withdrawal`, `rpc_complete_teaching_session`) agar terhindar dari *Race Condition* (serangan *double-spending* saat tombol ditekan berkali-kali secara bersamaan).

* \[ \] **Simpan Dokumen Verifikasi di *Private Storage Bucket***: Berkas KTP, Ijazah, Izin Lembaga, dan Rapor Siswa adalah data pribadi sensitif (PII). Simpan di *Private Bucket* dan hanya berikan *Signed URL* yang kedaluwarsa dalam $15\text{ menit}$ kepada pemilik akun atau Superadmin.

* \[ \] **Validasi *Magic Bytes* Berkas yang Diunggah**: Selain memeriksa ekstensi `.pdf`/`.jpg`/`.png` dan ukuran $\le 5\text{ MB}$, periksa *file signature* (*magic bytes*) di sisi server untuk mencegah pengunggahan *script* berbahaya yang disamarkan sebagai gambar.

* \[ \] **Verifikasi *Cryptographic Signature* pada Webhook Pembayaran**: Endpoint `/api/v1/webhooks/payment` wajib mencocokkan *hash signature* (`SHA-512` untuk Midtrans atau `x-callback-token` untuk Xendit) dan memeriksa `external_event_id` di tabel `payment_webhook_logs`.

* \[ \] **Terapkan *Rate Limiting* Ketat pada Endpoint OTP & Login**: Batasi `/api/v1/auth/verify-otp` maksimal $5\text{ percobaan gagal}$ per kode OTP untuk mencegah *Brute-Force* $6$ digit angka ($10^6$ kombinasi), serta batasi permintaan kirim OTP per IP/Email.

* \[ \] **Paksa Filter Visibilitas di Level Server**: Pada seluruh query publik (`/api/v1/discovery/*`), selalu paksakan klausa `WHERE is_publicly_visible = TRUE AND deleted_at IS NULL` di sisi server.

### ❌ YANG DILARANG KERAS (DON'Ts)

* \[ \] **JANGAN PERNAH Menerima Nominal Harga atau Potongan Poin dari Request Body Frontend**: Saat *checkout* (`POST /orders/checkout`), Frontend hanya boleh mengirim `package_id` atau `chat_offer_id`. Harga total, biaya layanan ($3\%$), dan biaya penarikan ($27\text{ poin}$) wajib dihitung murni dari tabel database di Backend.

* \[ \] **JANGAN PERNAH Membocorkan `SUPABASE_SERVICE_ROLE_KEY` ke Kode Frontend**: Variabel *Service Role* mampu melewati seluruh aturan *Row Level Security (RLS)* dan hanya boleh dipanggil di dalam lingkungan server Next.js (`src/app/api/*`).

* \[ \] **JANGAN PERNAH Menyimpan Kode OTP dalam Bentuk *Plaintext* di Log Produksi**: Idealnya simpan `code` OTP yang telah di-*hash* (menggunakan `hmac` atau `bcrypt` cepat) dan jangan pernah mencetak kode OTP di *console log* server produksi.

* \[ \] **JANGAN PERNAH Melakukan *Hard Delete* (`DELETE FROM`) pada Paket Les atau Akun yang Memiliki Riwayat Transaksi**: Selalu gunakan *Soft Delete* (`deleted_at = NOW()` pada `learning_packages` dan `status = 'deactivated'` pada `users`) agar integritas laporan keuangan, jadwal siswa aktif, dan histori buku besar tidak rusak.

* \[ \] **JANGAN PERNAH Mengizinkan Perubahan Status Penarikan Tanpa Validasi Urutan (*State Machine*)**: Status penarikan tidak boleh melompat langsung dari `diajukan` ke `berhasil` tanpa melewati otorisasi Superadmin, dan poin yang di-*hold* (`locked_points_balance`) wajib dikembalikan ke `available_points_balance` jika penarikan berstatus `ditolak`.

* Kamu harus ingat, Pembuatan rest api di sisi front end dan back end, harus menggunakan