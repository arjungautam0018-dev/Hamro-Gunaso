const express = require("express");
const router = express.Router();

// ====================
// Middleware to protect admin pages
// ====================
function isAdmin(req, res, next) {
  if (req.session?.isAdmin === true) return next();
  res.redirect("/admin"); // redirect to login page
}

// ====================
// POST /admin/login
// ====================
router.post("/login", (req, res) => {
  const password = req.body.password;
  console.log("Password received:", password); // for debugging

  if (password === process.env.ADMIN_PASSWORD) {
    req.session.isAdmin = true;          // set admin session
    console.log("Session created for Admin ");
    return res.redirect("/admin/dashboard");
  }

  // Wrong password → redirect back to login with error flag
  return res.redirect("/admin?error=1");
});

// ====================
// GET /admin/logout
// ====================
router.get("/logout", (req, res) => {
  req.session.isAdmin = false;
  req.session.destroy(() => {
    res.redirect("/admin"); // back to login page
  });
});

// Export middleware for protecting routes
router.isAdmin = isAdmin;

module.exports = router;
