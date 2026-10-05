const C = {
  nama: "SMK Wiyata Mandala",
  ta: "2027/2028",
  kepsek: "[Nama Kepala Sekolah], Kepala SMK Wiyata Mandala Bogor",
  wa: "6281234567890",
  tel: "08xx-xxxx-xxxx",
  alamat: "[Isi alamat lengkap sekolah], Bogor, Jawa Barat",
  jam: "Senin–Jumat, 08.00–14.00 WIB",
  jur: [
    [
      "TKJ",
      "Teknik Komputer & Jaringan",
      "Jaringan, server, keamanan siber, dan perakitan komputer.",
    ],
    ["AK", "Akuntansi", "Pencatatan keuangan, perpajakan, dan aplikasi akuntansi."],
    ["MP", "Manajemen Perkantoran", "Administrasi modern, kearsipan digital, dan layanan prima."],
    ["BD", "Bisnis Digital", "Pemasaran digital, e-commerce, dan kewirausahaan."],
  ],
};
const $ = (id) => document.getElementById(id),
  wa = (t) => "https://wa.me/" + C.wa + "?text=" + encodeURIComponent(t);
// Isi teks otomatis dari CONFIG
document.querySelectorAll("[data-c]").forEach((e) => (e.textContent = C[e.dataset.c]));
document
  .querySelectorAll(".wa")
  .forEach((a) => (a.href = wa("Halo " + C.nama + ", saya ingin bertanya seputar pendaftaran.")));
C.jur.forEach((j) => {
  $("jur").insertAdjacentHTML(
    "beforeend",
    '<div class="card"><div class="jb">' +
      j[0] +
      "</div><h3>" +
      j[1] +
      " (" +
      j[0] +
      ")</h3><p>" +
      j[2] +
      "</p></div>",
  );
  $("sel").add(new Option(j[1] + " (" + j[0] + ")", j[1]));
});
$("f").onsubmit = (e) => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(e.target));
  const code =
    "WM-" +
    new Date().toISOString().slice(2, 10).replace(/-/g, "") +
    "-" +
    Math.random().toString(36).slice(2, 6).toUpperCase();
  $("cd").textContent = code;
  const sd = $("sd");
  sd.textContent = "";
  [
    ["Nama", d.nama],
    ["Asal sekolah", d.asal],
    ["Jurusan", d.jur],
    ["WhatsApp", d.hp],
  ].forEach((r) => {
    const p = document.createElement("div");
    p.textContent = r[0] + ": " + r[1];
    sd.appendChild(p);
  });
  $("wk").href = wa(
    "Halo " +
      C.nama +
      ", saya sudah pra-daftar. Kode: " +
      code +
      ". Nama: " +
      d.nama +
      ", Jurusan: " +
      d.jur +
      ". Saya akan datang ke sekolah untuk daftar offline.",
  );
  $("slip").showModal();
};
