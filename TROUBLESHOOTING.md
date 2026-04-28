# 🔧 Admin Panel Troubleshooting Guide

## ✅ Issue Fixed: "Failed to Fetch" Error

### What Was Wrong:
The User model's pre-save hook had an issue with the `next()` callback in newer Mongoose versions.

### What Was Fixed:
✅ Updated `backend/models/User.js` - Removed `next` parameter from pre-save hook
✅ Recreated admin user with proper password hashing
✅ Added better error logging in LoginModal
✅ Created test page for debugging

---

## 🚀 Quick Fix Steps

### 1. Recreate Admin User
```bash
cd backend
node seedAdmin.js
```

**Expected Output:**
```
✅ Admin user created successfully!
📧 Admin Credentials:
   Email: admin@fashionhub.com
   Password: admin123456
   Role: admin
```

### 2. Verify Backend is Running
```bash
cd backend
npm start
```

**Expected Output:**
```
🚀 FashionHub API Server
   Environment : development
   Port        : 5000
   URL         : http://localhost:5000
```

### 3. Test Login with HTML Test Page
Open `test-admin-login.html` in your browser and click:
1. "Test Backend Connection" - Should show ✅
2. "Test Admin Login" - Should show ✅ with token
3. "Test Admin Stats" - Should show ✅ with statistics

---

## 🐛 Common Issues & Solutions

### Issue 1: "Failed to fetch" or "Network Error"

**Cause:** Backend server not running

**Solution:**
```bash
cd backend
npm start
```

Verify it's running on http://localhost:5000

---

### Issue 2: "Invalid email or password"

**Cause:** Admin user not created or password mismatch

**Solution:**
```bash
cd backend
node seedAdmin.js
```

Use exact credentials:
- Email: `admin@fashionhub.com`
- Password: `admin123456`

---

### Issue 3: "Not authorized, no token provided"

**Cause:** Token not being sent with request

**Solution:**
1. Login first to get token
2. Token is automatically stored in localStorage
3. Check browser console for token storage confirmation

---

### Issue 4: CORS Error

**Cause:** Frontend and backend on different origins

**Solution:**
Backend already has CORS configured in `server.js`:
```javascript
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
}));
```

If frontend is on different port, update `.env`:
```
FRONTEND_URL=http://localhost:3000
```

---

### Issue 5: MongoDB Connection Error

**Cause:** MongoDB not running or wrong connection string

**Solution:**
1. Check MongoDB is running:
   ```bash
   # Windows
   net start MongoDB
   
   # Mac/Linux
   sudo systemctl start mongod
   ```

2. Verify `.env` file in backend:
   ```
   MONGO_URI=mongodb://localhost:27017/fashionhub
   ```

---

### Issue 6: Admin Panel Not Opening

**Cause:** User role not set to 'admin'

**Solution:**
Check user role in database or recreate admin:
```bash
cd backend
node seedAdmin.js
```

---

### Issue 7: "next is not a function" Error

**Cause:** Old Mongoose pre-save hook syntax

**Solution:**
✅ Already fixed in `backend/models/User.js`

The hook now uses:
```javascript
userSchema.pre('save', async function () {
    // No next parameter needed
});
```

---

## 🧪 Testing Checklist

Run through this checklist to verify everything works:

- [ ] Backend starts without errors
- [ ] Can access http://localhost:5000
- [ ] Admin user exists in database
- [ ] Can login with admin credentials
- [ ] Token is stored in localStorage
- [ ] Admin panel opens after login
- [ ] Dashboard shows statistics
- [ ] Can view products
- [ ] Can view orders
- [ ] Can view users

---

## 📊 Verification Commands

### Check if Backend is Running:
```bash
curl http://localhost:5000
```

**Expected:** JSON response with API info

### Test Admin Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@fashionhub.com","password":"admin123456"}'
```

**Expected:** JSON with token and user data

### Test Admin Stats (with token):
```bash
curl http://localhost:5000/api/admin/stats \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected:** JSON with dashboard statistics

---

## 🔍 Debug Mode

### Enable Console Logging

The LoginModal now has detailed logging. Open browser console (F12) to see:
- 🔐 Login attempt
- 📡 Response status
- 📦 Response data
- ✅ Token storage confirmation
- ❌ Any errors

### Check Network Tab

1. Open DevTools (F12)
2. Go to Network tab
3. Try logging in
4. Check the request to `/api/auth/login`
5. Verify:
   - Status: 200 OK
   - Response has token
   - Request has correct email/password

---

## 📁 Files Modified (for reference)

### Fixed Files:
```
✅ backend/models/User.js           - Fixed pre-save hook
✅ src/components/LoginModal.jsx    - Added error logging
✅ backend/seedAdmin.js             - Admin user creator
```

### New Files:
```
✅ backend/resetAdmin.js            - Reset admin user
✅ backend/createAdminDirect.js     - Direct admin creation
✅ test-admin-login.html            - Test page
✅ TROUBLESHOOTING.md               - This file
```

---

## 🆘 Still Having Issues?

### Step-by-Step Debug:

1. **Stop all Node processes:**
   ```bash
   # Windows
   taskkill /F /IM node.exe
   
   # Mac/Linux
   killall node
   ```

2. **Clear everything:**
   ```bash
   # Clear node_modules
   cd backend
   rm -rf node_modules
   npm install
   ```

3. **Recreate admin:**
   ```bash
   node seedAdmin.js
   ```

4. **Start fresh:**
   ```bash
   npm start
   ```

5. **Test with HTML page:**
   Open `test-admin-login.html` in browser

---

## ✅ Success Indicators

You'll know everything is working when:

✅ Backend starts on port 5000
✅ Admin user created successfully
✅ Login returns token
✅ Token stored in localStorage
✅ Admin panel opens
✅ Dashboard shows statistics
✅ All admin features accessible

---

## 📞 Quick Reference

**Admin Credentials:**
- Email: `admin@fashionhub.com`
- Password: `admin123456`

**Backend URL:**
- http://localhost:5000

**Test Page:**
- Open `test-admin-login.html` in browser

**Recreate Admin:**
```bash
cd backend && node seedAdmin.js
```

**Start Backend:**
```bash
cd backend && npm start
```

**Start Frontend:**
```bash
npm start
```

---

**Status:** ✅ Issue Resolved
**Last Updated:** 2026-04-27
