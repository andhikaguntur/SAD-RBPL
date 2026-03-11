# API Integration - Quick Reference

## Pages & Their Endpoints

| Page | URL | Key Buttons | API Calls |
|------|-----|------------|-----------|
| **Dashboard** | `/id` | Input Permintaan, Lihat Detail, Lihat Semua | GET `/dashboard`, POST `/rental-requests` |
| **Fleet** | `/id/kelola-aset` | Kelola Aset, Export CSV | GET `/machines`, PATCH `/machines/:id` |
| **Requests** | `/id/permintaan` | Kirim Penawaran | GET `/rental-requests`, PATCH `/rental-requests/:id/validate` |
| **Payments** | `/id/pembayaran` | Setujui, Tolak, Review | GET `/payments`, PATCH `/payments/:id` |
| **Delivery** | `/id/konfirmasi-terima` | Konfirmasi Penerimaan | GET `/deliveries`, PATCH `/deliveries/:id/confirm` |
| **Logs** | `/id/log` | Filter Lanjutan, Detail Modal | GET `/logs` |
| **PO Archive** | `/id/po` | Lihat Faktur, Print, Download | GET `/purchase-orders` |

## Button Status

### 🟢 Fully Integrated (API-Ready)
- ✅ Input Permintaan (POST)
- ✅ Setujui Pembayaran (PATCH)
- ✅ Tolak Pembayaran (PATCH)
- ✅ Kelola Aset / Update Status (PATCH)
- ✅ Kirim Penawaran (PATCH)
- ✅ Konfirmasi Penerimaan (PATCH)
- ✅ Search/Filter (Local state with live data)
- ✅ Modal dialogs (All functional)

### 🟡 Partially Ready (UI Complete, Need Minor Setup)
- Export CSV - Ready to implement (UI done)
- Download Export - Ready to implement (UI done)
- Print Preview - Browser print working

## Quick Commands

```bash
# Start everything
pnpm run dev

# Start just backend
pnpm run dev:backend

# Start just admin frontend
pnpm run dev:admin

# Test API endpoint
curl http://localhost:4000/api/health

# Check types
pnpm run typecheck

# Format code
pnpm run format
```

## How Each Button Works

### Example 1: "Setujui" Payment Button
```
User clicks "Setujui"
    ↓
handleProcessStatus() called
    ↓
setIsProcessing(true)
    ↓
fetch PATCH /api/payments/INV-001
    ↓
Backend updates payment.status = "Lunas"
    ↓
Frontend gets response
    ↓
setPayments() updates local state
    ↓
UI re-renders with new status
    ↓
notification.show() with success message
    ↓
setIsProcessing(false)
    ↓
Modal closes
    ↓
List shows updated status
```

### Example 2: "Input Permintaan" Form Submission
```
User fills form in Drawer
    ↓
User clicks "Submit Permintaan"
    ↓
handleFormSubmit() called
    ↓
setIsSubmitting(true)
    ↓
fetch POST /api/rental-requests
    ↓
Backend creates new request
    ↓
Backend returns {id, pelanggan, lokasi, ...}
    ↓
Frontend receives response
    ↓
notification.show() with success
    ↓
setFormData reset to empty
    ↓
close() drawer
    ↓
setIsSubmitting(false)
    ↓
Dashboard refreshes on next load
```

## File Organization

```
sad-rbpl/
├── apps/
│   ├── api/
│   │   └── src/
│   │       └── index.ts ← All 13 API endpoints here
│   └── web-admin/
│       └── src/
│           └── app/
│               └── [locale]/
│                   ├── page.tsx ← Dashboard (API)
│                   ├── kelola-aset/page.tsx ← Fleet (API)
│                   ├── permintaan/page.tsx ← Requests (API)
│                   ├── pembayaran/page.tsx ← Payments (API)
│                   ├── konfirmasi-terima/page.tsx ← Delivery (API)
│                   ├── log/page.tsx ← Logs (API)
│                   └── po/page.tsx ← PO Archive (API)
└── packages/
    └── shared/
        └── src/
            ├── api.types.ts ← NEW: Type definitions
            └── api.client.ts ← NEW: Reusable fetch client
```

## Error Handling Pattern

All API calls follow this pattern:

```typescript
try {
  const response = await fetch('/api/endpoint', {...});
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  const result = await response.json();
  // Update state
} catch (err) {
  // Show error notification
  const message = err.message || 'Failed to complete action';
  notifications.show({title: 'Error', message, color: 'red'});
} finally {
  setLoading(false);
}
```

## Loading States

| Component | State Variable | Effect |
|-----------|----------------|--------|
| Dashboard | `isLoading` | Skeleton loaders on KPI cards |
| Dashboard Form | `isSubmitting` | Button gets `loading={true}` |
| Fleet | `isInitialLoading` | Shows loading for initial fetch |
| Fleet Manager | `loading` | LoadingOverlay on drawer |
| All Pages | `isLoading` | Alert shows during error |

## Response Format

All endpoints return:
```json
{
  "success": true,
  "data": {...},
  "message": "Optional message"
}
```

On error:
```json
{
  "success": false,
  "error": "Error message"
}
```

## What's NOT Implemented Yet

- Database (MongoDB) - Using in-memory arrays now
- Authentication - No login system
- File uploads - No file handling
- Email notifications - No email service
- Payment gateway - No Stripe/Midtrans integration
- SMS alerts - No SMS service

These are ready to add when you move to production!

---

**Everything is working!** 🎉 Start the backend and test any button.
