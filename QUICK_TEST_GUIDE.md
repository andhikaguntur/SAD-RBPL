# 🚀 Quick Test - Verify Everything Works

## 30-Second Verification

### Step 1: Start Backend (Terminal 1)
```bash
cd /Users/surfer/Documents/Projects/Website/sad-rbpl
pnpm run dev:backend
```

**Expected Output:**
```
Backend running at http://localhost:4000
Available endpoints:
  GET  /api/health
  GET  /api/dashboard...
  ...
```

### Step 2: Start Frontend (Terminal 2)
```bash
cd /Users/surfer/Documents/Projects/Website/sad-rbpl
pnpm run dev:admin
```

**Expected Output:**
```
  ▲ Next.js
  - Local: http://localhost:3000
```

### Step 3: Open Browser
Go to: `http://localhost:3000`

You should see the admin dashboard loaded.

### Step 4: Test a Button (60 seconds)

#### Test 1: Dashboard KPI Load
- ✅ Should see KPI cards with data (Rp 128.5M, 24 Unit, etc.)
- ✅ Period selector shows 7d, 30d, Hari Ini

#### Test 2: Fleet/Asset Button
- Click "Lihat Detail Inventaris" button
- ✅ Should navigate to `/[locale]/kelola-aset`
- ✅ Should see 4 machines (MSN-501, MSN-502, MSN-101, MSN-102)
- ✅ Should see status badges (Tersedia, Disewa, Perbaikan, Dipesan)

#### Test 3: Status Update Button
- On fleet page, click "Kelola Aset" on any machine
- ✅ Drawer opens showing machine details
- Click one of the status buttons (e.g., "Disewa")
- ✅ Should see loading indicator
- ✅ Should see success notification: "Status Diperbarui"
- Close drawer
- ✅ Confirm the machine status changed in the list

#### Test 4: Payment Approval
- Navigate to `/[locale]/pembayaran` (from navbar or click in code)
- ✅ Should see 2 payments with "Menunggu Validasi" status
- Click "Setujui" on first payment
- ✅ Confirmation modal appears
- Click "Setujui Pembayaran" in modal
- ✅ Should see loading state
- ✅ Should see success notification
- ✅ Payment status changes to "Lunas" (green badge)

#### Test 5: Form Submission
- Go back to dashboard `/[locale]`
- Click "Input Permintaan" button
- ✅ Form drawer opens
- Fill in: Client Name, Unit Type, Duration, Location
- Click "Submit Permintaan"
- ✅ Should see loading indicator
- ✅ Should see success notification
- ✅ Drawer closes

#### Test 6: Search/Filter
- Go to `/[locale]/log` page (Activity logs)
- ✅ Should see list of logs loaded
- Type in search box "Budi"
- ✅ List filters to show only "Budi Santoso" logs
- Change category filter
- ✅ List filters by type

#### Test 7: Modal with Confirmation
- Go to `/[locale]/pembayaran`
- Click on any payment to open drawer
- Click "Lihat Bukti" to see proof image
- Close drawer
- ✅ Everything works

---

## Advanced Testing (5 minutes)

### Test with Network Inspector

1. Open DevTools: **F12**
2. Go to **Network** tab
3. Try clicking "Kelola Aset" button again
4. In Network tab, you should see:
   - Request: `PATCH /api/machines/MSN-501`
   - Response: `{status: 200}` with updated machine data

### Test Error Handling

1. Stop the backend: **Ctrl+C** in terminal 1
2. Try clicking any button in frontend
3. ✅ Should see error notification: "Failed to..."
4. Start backend again
5. ✅ Buttons work again

### Test All Pages Load

Navigate through all pages:
- [x] `/[locale]` - Dashboard
- [x] `/[locale]/kelola-aset` - Fleet
- [x] `/[locale]/permintaan` - Requests
- [x] `/[locale]/pembayaran` - Payments
- [x] `/[locale]/konfirmasi-terima` - Delivery
- [x] `/[locale]/log` - Logs
- [x] `/[locale]/po` - PO Archive

Each page should:
1. Load data from backend
2. Show data in table/list
3. Be fully interactive

---

## Checklist: If You See All ✅, You're Good!

**Backend Starting**
- [x] Port 4000 is running
- [x] No errors in console
- [x] Endpoints listed on startup

**Frontend Starting**
- [x] Port 3000 is running
- [x] No errors in console
- [x] Page loads at localhost:3000

**Dashboard Loads**
- [x] KPI cards show: Rp 128.5M, 24 Unit, etc.
- [x] Fleet chart shows data
- [x] Transactions table shows 4 entries
- [x] Period selector works

**Fleet Page Works**
- [x] 4 machines display
- [x] Grid/List toggle works
- [x] Search filters machines
- [x] Status dropdown filters machines
- [x] "Kelola Aset" button opens drawer

**Status Update Works**
- [x] Drawer shows machine details
- [x] Status buttons clickable
- [x] Shows loading during update
- [x] Shows success notification
- [x] List updates with new status

**Payment Page Works**
- [x] 2 payments show with "Menunggu Validasi"
- [x] "Setujui" button opens modal
- [x] Modal shows confirmation
- [x] Clicking "Setujui" updates status to "Lunas"
- [x] Success notification appears

**Search/Filter Works**
- [x] Typing in search box filters list
- [x] Dropdown filters work
- [x] Lists update instantly

**Navigation Works**
- [x] Can navigate between all 7 pages
- [x] Buttons link correctly
- [x] Back button works

---

## Troubleshooting

### "Cannot reach localhost:4000"
```bash
# Check if backend is running
lsof -i :4000

# If not, make sure you ran:
pnpm run dev:backend
```

### "Cannot reach localhost:3000"
```bash
# Check if frontend is running
lsof -i :3000

# If not, make sure you ran:
pnpm run dev:admin
```

### "API request failed" in console
1. Check browser console (F12 → Console)
2. Check backend console for error message
3. Verify both are running on correct ports

### "TypeScript errors"
Run:
```bash
pnpm run typecheck
```

Should show: 0 errors

### "Buttons not responding"
1. Open DevTools Console (F12)
2. Try clicking button again
3. Check for error messages
4. Check Network tab to see if request was made
5. Check backend console for error

---

## What You Should NOT See

❌ **Do NOT see these errors:**
- `Cannot GET /api/...`
- `Connection refused`
- `TypeError: fetch is not defined`
- `Cannot read property of undefined`
- `Module not found`
- `Port already in use`

If you see any of these:
1. Stop all terminals: **Ctrl+C**
2. Kill any processes on ports:
   ```bash
   lsof -i :4000 | awk 'NR!=1 {print $2}' | xargs kill
   lsof -i :3000 | awk 'NR!=1 {print $2}' | xargs kill
   ```
3. Start fresh

---

## Performance Check

**Good Performance = Page loads < 1 second after button click**

If it takes longer:
1. Check Network tab (F12) for slow requests
2. Check backend console for errors
3. Restart both servers

---

## Success Criteria

You know it's working when:

✅ All 7 pages load with real data from API
✅ Every button makes an HTTP request
✅ Data updates immediately on screen
✅ No errors in browser console
✅ No errors in backend console
✅ Network requests show 200 status codes
✅ All modals work and submit data
✅ Search and filter work on live data
✅ Error notifications appear when backend is down
✅ Loading states appear during operations

---

## Time Estimates

| Action | Expected Time |
|--------|---|
| Start backend | 3 seconds |
| Start frontend | 5 seconds |
| Load dashboard | 1 second |
| Load any page | 1 second |
| API response | < 500ms |
| Button click → response | < 1 second |

---

## Next: Try These Advanced Tests

1. **Create Rental Request** (Dashboard form)
2. **Approve a Payment** (Pembayaran page)
3. **Update Machine Status** (Kelola Aset page)
4. **Confirm Delivery** (Konfirmasi Terima page)
5. **Validate a Request** (Permintaan page)

All should update data in backend successfully.

---

**Everything Working?** 🎉 

Your app is ready for:
- Database integration
- Authentication
- Deployment testing
- User acceptance testing

Next steps:
1. Review `API_INTEGRATION_GUIDE.md` for details
2. Check `COMPLETE_BUTTON_STATUS.md` for what each button does
3. Start working on MongoDB integration
4. Add authentication layer
5. Deploy to staging environment
