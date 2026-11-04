// =================================================================
// MATRIX CANVAS BACKGROUND ANIMATION
// =================================================================
(function initMatrixBackground() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const phrase = "HUOKAING THARA BANK CITYMALL 50% DISCOUNT PROMOTION ";
  const fontSize = 15;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);

  function draw() {
    ctx.fillStyle = 'rgba(3, 7, 18, 0.18)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#eab308';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const char = phrase[Math.floor(Math.random() * phrase.length)];
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  setInterval(draw, 40);
})();

// =================================================================
// AI VOICE PRESENTATION ENGINE (Khmer & English)
// =================================================================
const voiceScripts = [
  {
    langCode: 'km',
    langName: 'Khmer',
    locale: 'km-KH',
    lines: [
      "សេចក្តីប្រកាសពិសេស ពីធនាគារ ហួកាំង ថារ៉ា សហការជាមួយ ផ្សារទំនើប Citymall Supermarket។",
      "ទទួល‌បាន‌ការ‌បញ្ចុះ‌តម្លៃ‌រហូត‌ដល់ ៥០% សម្រាប់ការ‌ទូទាត់‌ប្រាក់‌ទាំងអស់‌តាម‌រយៈ ធនាគារ ហួកាំង ថារ៉ា។",
      "គ្រាន់តែបង់ប្រាក់តាមរយៈកម្មវិធីធនាគារឌីជីថល ឬកាតធនាគារ ហួកាំង ថារ៉ា នៅគ្រប់បញ្ជរទូទាត់ប្រាក់ទាំងអស់ក្នុងផ្សារទំនើប Citymall។"
    ]
  },
  {
    langCode: 'en',
    langName: 'English',
    locale: 'en-US',
    lines: [
      "Special Announcement from Huokaing Thara Bank in cooperation with Citymall Supermarket.",
      "Get an instant 50% discount for all payments made using Huokaing Thara Bank.",
      "Simply pay using your Huokaing Thara Bank app or payment card at any Citymall cash counter."
    ]
  }
];

let activeLangIdx = 0;
let activeLineIdx = 0;
let isVoiceSpeaking = false;

function processSpeechLine() {
  if (!isVoiceSpeaking || !('speechSynthesis' in window)) return;

  const currentLang = voiceScripts[activeLangIdx];

  if (activeLineIdx >= currentLang.lines.length) {
    activeLineIdx = 0;
    activeLangIdx = (activeLangIdx + 1) % voiceScripts.length;
    setTimeout(processSpeechLine, 1000);
    return;
  }

  const textToSpeak = currentLang.lines[activeLineIdx];
  const transcriptEl = document.getElementById('transcript-box');
  if (transcriptEl) {
    transcriptEl.textContent = `[${currentLang.langName.toUpperCase()}] ${textToSpeak}`;
  }

  const utterance = new SpeechSynthesisUtterance(textToSpeak);
  utterance.lang = currentLang.locale;
  utterance.rate = 0.95;

  utterance.onend = function() {
    activeLineIdx++;
    if (isVoiceSpeaking) setTimeout(processSpeechLine, 400);
  };

  speechSynthesis.speak(utterance);
}

function playVoiceAnnouncement(langCode) {
  if (!('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  isVoiceSpeaking = true;

  const foundIdx = voiceScripts.findIndex(s => s.langCode === langCode);
  activeLangIdx = foundIdx !== -1 ? foundIdx : 0;
  activeLineIdx = 0;

  processSpeechLine();
}

function stopVoiceReader() {
  isVoiceSpeaking = false;
  if ('speechSynthesis' in window) speechSynthesis.cancel();
}

// =================================================================
// LIVE TELEMETRY LOGS
// =================================================================
const telemetryFeed = document.getElementById("telemetry-feed");
if (telemetryFeed) {
  setInterval(() => {
    const logs = [
      "PROMOTION VERIFIED: 50% Discount active across all Citymall cash registers.",
      "PAYMENT GATEWAY CONNECTED: Huokaing Thara Bank instant processing online.",
      "SECURITY AUDIT PASSED: Encrypted QR transactions verified.",
      "PARTNERSHIP ACTIVE: Huokaing Thara Bank × Citymall Supermarket."
    ];
    const logItem = logs[Math.floor(Math.random() * logs.length)];
    const li = document.createElement("li");
    li.innerHTML = `<span style="color:var(--neon-gold)">[${new Date().toLocaleTimeString()}]</span> <strong>${logItem}</strong>`;
    telemetryFeed.insertBefore(li, telemetryFeed.firstChild);
    if (telemetryFeed.children.length > 4) telemetryFeed.removeChild(telemetryFeed.lastChild);
  }, 4000);
}
