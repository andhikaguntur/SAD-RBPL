# 🗺️ REQUIREMENTS TO IMPLEMENTATION MAPPING

**Dokumen**: Functional Requirements, Product Backlog & PBI  
**Status**: Comprehensive analysis complete  
**Last Updated**: March 5, 2026

---

## 📋 FUNCTIONAL REQUIREMENTS MATRIX

| ID | Requirement | Module | Status | Sprint | Notes |
|----|-------------|--------|--------|--------|-------|
| RF-001 | User Registration | Identitas Pengguna | ❌ NOT STARTED | 6 | **BLOCKER** - Must implement first |
| RF-002 | Rental Request Submission | Penyewaan | 🟡 PARTIAL | 8 | DB schema done, form/logic missing |
| RF-003 | Price Validation (Admin) | Penyewaan | ✅ COMPLETE | 1 | Admin can validate offers |
| RF-004 | Send Offer to Customer | Penyewaan | 🟡 PARTIAL | 1 | Backend logic exists, no email service |
| RF-005 | Customer View & Approve Offer | Penyewaan | 🟡 PARTIAL | 9 | No customer UI yet |
| RF-006 | Auto PO Generation | Penyewaan | 🟡 PARTIAL | 10 | No trigger logic when offer approved |
| RF-007 | Auto Invoice Generation | Pembayaran | 🟡 PARTIAL | 12 | No auto-trigger logic |
| RF-008 | Customer View Invoice | Pembayaran | 🟡 PARTIAL | 13 | No customer invoice page |
| RF-009 | Upload Payment Proof | Pembayaran | 🟡 PARTIAL | 14 | No file upload endpoint |
| RF-010 | Admin Validate Payment | Pembayaran | ✅ COMPLETE | 2 | Admin can approve/reject payments |
| RF-011 | Manager Record Delivery | Pengelolaan Aset | ✅ COMPLETE | 4 | Manager can record deliveries |
| RF-012 | Admin Update Machine Status | Pengelolaan Aset | ✅ COMPLETE | 3 | Admin can update status |
| RF-013 | Generate Final Report | Pelaporan | ✅ COMPLETE | 5 | Manager can export PDF/Excel |

---

## 📊 PRODUCT BACKLOG STATUS

### HIGH PRIORITY ITEMS

| PB ID | Story | Status | Sprint | Complete? |
|-------|-------|--------|--------|-----------|
| PB-01 | Customer Registration | ❌ NOT STARTED | 6 | 0% |
| PB-02 | Customer Login | ❌ NOT STARTED | 7 | 0% |
| PB-03 | Rental Request Form | 🟡 PARTIAL | 8 | 30% |
| PB-04 | Price Validation (Admin) | ✅ DONE | 1 | 100% |
| PB-05 | Customer Offer Notification | 🟡 PARTIAL | 9 | 40% |
| PB-06 | Customer Approve Offer | 🟡 PARTIAL | 10 | 35% |
| PB-07 | Auto Generate PO | 🟡 PARTIAL | 11 | 35% |
| PB-08 | Auto Generate Invoice | 🟡 PARTIAL | 12 | 30% |
| PB-09 | Customer View Invoice | 🟡 PARTIAL | 13 | 20% |
| PB-10 | Customer Upload Payment | 🟡 PARTIAL | 14 | 20% |
| PB-11 | Payment Validation (Admin) | ✅ DONE | 2 | 100% |
| PB-12 | Manager Record Delivery | ✅ DONE | 4 | 100% |
| PB-13 | Admin Update Machine Status | ✅ DONE | 3 | 100% |
| PB-14 | Generate Final Report | ✅ DONE | 5 | 100% |

---

## 🎯 SPRINT TO CODE MAPPING

### Sprint 1 - PB-04: Penyewaan (Validasi Penawaran)
**Status**: ✅ DONE

```
Requirement: RF-003, RF-004
Code Location: apps/web-admin/src/app/[locale]/page.tsx
Endpoints:
  ✅ GET /api/rental-requests
  ✅ PATCH /api/rental-requests/:id/validate
Features:
  ✅ View rental requests list
  ✅ Edit price offers
  ✅ Submit validation
```

---

### Sprint 2 - PB-11: Pembayaran (Validasi Pembayaran)
**Status**: ✅ DONE

```
Requirement: RF-010
Code Location: apps/web-admin/src/app/[locale]/pembayaran/page.tsx
Endpoints:
  ✅ GET /api/payments
  ✅ PATCH /api/payments/:id
Features:
  ✅ View payments
  ✅ Approve/reject
  ✅ Update status
```

---

### Sprint 3 - PB-13: Pengelolaan Aset (Update Status Mesin)
**Status**: ✅ DONE

```
Requirement: RF-012
Code Location: apps/web-admin/src/app/[locale]/kelola-aset/page.tsx
Endpoints:
  ✅ GET /api/machines
  ✅ PATCH /api/machines/:id
Features:
  ✅ View machines
  ✅ Update status
  ✅ Change location
```

---

### Sprint 4 - PB-12: Pengelolaan Aset (Catat Pengiriman)
**Status**: ✅ DONE

```
Requirement: RF-011
Code Location: apps/web-manager/src/app/[locale]/pengiriman/page.tsx
Endpoints:
  ✅ GET /api/deliveries
  ✅ PATCH /api/deliveries/:id/confirm
Features:
  ✅ Record deliveries
  ✅ Confirm dispatch
  ✅ Track status
```

---

### Sprint 5 - PB-14: Pelaporan (Laporan Akhir)
**Status**: ✅ DONE

```
Requirement: RF-013
Code Location: apps/web-manager/src/app/[locale]/laporan/page.tsx
Endpoints:
  ✅ GET /api/reports
  ✅ POST /api/reports/export-pdf
  ✅ POST /api/reports/export-excel
Features:
  ✅ View reports
  ✅ Export PDF
  ✅ Export Excel
```

---

### Sprint 6 - PB-01: Identitas Pengguna (Registrasi)
**Status**: ❌ NOT STARTED - READY TO BEGIN

```
Requirement: RF-001
Code Location: NEED TO CREATE
  📁 apps/web-user/src/app/[locale]/register/page.tsx
  📁 apps/api/src/routes/auth.ts
  📁 apps/shared/src/types.ts (update)

Tasks:
  [ ] User model & schema (PBI-024)
  [ ] Register endpoint (PBI-025)
  [ ] Register form UI (PBI-026)
  [ ] Backend integration (PBI-028)

Endpoints Needed:
  POST /api/auth/register
  - Input: name, email, phone, password, confirmPassword
  - Output: success, userId
  - Validation: email unique, password strength
  - Security: bcrypt hashing
```

---

### Sprint 7 - PB-02: Identitas Pengguna (Login)
**Status**: ❌ NOT STARTED - DEPENDS ON SPRINT 6

```
Requirement: RF-001 (continued)
Code Location: NEED TO CREATE
  📁 apps/web-user/src/app/[locale]/login/page.tsx
  📁 apps/api/src/routes/auth.ts (extend)
  📁 apps/web-user/src/context/AuthContext.tsx
  📁 apps/web-user/src/components/ProtectedRoute.tsx

Tasks:
  [ ] Auth mechanism design (PBI-028)
  [ ] Login endpoint (PBI-029)
  [ ] Login form UI (PBI-030)
  [ ] Session management (PBI-031)

Endpoints Needed:
  POST /api/auth/login
  - Input: email, password
  - Output: token, user data
  - Security: JWT tokens, httpOnly cookies
  
  GET /api/auth/me
  POST /api/auth/logout
  POST /api/auth/refresh
```

---

### Sprint 8 - PB-03: Penyewaan (Pengajuan Sewa)
**Status**: 🟡 PARTIAL (30% - schema done)

```
Requirement: RF-002
Code Location: apps/web-user/src/app/[locale]/[feature]/page.tsx (TBD)
Endpoints:
  ✅ DB schema exists
  ❌ POST /api/rental-requests (missing logic)
  ❌ Availability check logic missing

Tasks:
  ✅ Schema design (PBI-032)
  [ ] Submission logic (PBI-033)
  [ ] Availability check (PBI-034)
  [ ] Customer form (PBI-035)
  [ ] Backend integration (PBI-036)

Blocker: Sprint 6-7 must complete first (need authentication)
```

---

### Sprint 9 - PB-05: Penyewaan (Terima Penawaran)
**Status**: 🟡 PARTIAL (40%)

```
Requirement: RF-004, RF-005
Code Location: NEED TO CREATE
  📁 apps/web-user/src/app/[locale]/offers/page.tsx (?)

Tasks:
  [ ] Notification dashboard (PBI-037)
  ✅ API endpoints (PBI-038 - partially)
  [ ] Customer offer UI (PBI-039)

Missing:
  ❌ Email notification service
  ❌ In-app notification system
  ❌ Customer UI to view offers
  ❌ Accept/reject buttons

Blocker: Sprint 8 must complete first
```

---

### Sprint 10 - PB-06: Penyewaan (Setujui Penawaran)
**Status**: 🟡 PARTIAL (35%)

```
Requirement: RF-005, RF-006
Code Location: NEED TO CREATE
  📁 apps/web-user/src/app/[locale]/offers/[id]/page.tsx (?)

Tasks:
  ✅ Offer schema (PBI-040)
  [ ] Approval logic (PBI-041)
  [ ] Auto-PO trigger (PBI-042)
  [ ] Customer UI (PBI-043)
  [ ] Backend integration (PBI-044)

Missing:
  ❌ When customer approves offer
  ❌ Automatically create Purchase Order
  ❌ Customer can reject with reason
  ❌ Notification on approval/rejection

Blocker: Sprint 9 must complete first
```

---

### Sprint 11 - PB-07: Penyewaan (Generate PO)
**Status**: 🟡 PARTIAL (35%)

```
Requirement: RF-006
Code Location: NEED TO CREATE
  📁 apps/web-user/src/app/[locale]/po/page.tsx
  📁 apps/api/src/routes/po.ts

Tasks:
  ✅ PO schema (PBI-046)
  [ ] Auto-generation logic (PBI-047)
  [ ] PO endpoints (PBI-048)
  [ ] Customer UI (PBI-049)

Endpoints Needed:
  GET /api/po
  GET /api/po/:id
  POST /api/po/:id/download-pdf
  POST /api/po/:id/send-email

Blocker: Sprint 10 must complete first
```

---

### Sprint 12 - PB-08: Pembayaran (Generate Invoice)
**Status**: 🟡 PARTIAL (30%)

```
Requirement: RF-007
Code Location: NEED TO CREATE
  📁 apps/api/src/routes/invoice.ts

Tasks:
  ✅ Invoice schema (PBI-050)
  [ ] Auto-generation logic (PBI-051)
  [ ] Customer UI (PBI-052)
  [ ] Backend integration (PBI-053)

Endpoints Needed:
  GET /api/invoices
  GET /api/invoices/:id
  POST /api/invoices/:id/send-email
  POST /api/invoices/:id/download-pdf

Missing:
  ❌ Auto-generate when PO created
  ❌ Invoice number generation (INV-YYYY-MM-XXXXX)
  ❌ Email invoice to customer
  ❌ PDF generation

Blocker: Sprint 11 must complete first
```

---

### Sprint 13 - PB-09: Pembayaran (View Invoice)
**Status**: 🟡 PARTIAL (20%)

```
Requirement: RF-008
Code Location: NEED TO CREATE
  📁 apps/web-user/src/app/[locale]/invoices/page.tsx

Tasks:
  [ ] Invoice fetch logic (PBI-054)
  [ ] Invoice numbering (PBI-055)
  [ ] Customer invoice view (PBI-056)
  [ ] Backend integration (PBI-057)

Features Needed:
  ❌ Customer can view their invoices
  ❌ See detailed breakdown (items, taxes, fees)
  ❌ Download PDF
  ❌ Print invoice
  ❌ Email to themselves or others

Blocker: Sprint 12 must complete first
```

---

### Sprint 14 - PB-10: Pembayaran (Upload Bukti)
**Status**: 🟡 PARTIAL (20%)

```
Requirement: RF-009
Code Location: NEED TO CREATE
  📁 apps/web-user/src/app/[locale]/payment/[id]/upload.tsx
  📁 apps/api/src/routes/payment-upload.ts

Tasks:
  [ ] Payment schema (PBI-058)
  [ ] File upload logic (PBI-059)
  [ ] Upload form UI (PBI-060)
  [ ] Backend integration (PBI-061)

Endpoints Needed:
  POST /api/payments/:id/upload-proof
  GET /api/payments/:id/status
  GET /api/payments/:id/history

Infrastructure Needed:
  ❌ File storage (AWS S3 / Local)
  ❌ File validation (size, type, dimensions)
  ❌ Virus scanning
  ❌ File cleanup/retention policy

Blocker: Sprint 13 must complete first
```

---

## 🔄 DEPENDENCY CHAIN VISUALIZATION

```
Sprint 6 (Register)
    ↓
Sprint 7 (Login)
    ↓
Sprint 8 (Rental Request)
    ↓
Sprint 9 (Offer Notification)
    ↓
Sprint 10 (Approve Offer → Auto-generate PO)
    ↓
Sprint 11 (PO Management)
    ↓
Sprint 12 (Invoice Generation)
    ↓
Sprint 13 (Customer View Invoice)
    ↓
Sprint 14 (Payment Upload)
```

**Critical Path Length**: 14 weeks sequential  
**Current Blockage**: Sprint 6 not started (Critical Blocker)

---

## 📈 COMPLETION METRICS

### By Module

| Module | Status | % Complete | Sprint |
|--------|--------|-----------|--------|
| Identitas Pengguna | ❌ NOT STARTED | 0% | 6-7 |
| Penyewaan | 🟡 PARTIAL | 33% | 8-11 |
| Pembayaran | 🟡 PARTIAL | 27% | 12-14 |
| Pengelolaan Aset | ✅ COMPLETE | 100% | 3-4 |
| Pelaporan | ✅ COMPLETE | 100% | 5 |

### Overall Progress
- **Backend Ready**: 90% (missing auth, file upload, notifications)
- **Admin Interface**: 100% complete
- **Manager Interface**: 100% complete
- **Customer Interface**: 30% (mock UI only)

---

## ✅ NEXT IMMEDIATE STEPS

### THIS WEEK
1. Start Sprint 6 - User Registration
2. Setup MongoDB connection
3. Install bcrypt & JWT packages

### NEXT WEEK
1. Complete Sprint 6 - Register endpoint + form
2. Begin Sprint 7 - Login implementation
3. Setup JWT tokens & session management

### WEEK 3
1. Complete Sprint 7 - Full authentication
2. Start database integration
3. Replace all mock data with real queries

### WEEK 4+
1. Begin customer features (Sprints 8-14)
2. Implement notifications & file uploads
3. Payment gateway integration

---

## 🎓 KEY INSIGHTS

### What's Ready
- ✅ All admin operations working
- ✅ All manager operations working
- ✅ Backend API structure solid
- ✅ Type safety implemented
- ✅ UI components available

### What's Missing
- ❌ User authentication (CRITICAL BLOCKER)
- ❌ Customer facing features
- ❌ Data persistence (using mock only)
- ❌ Notifications & communication
- ❌ File uploads & document storage

### Recommendations
1. **IMMEDIATELY**: Start Sprint 6 & 7
2. **Setup** database & persistence layer
3. **Complete** customer interface features
4. **Add** notifications & email service
5. **Implement** payment gateway

---

**Status**: Analysis Complete ✅  
**Ready to Execute**: YES 🚀  
**Estimated Timeline**: 8-10 weeks to MVP  
**Priority**: Authentication is CRITICAL blocker  

For detailed implementation guides, see:
- REQUIREMENTS_IMPLEMENTATION_STATUS.md
- SPRINT_6_7_AUTHENTICATION_ROADMAP.md
- IMPLEMENTATION_STATUS_SUMMARY.md
