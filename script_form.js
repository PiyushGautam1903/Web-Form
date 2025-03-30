document.addEventListener('DOMContentLoaded', () => {
    // Initialize all elements safely
    const initElements = () => {
        // Custom cursor effect (only if element exists)
        const cursor = document.querySelector('.cursor');
        if (cursor) {
            document.addEventListener('mousemove', (e) => {
                cursor.style.left = `${e.clientX}px`;
                cursor.style.top = `${e.clientY}px`;
            });
        }
    };
    initElements();

    // Experience level display
    const experienceSlider = document.getElementById('experience');
    const experienceValue = document.getElementById('experience-value');
    if (experienceSlider && experienceValue) {
        experienceSlider.addEventListener('input', () => {
            experienceValue.textContent = experienceSlider.value;
        });
    }

    // File upload handling (with null checks)
    const dropArea = document.getElementById('drop-area');
    const fileInput = document.getElementById('profile-pic');
    const previewContainer = document.getElementById('preview-container');
    const preview = document.getElementById('preview');
    const removePreview = document.getElementById('remove-preview');
    const progressBar = document.querySelector('.progress-bar');
    const progress = document.querySelector('.progress');

    // Only initialize if required elements exist
    if (!dropArea || !fileInput) return;

    // Click to select files
    dropArea.addEventListener('click', () => fileInput.click());

    // File input change
    fileInput.addEventListener('change', handleFiles);

    // Drag and drop events
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function handleFiles(e) {
        const files = e.target.files;
        if (files.length > 0) {
            const file = files[0];
            if (file.size > 5 * 1024 * 1024) {
                showError('File size exceeds 5MB limit');
                return;
            }
            if (!file.type.match('image.*')) {
                showError('Please select an image file');
                return;
            }

            // Simulate upload progress
            progressBar.classList.remove('hidden');
            let progress = 0;
            const interval = setInterval(() => {
                progress += 5;
                updateProgress(progress);
                if (progress >= 100) {
                    clearInterval(interval);
                    setTimeout(() => progressBar.classList.add('hidden'), 1000);
                }
            }, 100);

            const reader = new FileReader();
            reader.onload = (e) => {
                preview.src = e.target.result;
                previewContainer.classList.remove('hidden');
            };
            reader.readAsDataURL(file);
        }
    }

    function updateProgress(percentage) {
        progress.style.width = `${percentage}%`;
    }

    // Form validation and submission
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            // [Rest of form validation logic...]
        });
    }

    function showError(message) {
        const messages = document.getElementById('form-messages');
        if (messages) {
            messages.innerHTML = `
                <div class="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
                    <i class="fas fa-exclamation-circle mr-2"></i>
                    ${message}
                </div>
            `;
            messages.classList.remove('hidden');
            setTimeout(() => messages.classList.add('hidden'), 5000);
        }
    }
});