const hijaiyah = [
  { huruf: "ا", bacaan: { fatha: "a", kasrah: "i", dammah: "u" } },
  { huruf: "ب", bacaan: { fatha: "ba", kasrah: "bi", dammah: "bu" } },
  { huruf: "ت", bacaan: { fatha: "ta", kasrah: "ti", dammah: "tu" } },
  { huruf: "ث", bacaan: { fatha: "tsa", kasrah: "tsi", dammah: "tsu" } },
  { huruf: "ج", bacaan: { fatha: "ja", kasrah: "ji", dammah: "ju" } },
  { huruf: "ح", bacaan: { fatha: "ha", kasrah: "hi", dammah: "hu" } },
  { huruf: "خ", bacaan: { fatha: "kha", kasrah: "khi", dammah: "khu" } },
  { huruf: "د", bacaan: { fatha: "da", kasrah: "di", dammah: "du" } },
  { huruf: "ذ", bacaan: { fatha: "za", kasrah: "zi", dammah: "zu" } },
  { huruf: "ر", bacaan: { fatha: "ra", kasrah: "ri", dammah: "ru" } },
  { huruf: "ز", bacaan: { fatha: "za", kasrah: "zi", dammah: "zu" } },
  { huruf: "س", bacaan: { fatha: "sa", kasrah: "si", dammah: "su" } },
  { huruf: "ش", bacaan: { fatha: "sha", kasrah: "shi", dammah: "shu" } },
  { huruf: "ص", bacaan: { fatha: "sha", kasrah: "shi", dammah: "shu" } },
  { huruf: "ض", bacaan: { fatha: "dha", kasrah: "dhi", dammah: "dhu" } },
  { huruf: "ط", bacaan: { fatha: "ta", kasrah: "ti", dammah: "tu" } },
  { huruf: "ظ", bacaan: { fatha: "dha", kasrah: "dhi", dammah: "dhu" } },
  { huruf: "ع", bacaan: { fatha:"a","kasrah":"i","dammah":"u"} },
  { huruf:"غ","bacaan":{"fatha":"gha","kasrah":"ghi","dammah":"ghu"}},
  { huruf: "ف", bacaan: { fatha: "fa", kasrah: "fi", dammah: "fu" } },
  { huruf: "ق", bacaan: { fatha: "qa", kasrah: "qi", dammah: "qu" } },
  { huruf: "ك", bacaan: { fatha: "ka", kasrah: "ki", dammah: "ku" } },
  { huruf: "ل", bacaan: { fatha: "la", kasrah: "li", dammah: "lu" } },
  { huruf: "م", bacaan: { fatha: "ma", kasrah: "mi", dammah: "mu" } },
  { huruf: "ن", bacaan: { fatha: "na", kasrah: "ni", dammah: "nu" } },
  { huruf: "ه", bacaan: { fatha: "ha", kasrah: "hi", dammah: "hu" } },
  { huruf:"و","bacaan":{"fatha":"wa","kasrah":"wi","dammah":"wu"}},
  { huruf:"ي","bacaan":{"fatha":"ya","kasrah":"yi","dammah":"yu"}}
];

let harakatSekarang = "fatha";
let zoomLevel = 1;
let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

document.addEventListener("DOMContentLoaded", function () {

  const carousel = document.querySelector(".carousel");
  const sidebar = document.querySelector(".sidebar");

  function renderHuruf() {
    carousel.innerHTML = "";
    sidebar.innerHTML = "";

    hijaiyah.forEach((item, index) => {
      const slide = document.createElement("div");
      slide.className = "slide";
      slide.style.fontSize = `${zoomLevel}em`;

      const hurufContainer = document.createElement("div");
      hurufContainer.className = "huruf-container";

      const huruf = document.createElement("h2");
      huruf.textContent = item.huruf;

      const harakatSpan = document.createElement("span");
      harakatSpan.className = "harakat-display";
      harakatSpan.textContent = item.bacaan[harakatSekarang];

      hurufContainer.appendChild(huruf);
      hurufContainer.appendChild(harakatSpan);
      slide.appendChild(hurufContainer);

      const suaraBtn = document.createElement("button");
      suaraBtn.textContent = "🔊 Baca";
      suaraBtn.onclick = () => {
        const teks = item.bacaan[harakatSekarang];
        const utterance = new SpeechSynthesisUtterance(teks);
        utterance.lang = "ar-SA";
        speechSynthesis.speak(utterance);
      };
      slide.appendChild(suaraBtn);

      const bookmarkBtn = document.createElement("button");
      bookmarkBtn.className = "bookmark-btn";
      bookmarkBtn.textContent = bookmarks.includes(index) ? "★ Ditandai" : "☆ Tandai";
      if (bookmarks.includes(index)) bookmarkBtn.classList.add("active");

      bookmarkBtn.onclick = () => {
        if (bookmarks.includes(index)) {
          bookmarks = bookmarks.filter(i => i !== index);
        } else {
          bookmarks.push(index);
        }
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        renderHuruf();
      };

      slide.appendChild(bookmarkBtn);
      carousel.appendChild(slide);

      const navBtn = document.createElement("button");
      navBtn.textContent = item.huruf;
      navBtn.onclick = () => {
        slide.scrollIntoView({ behavior: "smooth" });
      };
      sidebar.appendChild(navBtn);
    });
  }

  function gantiHarakat(mode) {
    harakatSekarang = mode;
    document.querySelectorAll('.harakat-controls button').forEach(btn => {
      btn.classList.remove("active");
    });
    document.getElementById(`btn-${mode}`).classList.add("active");
    renderHuruf();
  }

  window.gantiHarakat = gantiHarakat;

  window.zoomIn = function () {
    zoomLevel += 0.2;
    renderHuruf();
  }

  window.zoomOut = function () {
    zoomLevel = Math.max(0.5, zoomLevel - 0.2);
    renderHuruf();
  }

  window.ModeHitam = function () {
    document.body.classList.toggle("dark");
  }

  window.tampilkanFavorit = function () {
    alert("Huruf yang ditandai akan ditampilkan nanti. Coming soon 😄");
  }

  window.toggleSidebar = function () {
    document.querySelector(".sidebar").classList.toggle("hidden");
  }

  renderHuruf();
});
