# Projects CRUD API Documentation

Dokumentasi lengkap untuk API Admin Projects dengan contoh penggunaan.

---

## Base URL

```
http://localhost:3000/api/admin/projects
```

---

## Endpoints

| Method   | Endpoint                  | Deskripsi           |
| -------- | ------------------------- | ------------------- |
| `GET`    | `/api/admin/projects`     | List semua projects |
| `POST`   | `/api/admin/projects`     | Buat project baru   |
| `GET`    | `/api/admin/projects/:id` | Get project by ID   |
| `PUT`    | `/api/admin/projects/:id` | Update project      |
| `DELETE` | `/api/admin/projects/:id` | Hapus project       |

---

## 1. List Semua Projects

### Request

```bash
curl -X GET http://localhost:3000/api/admin/projects
```

### Response Success (200)

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "slug": "grand-residence",
      "name": "Grand Residence",
      "status": "available",
      "price_range": "500 Juta - 1 Miliar",
      "location": "Jakarta Selatan",
      "project_galleries": [
        { "id": 1, "project_id": 1, "image_url": "https://..." }
      ],
      "project_features": [
        {
          "id": 1,
          "project_id": 1,
          "name": "Kolam Renang",
          "image_url": "https://..."
        }
      ],
      "project_surroundings": [],
      "project_house_types": [],
      "project_facilities": []
    }
  ],
  "message": "Berhasil mengambil data projects"
}
```

---

## 2. Buat Project Baru

### Request

```bash
curl -X POST http://localhost:3000/api/admin/projects \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "kavling-mandiri",
    "name": "Kavling Mandiri Residence",
    "status": "available",
    "price_range": "300 Juta - 500 Juta",
    "price": "Mulai dari 350 Juta",
    "location": "Depok",
    "full_address": "Jl. Raya Bogor KM 30, Depok, Jawa Barat",
    "description": "Kavling siap bangun dengan lokasi strategis.",
    "main_image": "https://example.com/main.jpg",
    "site_plan": "https://example.com/siteplan.jpg",
    "land_size": "72-120 m²",
    "building_size": "45-80 m²",
    "floor_count": "2 Lantai",
    "is_featured": true,
    "featured_order": 1,
    "display_order": 1,
    "galleries": [
      { "image_url": "https://example.com/gallery1.jpg" },
      { "image_url": "https://example.com/gallery2.jpg" }
    ],
    "features": [
      { "name": "Kolam Renang", "image_url": "https://example.com/pool.jpg" },
      { "name": "Taman Bermain", "image_url": "https://example.com/playground.jpg" }
    ],
    "surroundings": [
      { "name": "Mall Depok", "image_url": "https://example.com/mall.jpg", "distance_km": 2.5, "distance_minutes": 10 },
      { "name": "RS Hermina", "image_url": null, "distance_km": 1.0, "distance_minutes": 5 }
    ],
    "house_types": [
      { "name": "Tipe Mawar 45/72", "image_url": "https://example.com/type-mawar.jpg" },
      { "name": "Tipe Melati 60/90", "image_url": "https://example.com/type-melati.jpg" }
    ],
    "facilities": [
      { "name": "Keamanan 24 Jam", "image_url": "https://example.com/security.jpg" },
      { "name": "One Gate System", "image_url": null }
    ]
  }'
```

### Response Success (201)

```json
{
  "success": true,
  "data": {
    "id": 2,
    "slug": "kavling-mandiri",
    "name": "Kavling Mandiri Residence",
    "status": "available",
    "project_galleries": [
      { "id": 5, "project_id": 2, "image_url": "https://example.com/gallery1.jpg" },
      { "id": 6, "project_id": 2, "image_url": "https://example.com/gallery2.jpg" }
    ],
    "project_features": [...],
    "project_surroundings": [...],
    "project_house_types": [...],
    "project_facilities": [...]
  },
  "message": "Project berhasil dibuat"
}
```

### Response Error - Validation (400)

```json
{
  "success": false,
  "error": "Validation error: slug: Slug minimal 3 karakter; status: Status harus 'available' atau 'ongoing'"
}
```

### Response Error - Duplicate Slug (409)

```json
{
  "success": false,
  "error": "Slug \"kavling-mandiri\" sudah digunakan. Gunakan slug yang berbeda."
}
```

---

## 3. Get Project by ID

### Request

```bash
curl -X GET http://localhost:3000/api/admin/projects/2
```

### Response Success (200)

```json
{
  "success": true,
  "data": {
    "id": 2,
    "slug": "kavling-mandiri",
    "name": "Kavling Mandiri Residence",
    ...
  }
}
```

### Response Error - Not Found (404)

```json
{
  "success": false,
  "error": "Project dengan ID 999 tidak ditemukan"
}
```

---

## 4. Update Project

### Request - Update Partial

Update hanya field tertentu (field yang tidak disertakan tidak akan berubah):

```bash
curl -X PUT http://localhost:3000/api/admin/projects/2 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Kavling Mandiri Residence - Updated",
    "price_range": "350 Juta - 600 Juta",
    "is_featured": false
  }'
```

### Request - Update dengan Replace Relations

Jika menyertakan child relations, maka data lama akan **dihapus** dan diganti dengan data baru:

```bash
curl -X PUT http://localhost:3000/api/admin/projects/2 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Kavling Mandiri Residence",
    "features": [
      { "name": "Kolam Renang Olympic", "image_url": "https://example.com/pool-new.jpg" },
      { "name": "Gym Center", "image_url": "https://example.com/gym.jpg" }
    ]
  }'
```

> **⚠️ Perhatian:** Semua features lama akan dihapus dan diganti dengan 2 features baru di atas.

### Response Success (200)

```json
{
  "success": true,
  "data": {
    "id": 2,
    "name": "Kavling Mandiri Residence",
    "project_features": [
      { "id": 10, "project_id": 2, "name": "Kolam Renang Olympic", "image_url": "..." },
      { "id": 11, "project_id": 2, "name": "Gym Center", "image_url": "..." }
    ],
    ...
  },
  "message": "Project berhasil diupdate"
}
```

---

## 5. Hapus Project

### Request

```bash
curl -X DELETE http://localhost:3000/api/admin/projects/2
```

### Response Success (200)

```json
{
  "success": true,
  "data": {
    "id": 2,
    "deleted": true
  },
  "message": "Project dengan ID 2 berhasil dihapus"
}
```

> **Note:** Semua child records (galleries, features, dll) dan gambar di Supabase Storage akan otomatis dihapus.

---

## Schema Validasi

### Project Fields

| Field            | Type    | Required | Validation                            |
| ---------------- | ------- | -------- | ------------------------------------- |
| `slug`           | string  | ✅       | Min 3, max 255, lowercase + dash only |
| `name`           | string  | ✅       | Min 3, max 255                        |
| `status`         | enum    | ✅       | `"available"` atau `"ongoing"`        |
| `price_range`    | string  | ❌       | Max 255                               |
| `price`          | string  | ❌       | Max 255                               |
| `location`       | string  | ❌       | Max 255                               |
| `full_address`   | string  | ❌       | Max 1000                              |
| `description`    | string  | ❌       | Max 5000                              |
| `main_image`     | string  | ❌       | Valid URL                             |
| `site_plan`      | string  | ❌       | Valid URL                             |
| `land_size`      | string  | ❌       | Max 100                               |
| `building_size`  | string  | ❌       | Max 100                               |
| `floor_count`    | string  | ❌       | Max 50                                |
| `is_featured`    | boolean | ❌       | Default: false                        |
| `featured_order` | integer | ❌       | Min 0                                 |
| `display_order`  | integer | ❌       | Min 0                                 |

### Child Relations

| Relation       | Fields                                                            |
| -------------- | ----------------------------------------------------------------- |
| `galleries`    | `image_url` (required, URL)                                       |
| `features`     | `name` (required), `image_url` (optional, URL)                    |
| `surroundings` | `name` (required), `image_url`, `distance_km`, `distance_minutes` |
| `house_types`  | `name` (required), `image_url` (optional, URL)                    |
| `facilities`   | `name` (required), `image_url` (optional, URL)                    |

---

## Contoh dengan JavaScript/TypeScript

### Fetch API

```typescript
// GET all projects
const response = await fetch("/api/admin/projects");
const { success, data, error } = await response.json();

if (success) {
  console.log("Projects:", data);
} else {
  console.error("Error:", error);
}
```

### Create Project

```typescript
const newProject = {
  slug: "perumahan-asri",
  name: "Perumahan Asri",
  status: "available",
  location: "Bogor",
  features: [{ name: "Taman", image_url: null }],
};

const response = await fetch("/api/admin/projects", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(newProject),
});

const result = await response.json();
console.log(result);
```

### Update Project

```typescript
const updates = {
  name: "Perumahan Asri Premium",
  is_featured: true,
  features: [
    { name: "Kolam Renang", image_url: "https://..." },
    { name: "Clubhouse", image_url: "https://..." },
  ],
};

const response = await fetch("/api/admin/projects/5", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(updates),
});
```

### Delete Project

```typescript
const response = await fetch("/api/admin/projects/5", {
  method: "DELETE",
});

const { success, message } = await response.json();
console.log(message); // "Project dengan ID 5 berhasil dihapus"
```

---

## Error Codes

| Status | Keterangan                         |
| ------ | ---------------------------------- |
| `200`  | Success                            |
| `201`  | Created                            |
| `400`  | Validation error / Invalid request |
| `404`  | Project not found                  |
| `409`  | Conflict (duplicate slug)          |
| `500`  | Server error                       |
