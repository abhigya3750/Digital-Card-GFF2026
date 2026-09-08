/* ==========================================================================
   GFF 2026 Digital vCard Engine - LinkedIn Style Full Circle Design
   ========================================================================== */

const PROFILES = {
  abhigya: {
    id: "abhigya",
    name: "Abhigya Kanungo",
    headline: "Founding Member | Open for Product & Growth Roles",
    org: "Nerds (New Era Rebels for Disruptive Solutions)",
    title: "Founding Member - Product & Growth",
    phone: "+919993805217",
    displayPhone: "+91 9993805217",
    email: "info@nerds.co.in",
    personalEmail: "kanungoabhigya3750@gmail.com",
    linkedIn: "https://www.linkedin.com/in/abhigyakanungo",
    displayLinkedIn: "linkedin.com/in/abhigyakanungo",
    initials: "AK",
    themeClass: "theme-nerds",
    photoSrc: "assets/abhigya_photo.jpg",
    logoSrc: "assets/nerds_logo.png",
    logoFallback: "NERDS",
    pin: "3750",
    waMessage: "Hi Abhigya, great connecting with you at Global Fintech Fest 2026! Let's catch up regarding Product & Growth opportunities."
  },
  rishi: {
    id: "rishi",
    name: "Rishi Raj",
    headline: "Product Manager - NBBL",
    org: "NPCI Bharat BillPay Limited (NBBL)",
    title: "Product Manager",
    phone: "+919165251871",
    displayPhone: "+91 9165251871",
    email: "rishi.raj@npci.org.in",
    personalEmail: "",
    linkedIn: "https://www.linkedin.com/in/rishi-raj-356ba212a",
    displayLinkedIn: "linkedin.com/in/rishi-raj",
    initials: "RR",
    themeClass: "theme-npci",
    photoSrc: "assets/rishi_photo.jpg",
    logoSrc: "assets/npci_logo.svg",
    logoFallback: "NPCI / NBBL",
    pin: "9165",
    waMessage: "Hi Rishi, great connecting with you at Global Fintech Fest 2026! Let's stay in touch."
  },
  kamal: {
    id: "kamal",
    name: "Kamal Parihar",
    headline: "Marketing & Growth Executive | Fintech Builder | GFF 2026",
    org: "Tapits Technologies (Fingpay)",
    title: "Marketing & Growth Executive",
    phone: "+919131633921",
    displayPhone: "+91 9131633921",
    email: "Kamal@tapits.in",
    personalEmail: "",
    linkedIn: "https://www.linkedin.com/in/kamal-parihar",
    displayLinkedIn: "linkedin.com/in/kamal-parihar",
    initials: "KP",
    themeClass: "theme-fingpay",
    photoSrc: "assets/kamal_photo.jpg",
    logoSrc: "assets/fingpay_logo.jpg",
    logoFallback: "FINGPAY",
    pin: "141120",
    waMessage: "Hi Kamal, great connecting with you at Global Fintech Fest 2026! Let's connect regarding Tapits / Fingpay."
  },
  mahavir: {
    id: "mahavir",
    name: "Mahavir Galve",
    headline: "Lead Fintech Solutions at NBBL",
    org: "NPCI Bharat BillPay Limited (NBBL)",
    title: "Lead Fintech Solutions",
    phone: "+918390079634",
    displayPhone: "+91 83900 79634",
    email: "mahavir.galve@npci.org.in",
    personalEmail: "",
    linkedIn: "https://www.linkedin.com/in/mahavirgalve/",
    displayLinkedIn: "linkedin.com/in/mahavirgalve",
    initials: "MG",
    themeClass: "theme-npci",
    photoSrc: "assets/mahavir_photo.jpg",
    logoSrc: "assets/npci_logo.svg",
    logoFallback: "NPCI / NBBL",
    pin: "0000",
    waMessage: "Hi Mahavir, great connecting with you at Global Fintech Fest 2026! Let's connect regarding NBBL Fintech Solutions."
  }
};

let currentProfile = PROFILES.abhigya;
let isUnlocked = false;

document.addEventListener("DOMContentLoaded", () => {
  // Register Service Worker for 100% Offline-First support
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(() => {
      console.log("Service Worker registered successfully for offline support.");
    }).catch((err) => {
      console.log("Service worker registration failed:", err);
    });
  }

  const urlParams = new URLSearchParams(window.location.search);
  const profileParam = urlParams.get("profile");

  if (profileParam && PROFILES[profileParam.toLowerCase()]) {
    currentProfile = PROFILES[profileParam.toLowerCase()];
  } else {
    currentProfile = PROFILES.abhigya;
  }

  // Admin query param toggle
  if (urlParams.get("admin") === "true" || urlParams.get("owner") === "true") {
    const selBox = document.getElementById("profileSelectorBox");
    if (selBox) selBox.style.display = "block";
  }

  syncProfileSelectors(currentProfile.id);
  renderProfileCard(currentProfile);
});

function syncProfileSelectors(profileId) {
  const topSel = document.getElementById("profileSelect");
  const drawerSel = document.getElementById("drawerProfileSelect");
  if (topSel) topSel.value = profileId;
  if (drawerSel) drawerSel.value = profileId;
}

function switchProfile(profileId) {
  if (PROFILES[profileId]) {
    currentProfile = PROFILES[profileId];
    isUnlocked = false;
    syncProfileSelectors(profileId);
    renderProfileCard(currentProfile);
    showToast(`Loaded ${currentProfile.name}'s Pass`);
  }
}

function renderProfileCard(prof) {
  // Body Theme Class
  document.body.className = prof.themeClass;

  // Name & Headline
  document.getElementById("profName").textContent = prof.name;
  document.getElementById("profHeadline").textContent = prof.headline;

  // Organization
  const orgEl = document.getElementById("profOrg");
  if (prof.org) {
    orgEl.style.display = "block";
    orgEl.innerHTML = `<i class="fa-solid fa-building-columns"></i> ${prof.org}`;
  } else {
    orgEl.style.display = "none";
  }

  // Render Photo or Initials
  const photoImg = document.getElementById("profilePhotoImg");
  const initialsSpan = document.getElementById("heroInitials");

  if (prof.photoSrc) {
    photoImg.src = prof.photoSrc;
    photoImg.style.display = "block";
    initialsSpan.style.display = "none";
  } else {
    photoImg.style.display = "none";
    initialsSpan.style.display = "block";
    initialsSpan.textContent = prof.initials;
  }

  // Render Logo Box (In Portrait Row)
  const logoBox = document.getElementById("logoBox");
  const logoImg = document.getElementById("compLogoImg");
  const logoFallback = document.getElementById("compLogoFallback");

  if (prof.logoSrc) {
    logoBox.style.display = "flex";
    logoImg.src = prof.logoSrc;
    logoImg.style.display = "block";
    logoFallback.style.display = "none";
    logoImg.onerror = function() {
      if (prof.logoFallback) {
        this.style.display = "none";
        logoFallback.style.display = "block";
        logoFallback.textContent = prof.logoFallback;
      } else {
        logoBox.style.display = "none";
      }
    };
  } else if (prof.logoFallback) {
    logoBox.style.display = "flex";
    logoImg.style.display = "none";
    logoFallback.style.display = "block";
    logoFallback.textContent = prof.logoFallback;
  } else {
    logoBox.style.display = "none";
  }

  // Render Info Tags (if any exist)
  const tagsContainer = document.getElementById("infoTags");
  if (tagsContainer) {
    if (prof.tags && prof.tags.length > 0) {
      tagsContainer.style.display = "flex";
      tagsContainer.innerHTML = prof.tags.map(t => `
        <span class="tag"><i class="${t.icon}"></i> ${escapeHtml(t.text)}</span>
      `).join('');
    } else {
      tagsContainer.style.display = "none";
    }
  }

  // Primary Actions
  const cleanPhone = prof.phone.replace(/[^0-9+]/g, "");
  const waUrl = `https://wa.me/${cleanPhone.replace("+", "")}?text=${encodeURIComponent(prof.waMessage)}`;
  document.getElementById("btnWhatsapp").href = waUrl;

  // Social Links
  document.getElementById("btnLinkedIn").href = prof.linkedIn;
  document.getElementById("dispLinkedIn").textContent = prof.displayLinkedIn;

  // Primary Email
  document.getElementById("dispEmail").textContent = prof.email;
  document.getElementById("btnEmail").href = `mailto:${prof.email}`;

  // Personal Email
  const personalEmailCard = document.getElementById("btnEmailPersonal");
  if (prof.personalEmail) {
    personalEmailCard.style.display = "flex";
    document.getElementById("dispEmailPersonal").textContent = prof.personalEmail;
    personalEmailCard.href = `mailto:${prof.personalEmail}`;
    document.getElementById("lblEmail").textContent = "Work Email";
  } else {
    personalEmailCard.style.display = "none";
    document.getElementById("lblEmail").textContent = "Email";
  }

  // Phone
  document.getElementById("btnPhone").href = `tel:${cleanPhone}`;
  document.getElementById("dispPhone").textContent = prof.displayPhone;

  // Owner Notes Label
  document.getElementById("ownerBtnLabel").textContent = `${prof.name.split(' ')[0]}'s Notes`;
}

// Download vCard
function downloadVCard() {
  const p = currentProfile;
  const vcardText = `BEGIN:VCARD
VERSION:3.0
N:${p.name.split(' ').reverse().join(';')};;;
FN:${p.name}
${p.org ? `ORG:${p.org}\n` : ''}TITLE:${p.title || p.headline}
TEL;TYPE=CELL,VOICE:${p.phone}
EMAIL;TYPE=WORK,INTERNET:${p.email}
${p.personalEmail ? `EMAIL;TYPE=HOME,INTERNET:${p.personalEmail}\n` : ''}URL:${p.linkedIn}
NOTE:Met at Global Fintech Fest 2026 (GFF 2026).
END:VCARD`;

  const blob = new Blob([vcardText], { type: "text/vcard;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${p.name.replace(/\s+/g, '_')}_GFF2026.vcf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  showToast("Contact saved! Import into contacts.");
}

// Owner PIN Auth Logic
function openOwnerAuthModal() {
  if (isUnlocked) {
    openNotesDrawer();
    return;
  }
  document.getElementById("pinOwnerName").textContent = currentProfile.name;
  document.getElementById("ownerPinInput").value = "";
  document.getElementById("authModal").classList.add("active");
  setTimeout(() => document.getElementById("ownerPinInput").focus(), 100);
}

function closeAuthModal() {
  document.getElementById("authModal").classList.remove("active");
}

function verifyPin() {
  const inputPin = document.getElementById("ownerPinInput").value.trim();
  if (inputPin === currentProfile.pin) {
    isUnlocked = true;
    closeAuthModal();
    openNotesDrawer();
    showToast(`Unlocked ${currentProfile.name}'s Notes`);
  } else {
    showToast(`Incorrect PIN for ${currentProfile.name}`);
  }
}

function openNotesDrawer() {
  document.getElementById("drawerOwnerTitle").textContent = `${currentProfile.name}'s Lead Notes`;
  renderNotes();
  document.getElementById("notesDrawer").classList.add("active");
}

function closeNotesDrawer() {
  document.getElementById("notesDrawer").classList.remove("active");
}

// QR Code Modal
function openQrModal() {
  const modal = document.getElementById("qrModal");
  const qrContainer = document.getElementById("qrcode");
  const modalSub = document.getElementById("qrModalSub");
  const qrUrlText = document.getElementById("qrUrlText");

  modalSub.textContent = currentProfile.name;
  const currentUrl = `${window.location.origin}${window.location.pathname}?profile=${currentProfile.id}`;
  qrUrlText.textContent = currentUrl;

  qrContainer.innerHTML = "";
  new QRCode(qrContainer, {
    text: currentUrl,
    width: 190,
    height: 190,
    colorDark: "#0f172a",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });

  modal.classList.add("active");
}

function closeQrModal() {
  document.getElementById("qrModal").classList.remove("active");
}

function copyProfileUrl() {
  const currentUrl = `${window.location.origin}${window.location.pathname}?profile=${currentProfile.id}`;
  navigator.clipboard.writeText(currentUrl).then(() => showToast("Pass link copied!"));
}

function copyToClipboard(event, text, msg) {
  event.preventDefault();
  event.stopPropagation();
  navigator.clipboard.writeText(text).then(() => showToast(msg));
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  document.getElementById("toastMsg").textContent = msg;
  toast.classList.add("active");
  setTimeout(() => toast.classList.remove("active"), 2500);
}

// LocalStorage Notes Management
function getStorageKey() {
  return `gff_notes_v2_${currentProfile.id}`;
}

function getNotes() {
  const stored = localStorage.getItem(getStorageKey());
  return stored ? JSON.parse(stored) : [];
}

function saveNote(e) {
  e.preventDefault();
  const name = document.getElementById("leadName").value.trim();
  const company = document.getElementById("leadCompany").value.trim();
  const contact = document.getElementById("leadContact").value.trim();
  const tag = document.getElementById("leadTag").value;
  const notes = document.getElementById("leadNotes").value.trim();

  if (!name || !company) return;

  const newNote = {
    id: Date.now(),
    name,
    company,
    contact,
    tag,
    notes,
    date: new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  };

  const currentNotes = getNotes();
  currentNotes.unshift(newNote);
  localStorage.setItem(getStorageKey(), JSON.stringify(currentNotes));

  document.getElementById("noteForm").reset();
  renderNotes();
  showToast(`Note saved for ${name}`);
}

function renderNotes() {
  const notes = getNotes();
  const search = (document.getElementById("crmSearch").value || "").toLowerCase();
  const listContainer = document.getElementById("notesList");
  document.getElementById("notesCount").textContent = notes.length;

  const filtered = notes.filter(n =>
    n.name.toLowerCase().includes(search) ||
    n.company.toLowerCase().includes(search) ||
    n.tag.toLowerCase().includes(search) ||
    (n.notes && n.notes.toLowerCase().includes(search))
  );

  if (filtered.length === 0) {
    listContainer.innerHTML = `
      <div style="text-align: center; padding: 24px; color: var(--text-muted); font-size: 0.85rem;">
        <i class="fa-solid fa-folder-open" style="font-size: 2rem; margin-bottom: 8px; color: var(--text-light);"></i>
        <p>No notes logged for ${currentProfile.name} yet.</p>
      </div>
    `;
    return;
  }

  listContainer.innerHTML = filtered.map(n => `
    <div class="note-item">
      <div class="note-item-header">
        <div>
          <div class="note-item-name">${escapeHtml(n.name)}</div>
          <div class="note-item-company"><i class="fa-solid fa-building"></i> ${escapeHtml(n.company)}</div>
        </div>
        <span class="note-tag">${escapeHtml(n.tag)}</span>
      </div>
      ${n.contact ? `<div style="font-size: 0.78rem; color: var(--text-muted);"><i class="fa-solid fa-address-book"></i> ${escapeHtml(n.contact)}</div>` : ''}
      ${n.notes ? `<div style="font-size: 0.82rem; color: var(--text-dark); margin-top: 4px;">${escapeHtml(n.notes)}</div>` : ''}
      <div style="font-size: 0.72rem; color: var(--text-light); margin-top: 4px;">${n.date}</div>
    </div>
  `).join('');
}

// Export Notes to CSV File (Supports 200+ Leads)
function exportNotesToCSV() {
  const notes = getNotes();
  if (notes.length === 0) {
    showToast("No notes to export yet!");
    return;
  }

  const headers = ["Name", "Company", "Contact", "Topic", "Notes", "Date"];
  const rows = notes.map(n => [
    `"${(n.name || '').replace(/"/g, '""')}"`,
    `"${(n.company || '').replace(/"/g, '""')}"`,
    `"${(n.contact || '').replace(/"/g, '""')}"`,
    `"${(n.tag || '').replace(/"/g, '""')}"`,
    `"${(n.notes || '').replace(/"/g, '""')}"`,
    `"${(n.date || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${currentProfile.name.replace(/\s+/g, '_')}_GFF2026_Leads.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  showToast(`Exported ${notes.length} leads to CSV!`);
}

function escapeHtml(str) {
  return (str || '').replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
