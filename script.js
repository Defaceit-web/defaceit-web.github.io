// ===== DOM Elements =====
const inputVideoInput = document.getElementById('input-video');
const dropZone = document.getElementById('drop-zone');
const dropZoneText = document.getElementById('drop-zone-text');
const fileNameDisplay = document.getElementById('file-name-display');

// Removed output elements as requested
const videoPreview = document.getElementById('video-preview');
const previewPlayer = document.getElementById('preview-player');
const videoDuration = document.getElementById('video-duration');
const videoSize = document.getElementById('video-size');

const blurStrength = document.getElementById('blur-strength');
const blurValue = document.getElementById('blur-value');
const confidence = document.getElementById('confidence');
const confidenceValue = document.getElementById('confidence-value');
const pitchShift = document.getElementById('pitch-shift');
const pitchValue = document.getElementById('pitch-value');

const detectFaces = document.getElementById('detect-faces');
const detectPlates = document.getElementById('detect-plates');
const deviceSelect = document.getElementById('device');
const blurTypeRadios = document.querySelectorAll('input[name="blur-type"]');

const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const statusText = document.getElementById('status-text');
const fpsText = document.getElementById('fps-text');

const startBtn = document.getElementById('start-btn');
const startBtnText = document.getElementById('start-btn-text');
const cancelBtn = document.getElementById('cancel-btn');
const downloadAgainBtn = document.getElementById('download-again-btn');

const previewAudioBtn = document.getElementById('preview-audio-btn');
const stopPreviewBtn = document.getElementById('stop-preview-btn');

const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

const langButtons = document.querySelectorAll('.lang-btn');

// ===== Global State =====
let currentLang = 'fa';
let isProcessing = false;
let selectedInputFile = null;
let yoloSession = null;
let modelLoading = false;
let lastBlobUrl = null;
let outputFilename = "processed.mp4"; // Default

// ===== Language Data =====
const translations = {
    fa: {
        subtitle: "تار کردن چهره و پلاک در ویدیو",
        dropText: "برای انتخاب ویدیو کلیک کنید",
        startProcessing: "شروع پردازش",
        cancel: "لغو",
        downloadAgain: "دانلود مجدد",
        processingStarted: "در حال پردازش...",
        statusFinalizing: "در حال ساخت فایل MP4...",
        completed: "پایان! (دانلود شد) ✓",
        readyToProcess: "آماده برای پردازش",
        ready: "آماده",
        duration: "مدت:",
        size: "حجم:",
        seconds: "ثانیه",
        mb: "مگابایت",
        errorNoInput: "لطفا ویدیو را انتخاب کنید",
        errorNoDetection: "حداقل یک گزینه تشخیص را انتخاب کنید",
        statusAudio: "در حال پردازش صدا...",
        processingSuccess: "پردازش کامل شد",
        welcomeMessage: "خوش آمدید!",

        // --- Security Section (Updated) ---
        securityTitle: "🔒 تضمین امنیت و حریم خصوصی",
        securityText: "برای حفظ امنیت و ناشناس ماندن شما، تمامی پردازش‌ها به صورت <strong>۱۰۰٪ محلی و آفلاین</strong> (Client-Side) در مرورگر شما انجام می‌شود. <br> هیچ ویدیو یا داده‌ای هرگز از دستگاه شما خارج نمی‌شود و به هیچ سروری ارسال نمی‌گردد.",
        verifyCode: "بررسی کد منبع در گیت‌هاب (Open Source)",

        webDeveloper: "توسعه‌دهنده نسخه وب:",
        anonContributor: "مشارکت‌کننده ناشناس",
        thanksNote: "با تشکر از Shin",
        progress: "پیشرفت",
        status: "وضعیت:",
        speed: "سرعت:",
        settings: "تنظیمات",
        blurStrength: "قدرت تار کردن:",
        low: "کم",
        high: "زیاد",
        confidence: "اعتماد:",
        blurType: "نوع تار کردن:",
        gaussian: "گاوسی",
        pixelate: "پیکسلی",
        detect: "تشخیص:",
        faces: "چهره‌ها",
        plates: "پلاک‌ها",
        device: "دستگاه:",
        auto: "خودکار",
        cpu: "پردازنده (CPU)",
        gpu: "کارت گرافیک (GPU)",
        pitchShift: "تغییر زیر و بم صدا:",
        semitones: "نیم‌پرده",
        previewAudio: "پیش‌نمایش صدا",
        stopPreview: "توقف پیش‌نمایش",
        credits: "اعتبارات"
    },
    en: {
        subtitle: "Blur Faces & License Plates",
        dropText: "Click to Select Video",
        startProcessing: "Start Processing",
        cancel: "Cancel",
        downloadAgain: "Download Again",
        processingStarted: "Processing...",
        statusFinalizing: "Creating MP4...",
        completed: "Done! (Downloaded) ✓",
        readyToProcess: "Ready to process",
        ready: "Ready",
        duration: "Duration:",
        size: "Size:",
        seconds: "sec",
        mb: "MB",
        errorNoInput: "Please select video",
        errorNoDetection: "Select detection type",
        statusAudio: "Processing Audio...",
        processingSuccess: "Processing Complete",
        welcomeMessage: "Welcome!",

        // --- Security Section (English) ---
        securityTitle: "🔒 Security & Privacy Guarantee",
        securityText: "To ensure your security and anonymity, all processing is performed <strong>100% locally and offline</strong> (Client-Side) within your browser. <br> No video or data ever leaves your device or is sent to any server.",
        verifyCode: "Verify Source Code on GitHub (Open Source)",

        webDeveloper: "Web Developer:",
        anonContributor: "Anonymous",
        thanksNote: "Thanks to Shin",
        progress: "Progress",
        status: "Status:",
        speed: "Speed:",
        settings: "Settings",
        blurStrength: "Blur Strength:",
        low: "Low",
        high: "High",
        confidence: "Confidence:",
        blurType: "Blur Type:",
        gaussian: "Gaussian",
        pixelate: "Pixelate",
        detect: "Detect:",
        faces: "Faces",
        plates: "License Plates",
        device: "Device:",
        auto: "Auto",
        cpu: "CPU",
        gpu: "GPU",
        pitchShift: "Audio Pitch Shift:",
        semitones: "semitones",
        previewAudio: "Preview Audio",
        stopPreview: "Stop Preview",
        credits: "Credits"
    }
};

// ===== UX Helper Functions =====
function showToast(message, duration = 3000) {
    toastMessage.textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), duration);
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 MB';
    const k = 1024;
    return parseFloat((bytes / Math.pow(k, 2)).toFixed(2)) + ' MB';
}

function formatDuration(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function updatePageLanguage(lang) {
    // Basic text updates
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (key === 'thanksNote') {
                const shinLink = '<a href="https://x.com/hey_itsmyturn" target="_blank" class="link">Shin</a>';
                el.innerHTML = lang === 'fa' ? `با تشکر از ${shinLink}` : `Thanks to ${shinLink}`;
            } else if (key === 'securityText') {
                // Allows HTML tags like <strong> and <br>
                el.innerHTML = translations[lang][key];
            } else {
                el.textContent = translations[lang][key];
            }
        }
    });

    // Dynamic text
    if (!selectedInputFile) dropZoneText.textContent = translations[lang].dropText;
    if (!isProcessing && !lastBlobUrl) statusText.textContent = translations[lang].readyToProcess;
}


// ===== Model Loading =====
const modelUpload = document.getElementById('model-upload');
const modelLoaderContainer = document.getElementById('model-loader-container');

async function loadModel(file = null) {
    statusText.textContent = "Loading Model...";
    try {
        let modelUrl = file ? URL.createObjectURL(file) : './yolo11n.onnx';
        yoloSession = await ort.InferenceSession.create(modelUrl, {
            executionProviders: ['wasm'],
            graphOptimizationLevel: 'all'
        });
        document.getElementById('model-loader-container').classList.add('hidden');
        statusText.textContent = translations[currentLang].ready;
        return true;
    } catch (e) {
        console.error(e);
        if (!file) modelLoaderContainer.classList.remove('hidden');
        return false;
    }
}
modelUpload.addEventListener('change', (e) => loadModel(e.target.files[0]));

// ===== Core Logic =====
function preprocess(sourceCanvas) {
    const w = 640, h = 640;
    const tC = document.createElement('canvas');
    tC.width = w; tC.height = h;
    const tCtx = tC.getContext('2d', { willReadFrequently: true });
    tCtx.drawImage(sourceCanvas, 0, 0, w, h);
    const { data } = tCtx.getImageData(0, 0, w, h);
    const input = new Float32Array(1 * 3 * w * h);
    for (let i = 0; i < w * h; i++) {
        input[i] = data[i * 4] / 255.0;
        input[i + w * h] = data[i * 4 + 1] / 255.0;
        input[i + 2 * w * h] = data[i * 4 + 2] / 255.0;
    }
    return new ort.Tensor('float32', input, [1, 3, w, h]);
}

function postProcess(outputTensor, imgWidth, imgHeight) {
    const output = outputTensor.data;
    const stride = 8400; const modelOutputProto = outputTensor.dims[1];
    const boxes = []; const scores = []; const classIds = [];
    const confThreshold = parseFloat(confidence.value);

    for (let i = 0; i < stride; i++) {
        let maxScore = 0; let maxClass = -1;
        for (let c = 4; c < modelOutputProto; c++) {
            const score = output[c * stride + i];
            if (score > maxScore) { maxScore = score; maxClass = c - 4; }
        }
        if (maxScore > confThreshold) {
            const cx = output[0 * stride + i]; const cy = output[1 * stride + i];
            const w = output[2 * stride + i]; const h = output[3 * stride + i];
            const x = (cx - w / 2) * (imgWidth / 640);
            const y = (cy - h / 2) * (imgHeight / 640);
            const width = w * (imgWidth / 640);
            const height = h * (imgHeight / 640);
            boxes.push([x, y, width, height]);
            scores.push(maxScore);
            classIds.push(maxClass);
        }
    }
    if (boxes.length === 0) return [];

    // NMS
    const indices = scores.map((s, i) => ({ s, i })).sort((a, b) => b.s - a.s).map(x => x.i);
    const active = new Array(indices.length).fill(true);
    const result = [];
    for (let i = 0; i < indices.length; i++) {
        if (!active[i]) continue;
        const idx = indices[i];
        result.push({ box: boxes[idx], score: scores[idx], classId: classIds[idx] });
        for (let j = i + 1; j < indices.length; j++) {
            if (!active[j]) continue;
            const idx2 = indices[j];
            const x1 = Math.max(boxes[idx][0], boxes[idx2][0]);
            const y1 = Math.max(boxes[idx][1], boxes[idx2][1]);
            const x2 = Math.min(boxes[idx][0] + boxes[idx][2], boxes[idx2][0] + boxes[idx2][2]);
            const y2 = Math.min(boxes[idx][1] + boxes[idx][3], boxes[idx2][1] + boxes[idx2][3]);
            if (x2 < x1 || y2 < y1) continue;
            const inter = (x2 - x1) * (y2 - y1);
            const union = (boxes[idx][2] * boxes[idx][3]) + (boxes[idx2][2] * boxes[idx2][3]) - inter;
            if ((inter / union) > 0.45) active[j] = false;
        }
    }
    return result;
}

function applyBlur(ctx, box, strength) {
    let [x, y, w, h] = box;
    if (w < 1) w = 1; if (h < 1) h = 1;
    const pixelSize = Math.max(5, strength / 2);
    ctx.imageSmoothingEnabled = false;
    const smallW = Math.max(1, Math.floor(w / pixelSize));
    const smallH = Math.max(1, Math.floor(h / pixelSize));
    const tC = document.createElement('canvas');
    tC.width = smallW; tC.height = smallH;
    const tCtx = tC.getContext('2d');
    tCtx.drawImage(ctx.canvas, x, y, w, h, 0, 0, smallW, smallH);
    ctx.drawImage(tC, 0, 0, smallW, smallH, x, y, w, h);
    ctx.imageSmoothingEnabled = true;
}

async function processAudio(file, muxer) {
    statusText.textContent = translations[currentLang].statusAudio;
    try {
        const ctx = new AudioContext();
        const ab = await file.arrayBuffer();
        const audBuf = await ctx.decodeAudioData(ab);
        const enc = new AudioEncoder({
            output: (chunk, meta) => muxer.addAudioChunk(chunk, meta),
            error: e => console.error(e)
        });
        enc.configure({
            codec: 'mp4a.40.2',
            numberOfChannels: audBuf.numberOfChannels,
            sampleRate: audBuf.sampleRate,
            bitrate: 128000
        });
        const size = audBuf.length; const rate = audBuf.sampleRate;
        const chunk = rate;
        for (let i = 0; i < size; i += chunk) {
            const len = Math.min(chunk, size - i);
            const ts = (i / rate) * 1_000_000;
            const data = new Float32Array(len * audBuf.numberOfChannels);
            for (let c = 0; c < audBuf.numberOfChannels; c++) {
                data.set(audBuf.getChannelData(c).subarray(i, i + len), c * len);
            }
            const frame = new AudioData({
                format: 'f32-planar', sampleRate: rate, numberOfChannels: audBuf.numberOfChannels,
                numberOfFrames: len, timestamp: ts, data: data
            });
            enc.encode(frame);
            frame.close();
            await new Promise(r => setTimeout(r, 0));
        }
        await enc.flush();
        return true;
    } catch (e) { console.warn("Audio error:", e); return false; }
}

async function startVideoProcessing() {
    // Stop blinking start, start processing state
    startBtn.classList.remove('blinking');
    startBtn.classList.add('hidden');
    cancelBtn.classList.remove('hidden');
    downloadAgainBtn.classList.add('hidden');

    if (!selectedInputFile || !yoloSession) return;

    const video = document.createElement('video');
    video.src = URL.createObjectURL(selectedInputFile);
    video.muted = true;
    await new Promise(r => video.onloadedmetadata = r);

    let w = video.videoWidth; let h = video.videoHeight;
    if (w % 2 !== 0) w -= 1; if (h % 2 !== 0) h -= 1;

    const canvas = document.createElement('canvas');
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    const muxer = new Mp4Muxer.Muxer({
        target: new Mp4Muxer.ArrayBufferTarget(),
        video: { codec: 'avc', width: w, height: h },
        audio: { codec: 'aac', numberOfChannels: 2, sampleRate: 44100 },
        firstTimestampBehavior: 'offset'
    });

    await processAudio(selectedInputFile, muxer);

    const videoEncoder = new VideoEncoder({
        output: (chunk, meta) => muxer.addVideoChunk(chunk, meta),
        error: e => console.error(e)
    });
    videoEncoder.configure({
        codec: 'avc1.4d002a', width: w, height: h,
        bitrate: 4_000_000, framerate: 30
    });

    const fps = 30;
    const totalFrames = Math.floor(video.duration * fps);
    let frameIdx = 0; let lastTime = Date.now(); let frameCount = 0;

    const waitForSeek = () => new Promise(resolve => {
        const h = () => { video.removeEventListener('seeked', h); resolve(); };
        video.addEventListener('seeked', h);
    });

    async function processFrame() {
        if (!isProcessing) { videoEncoder.close(); return; }
        if (frameIdx >= totalFrames) {
            statusText.textContent = translations[currentLang].statusFinalizing;
            await videoEncoder.flush();
            muxer.finalize();

            const { buffer } = muxer.target;
            const blob = new Blob([buffer], { type: 'video/mp4' });
            lastBlobUrl = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = lastBlobUrl;
            a.download = outputFilename;
            a.click();

            // Finish State: Enable Download Again Blinking
            isProcessing = false;
            cancelBtn.classList.add('hidden');
            startBtn.classList.remove('hidden');
            downloadAgainBtn.classList.remove('hidden');
            downloadAgainBtn.classList.add('blinking'); // START BLINKING

            progressFill.style.width = '100%';
            progressText.textContent = '100%';
            statusText.textContent = translations[currentLang].completed;
            showToast(translations[currentLang].completed);
            return;
        }

        video.currentTime = frameIdx / fps;
        await waitForSeek();

        ctx.drawImage(video, 0, 0, w, h);
        const inputTensor = preprocess(canvas);
        const results = await yoloSession.run({ images: inputTensor });
        const detections = postProcess(results[Object.keys(results)[0]], w, h);

        const strength = parseInt(blurStrength.value);
        detections.forEach(det => {
            if ((detectFaces.checked && det.classId === 0) ||
                (detectPlates.checked && det.classId === 2)) {
                applyBlur(ctx, det.box, strength);
            }
        });

        const ts = (frameIdx / fps) * 1_000_000;
        const frame = new VideoFrame(canvas, { timestamp: ts });
        videoEncoder.encode(frame);
        frame.close();

        frameIdx++;
        const pct = Math.floor((frameIdx / totalFrames) * 100);
        progressFill.style.width = `${pct}%`;
        progressText.textContent = `${pct}%`;
        statusText.textContent = `${translations[currentLang].processingStarted} ${frameIdx}/${totalFrames}`;

        frameCount++;
        if (Date.now() - lastTime >= 1000) {
            fpsText.textContent = frameCount + " FPS";
            frameCount = 0; lastTime = Date.now();
        }
        setTimeout(processFrame, 0);
    }
    processFrame();
}

// ===== Listeners =====
// Init State: Blink Upload
document.addEventListener('DOMContentLoaded', () => {
    dropZone.classList.add('blinking');
    blurValue.textContent = "25";
    loadModel();
});

inputVideoInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        selectedInputFile = file;
        fileNameDisplay.textContent = file.name;
        dropZoneText.textContent = "Change Video"; // Update text

        // State Change: Stop Upload Blink -> Start Start Blink
        dropZone.classList.remove('blinking');
        startBtn.classList.remove('hidden');
        startBtn.classList.add('blinking');
        downloadAgainBtn.classList.add('hidden'); // Hide old download
        downloadAgainBtn.classList.remove('blinking');

        // Update filename variable
        outputFilename = file.name.replace(/\.[^/.]+$/, "") + "_blurred.mp4";

        const url = URL.createObjectURL(file);
        previewPlayer.src = url;
        videoPreview.classList.remove('hidden');
        previewPlayer.onloadedmetadata = () => {
            videoDuration.textContent = translations[currentLang].duration + " " + formatDuration(previewPlayer.duration);
            videoSize.textContent = translations[currentLang].size + " " + formatFileSize(file.size);
        };
        if (!yoloSession) loadModel();
    }
});

startBtn.addEventListener('click', () => {
    isProcessing = true;
    startVideoProcessing();
});

downloadAgainBtn.addEventListener('click', () => {
    if (lastBlobUrl) {
        downloadAgainBtn.classList.remove('blinking'); // Stop blinking on click
        const a = document.createElement('a');
        a.href = lastBlobUrl;
        a.download = outputFilename;
        a.click();
    }
});

cancelBtn.addEventListener('click', () => {
    isProcessing = false;
    location.reload();
});

// Settings
blurStrength.addEventListener('input', (e) => blurValue.textContent = e.target.value);
confidence.addEventListener('input', (e) => confidenceValue.textContent = parseFloat(e.target.value).toFixed(2));
pitchShift.addEventListener('input', (e) => {
    const v = parseInt(e.target.value);
    pitchValue.textContent = v > 0 ? `+${v}` : v;
});
langButtons.forEach(btn => btn.addEventListener('click', () => {
    langButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentLang = btn.dataset.lang;
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'fa' ? 'rtl' : 'ltr';
    updatePageLanguage(currentLang);
}));
document.addEventListener('dragover', (e) => e.preventDefault());
document.addEventListener('drop', (e) => e.preventDefault());