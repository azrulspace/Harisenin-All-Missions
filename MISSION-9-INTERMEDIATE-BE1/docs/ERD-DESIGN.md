# Database Design & Entity Relationship Diagram (ERD) - Edu Course (LMS SMK DKV)

## 1. Diagram ERD (Mermaid)

```mermaid
erDiagram
    USERS ||--o{ ACCOUNTS : "has"
    USERS ||--o{ ENROLLMENTS : "registers"
    USERS ||--o{ LESSON_PROGRESS : "tracks"
    USERS ||--o{ COURSE_EDUCATORS : "assigned_as"
    
    CATEGORIES ||--o{ COURSES : "classifies"
    
    COURSES ||--o{ CHAPTERS : "contains"
    COURSES ||--o{ COURSE_EDUCATORS : "has_instructor"
    COURSES ||--o{ ENROLLMENTS : "enrolled_by"
    
    CHAPTERS ||--o{ LESSONS : "has_materials"
    
    LESSONS ||--o{ LESSON_PROGRESS : "recorded_in"

    USERS {
        uuid id PK
        varchar_150 full_name
        varchar_150 email UK
        varchar_20 phone_number UK
        varchar_255 password_hash
        varchar_255 avatar_url
        enum_role role
        boolean is_verified
        timestamp created_at
        timestamp updated_at
    }

    ACCOUNTS {
        uuid id PK
        uuid user_id FK
        enum_provider provider_type
        varchar_255 provider_id
        varchar_10 otp_code
        timestamp otp_expires_at
        timestamp created_at
    }

    CATEGORIES {
        smallint id PK
        varchar_100 name
        varchar_120 slug UK
        text description
        timestamp created_at
    }

    COURSES {
        uuid id PK
        smallint category_id FK
        varchar_200 title
        varchar_220 slug UK
        varchar_100 software
        text description
        varchar_255 thumbnail_url
        enum_course_level level
        enum_course_status status
        decimal_12_2 price
        boolean is_free
        smallint total_chapters
        smallint total_lessons
        timestamp created_at
        timestamp updated_at
    }

    COURSE_EDUCATORS {
        uuid id PK
        uuid course_id FK
        varchar_150 name
        varchar_100 role_title
        varchar_255 linkedin_url
        varchar_255 avatar_url
        smallint sort_order
        timestamp created_at
    }

    CHAPTERS {
        uuid id PK
        uuid course_id FK
        varchar_150 title
        smallint sort_order
        timestamp created_at
        timestamp updated_at
    }

    LESSONS {
        uuid id PK
        uuid chapter_id FK
        varchar_200 title
        enum_lesson_type lesson_type
        varchar_500 content_url
        text text_content
        text description
        int duration_seconds
        smallint sort_order
        timestamp created_at
        timestamp updated_at
    }

    ENROLLMENTS {
        uuid id PK
        uuid user_id FK
        uuid course_id FK
        enum_enrollment_status status
        decimal_5_2 progress_percentage
        timestamp enrolled_at
        timestamp completed_at
    }

    LESSON_PROGRESS {
        uuid id PK
        uuid user_id FK
        uuid lesson_id FK
        boolean is_completed
        int last_watch_duration
        timestamp completed_at
        timestamp updated_at
    }
```

## 2. Naming Convention & Data Types

- **Naming Convention**: `snake_case` konsisten untuk nama tabel, kolom, constraint, dan relasi, menyesuaikan dengan standar SQL.
- **Primary Keys**: `id` umumnya bertipe `UUID` untuk entitas utama (agar lebih aman dari enumeration dan memudahkan scaling), sedangkan untuk tabel referensi ringan (seperti `CATEGORIES`) bisa menggunakan `SMALLINT`.
- **Enums**: Menggunakan ENUM pada PostgreSQL atau field terpisah untuk merepresentasikan nilai statis terbatas (seperti `enum_role`, `enum_provider`, `enum_course_level`, `enum_course_status`, `enum_lesson_type`, `enum_enrollment_status`).
- **Data Limits**: Ada batasan presisi yang terdefinisi seperti `varchar_150`, `varchar_200`, `decimal_12_2` untuk optimasi ruang penyimpanan database (sesuai spesifikasi di Mermaid).
- **Audit Trails**: Setiap tabel menyediakan `created_at` (dan sebagian besar dengan `updated_at`) berformat TIMESTAMP.

## 3. Strategi Indexing

| Tabel | Jenis Index | Kolom yang di Index | Alasan / Tujuan |
|---|---|---|---|
| `USERS` | Single Index (Unique) | `email`, `phone_number` | Akses cepat login, verifikasi pengguna, serta menghindari data ganda. |
| `CATEGORIES` | Single Index (Unique) | `slug` | Optimalisasi *routing* FE saat navigasi per kategori (SEO friendly). |
| `COURSES` | Single Index (Unique) | `slug` | Mempercepat *look-up* detail course via URL. |
| `COURSES` | Single Index | `category_id` | Menampilkan course di FE berdasarkan kategori secara cepat. |
| `COURSES` | Composite Index | `(category_id, status)` | Mempercepat load data saat filtering page/beranda course dengan status tertentu. |
| `CHAPTERS` | Composite Index | `(course_id, sort_order)` | Agar *sorting* list modul / chapter pada detail course ringan. |
| `LESSONS` | Composite Index | `(chapter_id, sort_order)` | Agar video player dan silabus di FE berjalan urut dengan cepat. |
| `ENROLLMENTS` | Composite Index (Unique) | `(user_id, course_id)` | Satu user tidak bisa *enroll* ke course yang sama berulang kali, membantu mempercepat load list "My Course". |
| `LESSON_PROGRESS` | Composite Index (Unique) | `(user_id, lesson_id)` | Menyimpan track/state progress video secara unik per user dan lesson-nya. |
