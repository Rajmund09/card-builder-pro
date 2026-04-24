document.addEventListener('DOMContentLoaded', function () {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // DOM Elements
    const header = document.getElementById('header');
    const cardTypeSection = document.getElementById('card-type-section');
    const builderSection = document.getElementById('builder-section');
    const cardOptions = document.querySelectorAll('.card-option');
    const prevStepBtn = document.getElementById('prev-step-btn');
    const nextStepBtn = document.getElementById('next-step-btn');
    const progressBar = document.getElementById('progress-bar');
    const steps = document.querySelectorAll('.step');
    const toastContainer = document.getElementById('toast-container');

    // Card Preview Elements
    const cardPreview = document.getElementById('card-preview');
    const previewTitle = document.getElementById('preview-title');
    const previewSubtitle = document.getElementById('preview-subtitle');
    const previewText = document.getElementById('preview-text');
    const previewBackText = document.getElementById('preview-back-text');
    const previewContact = document.getElementById('preview-contact');
    const previewFooter = document.getElementById('preview-footer');
    const cardIcon = document.getElementById('card-icon');
    const cardLogo = document.getElementById('card-logo');
    const cardBackground = document.getElementById('card-background');
    const previewBackDate = document.getElementById('preview-back-date');

    // Control Elements
    const themeSelect = document.getElementById('theme-select');
    const colorPicker = document.getElementById('color-picker');
    const colorPreview = document.getElementById('color-preview');
    const fontSelect = document.getElementById('font-select');
    const cardLayoutSelect = document.getElementById('card-layout');
    const borderRadiusSlider = document.getElementById('border-radius-slider');
    const borderRadiusValue = document.getElementById('border-radius-value');
    const shadowToggle = document.getElementById('shadow-toggle');
    const titleInput = document.getElementById('title-input');
    const subtitleInput = document.getElementById('subtitle-input');
    const textInput = document.getElementById('text-input');
    const backTextInput = document.getElementById('back-text-input');
    const contactInput = document.getElementById('contact-input');
    const footerInput = document.getElementById('footer-input');
    const bgImageInput = document.getElementById('bg-image');
    const logoImageInput = document.getElementById('logo-image');
    const iconSelect = document.getElementById('icon-select');
    const iconColor = document.getElementById('icon-color');
    const keepBgToggle = document.getElementById('keep-bg-toggle');

    // Button Elements
    const flipCardBtn = document.getElementById('flip-card-btn');
    const downloadPngBtn = document.getElementById('download-png-btn');
    const downloadPdfBtn = document.getElementById('download-pdf-btn');
    const shareCardBtn = document.getElementById('share-card-btn');
    const saveDesignBtn = document.getElementById('save-design-btn');
    const finalizeCardBtn = document.getElementById('finalize-card-btn');
    const addSampleImageBtn = document.getElementById('add-sample-image');
    const exportAllBtn = document.getElementById('export-all-btn');
    const exportModal = document.getElementById('export-modal');
    const exportModalCloseBtn = document.getElementById('export-modal-close');
    const exportModalCancelBtn = document.getElementById('export-modal-cancel');
    const exportPngBtn = document.getElementById('export-png-btn');
    const exportPdfBtn = document.getElementById('export-pdf-btn');
    const exportJsonBtn = document.getElementById('export-json-btn');
    const exportHtmlBtn = document.getElementById('export-html-btn');

    // Application State
    let currentStep = 1;
    let currentCardType = '';
    let currentTheme = 'modern';
    let isCardFlipped = false;
    let currentBackgroundImage = null;
    let currentLogoImage = null;
    let cardDesigns = JSON.parse(localStorage.getItem('cardDesigns') || '[]');

    // Theme Data
    const themes = {
        modern: {
            name: 'Modern',
            color: '#64ffda',
            gradient: 'linear-gradient(135deg, #64ffda 0%, #0077b6 100%)',
            font: "'Poppins', sans-serif"
        },
        corporate: {
            name: 'Corporate',
            color: '#1e3a8a',
            gradient: 'linear-gradient(135deg, #1e3a8a 0%, #0d1b2a 100%)',
            font: "'Poppins', sans-serif"
        },
        elegant: {
            name: 'Elegant',
            color: '#7209b7',
            gradient: 'linear-gradient(135deg, #7209b7 0%, #3a0ca3 100%)',
            font: "'Montserrat', sans-serif"
        },
        minimal: {
            name: 'Minimal',
            color: '#64748b',
            gradient: 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
            font: "'Poppins', sans-serif"
        },
        colorful: {
            name: 'Colorful',
            color: '#f72585',
            gradient: 'linear-gradient(135deg, #f72585 0%, #b5179e 100%)',
            font: "'Poppins', sans-serif"
        },
        vintage: {
            name: 'Vintage',
            color: '#78350f',
            gradient: 'linear-gradient(135deg, #78350f 0%, #451a03 100%)',
            font: "'Times New Roman', serif"
        },
        fun: {
            name: 'Fun',
            color: '#f8961e',
            gradient: 'linear-gradient(135deg, #f8961e 0%, #f3722c 100%)',
            font: "'Poppins', sans-serif"
        }
    };

    // Initialize the application
    function init() {
        setupAccessibleCards();
        setupEventListeners();
        colorPreview.style.backgroundColor = colorPicker.value;
        previewBackDate.textContent = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        window.addEventListener('scroll', handleScroll);
    }

    function setupAccessibleCards() {
        cardOptions.forEach(option => {
            option.setAttribute('role', 'button');
            option.setAttribute('tabindex', '0');
            option.addEventListener('keydown', event => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    option.click();
                }
            });
        });
    }

    // Set up all event listeners
    function setupEventListeners() {
        cardOptions.forEach(option => {
            option.addEventListener('click', handleCardTypeSelect);
        });

        prevStepBtn.addEventListener('click', goToPreviousStep);
        nextStepBtn.addEventListener('click', goToNextStep);
        flipCardBtn.addEventListener('click', toggleCardFlip);
        downloadPngBtn.addEventListener('click', () => downloadAsPNG());
        downloadPdfBtn.addEventListener('click', () => downloadAsPDF());
        shareCardBtn.addEventListener('click', shareCard);
        saveDesignBtn.addEventListener('click', saveDesign);
        finalizeCardBtn.addEventListener('click', finalizeCard);
        addSampleImageBtn.addEventListener('click', addSampleBackground);
        exportAllBtn.addEventListener('click', exportAllDesigns);
        exportModalCloseBtn.addEventListener('click', hideExportModal);
        exportModalCancelBtn.addEventListener('click', hideExportModal);
        exportPngBtn.addEventListener('click', async () => {
            hideExportModal();
            await downloadAsPNG();
        });
        exportPdfBtn.addEventListener('click', async () => {
            hideExportModal();
            await downloadAsPDF();
        });
        exportJsonBtn.addEventListener('click', exportCurrentDesignAsJSON);
        exportHtmlBtn.addEventListener('click', exportCurrentDesignAsHTML);

        bgImageInput.addEventListener('change', handleBackgroundImageUpload);
        logoImageInput.addEventListener('change', handleLogoImageUpload);

        titleInput.addEventListener('input', updatePreview);
        subtitleInput.addEventListener('input', updatePreview);
        textInput.addEventListener('input', updatePreview);
        backTextInput.addEventListener('input', updatePreview);
        contactInput.addEventListener('input', updatePreview);
        footerInput.addEventListener('input', updatePreview);
        colorPicker.addEventListener('input', updatePreview);
        fontSelect.addEventListener('change', updatePreview);
        cardLayoutSelect.addEventListener('change', updatePreview);
        borderRadiusSlider.addEventListener('input', updatePreview);
        shadowToggle.addEventListener('change', updatePreview);
        iconSelect.addEventListener('change', updatePreview);
        iconColor.addEventListener('input', updatePreview);
        themeSelect.addEventListener('change', handleThemeChange);

        keepBgToggle.addEventListener('change', function () {
            if (currentBackgroundImage && this.checked) {
                cardBackground.style.display = 'block';
            } else {
                cardBackground.style.display = 'none';
            }
        });

        exportModal.addEventListener('click', function (e) {
            if (e.target === exportModal) {
                hideExportModal();
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && exportModal.classList.contains('show')) {
                hideExportModal();
            }
        });
    }

    // Handle card type selection
    function handleCardTypeSelect(e) {
        const cardOption = e.currentTarget;
        currentCardType = cardOption.dataset.type;

        cardTypeSection.classList.add('hidden');
        builderSection.classList.remove('hidden');

        setupCardBuilder();
        updateProgress(2);

        showToast('Template Selected', `You've selected ${cardOption.querySelector('h3').textContent} template`, 'success');
    }

    // Setup card builder with selected type
    function setupCardBuilder() {
        // Reset images
        currentBackgroundImage = null;
        currentLogoImage = null;
        cardBackground.style.display = 'none';
        cardLogo.style.display = 'none';

        // Set default values
        themeSelect.value = currentTheme;
        colorPicker.value = '#64ffda';
        colorPreview.style.backgroundColor = '#64ffda';
        fontSelect.value = "'Poppins', sans-serif";
        iconSelect.value = '';
        iconColor.value = '#ffffff';
        cardLayoutSelect.value = 'standard';
        borderRadiusSlider.value = 20;
        borderRadiusValue.textContent = '20px';
        shadowToggle.checked = true;
        keepBgToggle.checked = true;

        applyTheme(themes[currentTheme]);
        updatePreview();
    }

    // Apply theme to card
    function applyTheme(themeData) {
        const cardFront = cardPreview.querySelector('.card-front');
        cardFront.style.background = themeData.gradient;
        cardPreview.style.fontFamily = themeData.font;
        colorPicker.value = themeData.color;
        colorPreview.style.backgroundColor = themeData.color;
    }

    // Update card preview in real-time
    function updatePreview() {
        previewTitle.textContent = titleInput.value || 'Your Name';
        previewSubtitle.textContent = subtitleInput.value || 'Your Position/Role';
        previewText.textContent = textInput.value || 'Your message goes here. Customize this text to create the perfect card for your occasion.';
        previewBackText.textContent = backTextInput.value || 'This is the back of your card. Add additional information, notes, or a personalized message here.';

        if (contactInput.value.trim()) {
            const contactLines = contactInput.value.split('\n');
            previewContact.innerHTML = contactLines.map(line => `<p>${line}</p>`).join('');
        } else {
            previewContact.innerHTML = '<p>Contact information will appear here</p>';
        }

        if (footerInput.value.trim()) {
            previewFooter.innerHTML = `<p>${footerInput.value.replace(/\n/g, '<br>')}</p>`;
        } else {
            previewFooter.innerHTML = '<p>Additional footer information can go here</p>';
        }

        const color = colorPicker.value;
        const colorRgb = hexToRgb(color);
        const darkerColor = `rgb(${Math.max(colorRgb.r - 40, 0)}, ${Math.max(colorRgb.g - 40, 0)}, ${Math.max(colorRgb.b - 40, 0)})`;
        const cardFront = cardPreview.querySelector('.card-front');

        // Only apply gradient if no background image is showing
        if (!currentBackgroundImage || !keepBgToggle.checked) {
            cardFront.style.background = `linear-gradient(135deg, ${color} 0%, ${darkerColor} 100%)`;
        } else {
            cardFront.style.background = color; // Solid color when background image is shown
        }

        colorPreview.style.backgroundColor = color;
        cardPreview.style.fontFamily = fontSelect.value;

        const borderRadius = `${borderRadiusSlider.value}px`;
        cardPreview.style.borderRadius = borderRadius;
        borderRadiusValue.textContent = borderRadius;

        cardPreview.style.boxShadow = shadowToggle.checked ? 'var(--shadow-lg)' : 'none';
        applyCardLayout();
        updateCardIcon();

        // Update background image visibility
        if (currentBackgroundImage && keepBgToggle.checked) {
            cardBackground.style.display = 'block';
        }
    }

    function applyCardLayout() {
        const layoutClasses = ['layout-standard', 'layout-centered', 'layout-split', 'layout-modern'];
        cardPreview.classList.remove(...layoutClasses);
        cardPreview.classList.add(`layout-${cardLayoutSelect.value}`);
    }

    // Update card icon
    function updateCardIcon() {
        if (iconSelect.value) {
            cardIcon.innerHTML = `<i class="${iconSelect.value}"></i>`;
            cardIcon.style.display = 'block';
            cardIcon.style.color = iconColor.value;
        } else {
            cardIcon.style.display = 'none';
        }
    }

    // Handle theme change
    function handleThemeChange() {
        currentTheme = themeSelect.value;
        applyTheme(themes[currentTheme]);
        updatePreview();
        showToast('Theme Updated', `Applied ${themes[currentTheme].name} theme`, 'success');
    }

    // Toggle card flip
    function toggleCardFlip() {
        isCardFlipped = !isCardFlipped;
        cardPreview.classList.toggle('flipped');
        flipCardBtn.innerHTML = isCardFlipped
            ? '<i class="fas fa-sync-alt"></i> Flip to Front'
            : '<i class="fas fa-sync-alt"></i> Flip Card';
    }

    // Handle background image upload - FIXED
    function handleBackgroundImageUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            showToast('Invalid File', 'Please select an image file', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = function (event) {
            currentBackgroundImage = event.target.result;
            cardBackground.src = currentBackgroundImage;

            // Apply the image with proper styling
            cardBackground.style.objectFit = 'cover';
            cardBackground.style.opacity = '0.25';
            cardBackground.style.filter = 'brightness(0.8)';

            if (keepBgToggle.checked) {
                cardBackground.style.display = 'block';
                // Apply overlay effect
                const cardFront = cardPreview.querySelector('.card-front');
                cardFront.style.background = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), ${colorPicker.value}`;
            }

            showToast('Background Added', 'Image uploaded successfully', 'success');
            updatePreview();
        };
        reader.readAsDataURL(file);
    }

    // Handle logo image upload - FIXED
    function handleLogoImageUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            showToast('Invalid File', 'Please select an image file', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = function (event) {
            currentLogoImage = event.target.result;
            cardLogo.src = currentLogoImage;
            cardLogo.style.display = 'block';
            cardLogo.style.maxWidth = '120px';
            cardLogo.style.maxHeight = '60px';
            cardLogo.style.objectFit = 'contain';
            cardLogo.style.borderRadius = '8px';
            cardLogo.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
            cardLogo.style.background = 'rgba(255, 255, 255, 0.1)';
            cardLogo.style.padding = '5px';
            cardLogo.style.backdropFilter = 'blur(5px)';
            cardLogo.style.zIndex = '10';

            showToast('Logo Added', 'Logo uploaded successfully', 'success');
        };
        reader.readAsDataURL(file);
    }

    // Add sample background
    function addSampleBackground() {
        const sampleImages = [
            'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ];

        const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)];
        currentBackgroundImage = randomImage;
        cardBackground.src = currentBackgroundImage;
        cardBackground.style.objectFit = 'cover';
        cardBackground.style.opacity = '0.25';
        cardBackground.style.filter = 'brightness(0.8)';

        if (keepBgToggle.checked) {
            cardBackground.style.display = 'block';
        }

        showToast('Sample Added', 'Sample background image applied', 'success');
    }

    // Save design
    function saveDesign() {
        const designData = {
            ...getCurrentDesignData(),
            hasBackground: !!currentBackgroundImage,
            hasLogo: !!currentLogoImage
        };

        cardDesigns.push(designData);
        localStorage.setItem('cardDesigns', JSON.stringify(cardDesigns));
        showToast('Design Saved', 'Your card design has been saved successfully', 'success');
    }

    // Finalize card
    function finalizeCard() {
        updateProgress(3);
        showToast('Card Finalized', 'Your card is ready for export!', 'success');
        showExportModal();
    }

    function showExportModal() {
        exportModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function hideExportModal() {
        exportModal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function getCurrentDesignData() {
        return {
            id: Date.now(),
            type: currentCardType || 'custom',
            theme: currentTheme,
            title: titleInput.value || 'Your Name',
            subtitle: subtitleInput.value || 'Your Position/Role',
            text: textInput.value || 'Your message goes here. Customize this text to create the perfect card for your occasion.',
            backText: backTextInput.value || 'This is the back of your card. Add additional information, notes, or a personalized message here.',
            contact: contactInput.value,
            footer: footerInput.value,
            color: colorPicker.value,
            font: fontSelect.value,
            layout: cardLayoutSelect.value,
            borderRadius: Number(borderRadiusSlider.value),
            shadow: shadowToggle.checked,
            icon: iconSelect.value,
            iconColor: iconColor.value,
            backgroundImage: currentBackgroundImage,
            logoImage: currentLogoImage,
            keepBackground: keepBgToggle.checked,
            timestamp: new Date().toISOString()
        };
    }

    function downloadTextFile(filename, content, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
    }

    function exportCurrentDesignAsJSON() {
        const designData = getCurrentDesignData();
        downloadTextFile(
            `cardcraft-template-${designData.id}.json`,
            JSON.stringify(designData, null, 2),
            'application/json;charset=utf-8'
        );
        hideExportModal();
        showToast('Template Exported', 'Design JSON downloaded successfully', 'success');
    }

    function exportCurrentDesignAsHTML() {
        const designData = getCurrentDesignData();
        const layoutLabel = designData.layout.charAt(0).toUpperCase() + designData.layout.slice(1);
        const safeTitle = escapeHtml(designData.title);
        const safeSubtitle = escapeHtml(designData.subtitle);
        const safeText = escapeHtml(designData.text);
        const safeBackText = escapeHtml(designData.backText);
        const safeContact = escapeHtml(designData.contact || 'Contact information will appear here').replace(/\n/g, '<br>');
        const safeFooter = escapeHtml(designData.footer || 'Additional footer information can go here').replace(/\n/g, '<br>');
        const iconMarkup = designData.icon ? `<i class="${designData.icon}" style="color:${designData.iconColor};"></i>` : '';
        const logoMarkup = designData.logoImage ? `<img src="${designData.logoImage}" alt="Card logo" class="logo">` : '';
        const backgroundStyle = designData.backgroundImage && designData.keepBackground
            ? `background-image:
                    linear-gradient(rgba(0,0,0,0.22), rgba(0,0,0,0.22)),
                    url('${designData.backgroundImage}');
                background-size: cover;
                background-position: center;`
            : `background: linear-gradient(135deg, ${designData.color}, #111827);`;

        const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${safeTitle} - Card Export</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body {
            margin: 0;
            min-height: 100vh;
            display: grid;
            place-items: center;
            background: #07111f;
            color: white;
            font-family: ${designData.font};
            padding: 24px;
        }
        .card {
            width: min(100%, 720px);
            min-height: 380px;
            border-radius: ${designData.borderRadius}px;
            padding: 32px;
            box-shadow: ${designData.shadow ? '0 24px 50px rgba(0,0,0,0.35)' : 'none'};
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: relative;
            overflow: hidden;
            ${backgroundStyle}
        }
        .card.layout-centered {
            text-align: center;
            align-items: center;
        }
        .card.layout-split .body {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
            align-items: start;
        }
        .card.layout-modern::after {
            content: "";
            position: absolute;
            inset: auto -80px -120px auto;
            width: 240px;
            height: 240px;
            border-radius: 999px;
            background: rgba(255,255,255,0.12);
        }
        .top {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 16px;
            margin-bottom: 24px;
            position: relative;
            z-index: 1;
        }
        .logo {
            max-width: 120px;
            max-height: 60px;
            object-fit: contain;
            border-radius: 8px;
            background: rgba(255,255,255,0.12);
            padding: 6px;
        }
        .icon {
            font-size: 2rem;
        }
        h1, h2, p {
            margin: 0;
            position: relative;
            z-index: 1;
        }
        h1 {
            font-size: clamp(2rem, 4vw, 2.75rem);
        }
        h2 {
            font-size: 1.1rem;
            opacity: 0.88;
            margin-top: 8px;
        }
        .message {
            margin-top: 20px;
            font-size: 1rem;
            line-height: 1.7;
            opacity: 0.95;
        }
        .meta {
            margin-top: 24px;
            padding-top: 18px;
            border-top: 1px solid rgba(255,255,255,0.2);
            opacity: 0.9;
            line-height: 1.8;
        }
        .export-note {
            margin-top: 12px;
            font-size: 0.9rem;
            opacity: 0.7;
        }
        @media (max-width: 640px) {
            .card {
                min-height: auto;
                padding: 24px;
            }
            .card.layout-split .body {
                grid-template-columns: 1fr;
            }
            .top {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <article class="card layout-${designData.layout}">
        <div class="top">
            ${logoMarkup}
            <div class="icon">${iconMarkup}</div>
        </div>
        <div class="body">
            <div>
                <h1>${safeTitle}</h1>
                <h2>${safeSubtitle}</h2>
                <p class="message">${safeText}</p>
            </div>
            <div>
                <p class="message">${safeBackText}</p>
                <div class="meta">
                    <div>${safeContact}</div>
                    <div style="margin-top:12px;">${safeFooter}</div>
                </div>
            </div>
        </div>
        <p class="export-note">Exported from CardCraft Pro • Theme: ${escapeHtml(themes[currentTheme].name)} • Layout: ${layoutLabel}</p>
    </article>
</body>
</html>`;

        downloadTextFile(
            `cardcraft-template-${designData.id}.html`,
            htmlTemplate,
            'text/html;charset=utf-8'
        );
        hideExportModal();
        showToast('HTML Exported', 'Standalone HTML card downloaded successfully', 'success');
    }

    // Download as PNG
    async function downloadAsPNG() {
        showToast('Processing', 'Generating PNG image...', 'info');
        const originalText = downloadPngBtn.innerHTML;
        const wasFlipped = isCardFlipped;

        try {
            if (wasFlipped) {
                cardPreview.classList.remove('flipped');
                isCardFlipped = false;
            }

            downloadPngBtn.innerHTML = '<span class="spinner"></span> Generating...';
            downloadPngBtn.disabled = true;

            const canvas = await html2canvas(cardPreview, {
                scale: 3,
                backgroundColor: null,
                useCORS: true,
                logging: false
            });

            const link = document.createElement('a');
            link.download = `cardcraft-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png', 1.0);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            downloadPngBtn.innerHTML = originalText;
            downloadPngBtn.disabled = false;

            showToast('Download Ready', 'PNG image saved successfully', 'success');
            updateProgress(4);
            setTimeout(() => updateProgress(3), 2000);

        } catch (error) {
            console.error('Error generating PNG:', error);
            showToast('Export Failed', 'Could not generate PNG image', 'error');
        } finally {
            if (wasFlipped) {
                cardPreview.classList.add('flipped');
                isCardFlipped = true;
            }
            downloadPngBtn.innerHTML = originalText;
            downloadPngBtn.disabled = false;
        }
    }

    // Download as PDF
    async function downloadAsPDF() {
        showToast('Processing', 'Generating PDF document...', 'info');
        const originalText = downloadPdfBtn.innerHTML;
        const wasFlipped = isCardFlipped;

        try {
            if (wasFlipped) {
                cardPreview.classList.remove('flipped');
                isCardFlipped = false;
            }

            downloadPdfBtn.innerHTML = '<span class="spinner"></span> Generating...';
            downloadPdfBtn.disabled = true;

            const canvas = await html2canvas(cardPreview, {
                scale: 2,
                useCORS: true,
                backgroundColor: null
            });

            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 190;
            const pageHeight = 297;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            const xOffset = (210 - imgWidth) / 2;
            const yOffset = (pageHeight - imgHeight) / 2;

            pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgWidth, imgHeight);
            pdf.save(`cardcraft-${Date.now()}.pdf`);

            downloadPdfBtn.innerHTML = originalText;
            downloadPdfBtn.disabled = false;

            showToast('Download Ready', 'PDF document saved successfully', 'success');
            updateProgress(4);
            setTimeout(() => updateProgress(3), 2000);

        } catch (error) {
            console.error('Error generating PDF:', error);
            showToast('Export Failed', 'Could not generate PDF', 'error');
        } finally {
            if (wasFlipped) {
                cardPreview.classList.add('flipped');
                isCardFlipped = true;
            }
            downloadPdfBtn.innerHTML = originalText;
            downloadPdfBtn.disabled = false;
        }
    }

    // Share card
    function shareCard() {
        if (navigator.share) {
            navigator.share({
                title: 'Check out my card design!',
                text: `I created a ${currentCardType} card using CardCraft Pro`,
                url: window.location.href,
            }).then(() => {
                showToast('Shared Successfully', 'Your card design has been shared', 'success');
            }).catch(error => {
                showToast('Sharing Failed', 'Could not share the card design', 'error');
            });
        } else {
            navigator.clipboard.writeText(window.location.href).then(() => {
                showToast('Link Copied', 'Card link copied to clipboard', 'success');
            }).catch(() => {
                showToast('Sharing', 'Copy this link to share: ' + window.location.href, 'info');
            });
        }
    }

    // Export all designs
    function exportAllDesigns() {
        if (cardDesigns.length === 0) {
            showToast('No Designs', 'No saved designs to export', 'warning');
            return;
        }

        const exportData = {
            designs: cardDesigns,
            exportDate: new Date().toISOString(),
            app: 'CardCraft Pro'
        };

        const dataStr = JSON.stringify(exportData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        const link = document.createElement('a');
        link.download = `cardcraft-backup-${Date.now()}.json`;
        link.href = dataUri;
        link.click();

        showToast('Backup Complete', 'All designs exported successfully', 'success');
    }

    // Progress navigation
    function goToPreviousStep() {
        if (currentStep > 1) {
            currentStep--;
            updateProgress(currentStep);

            if (currentStep === 1) {
                builderSection.classList.add('hidden');
                cardTypeSection.classList.remove('hidden');
            }
        }
    }

    function goToNextStep() {
        if (currentStep < 4) {
            currentStep++;
            updateProgress(currentStep);

            if (currentStep === 3) {
                finalizeCard();
            }
        }
    }

    // Update progress indicator
    function updateProgress(step) {
        currentStep = step;
        const progressWidths = ['0%', '33%', '66%', '100%'];
        progressBar.style.width = progressWidths[step - 1];

        steps.forEach((stepEl, index) => {
            if (index < step - 1) {
                stepEl.classList.add('completed');
                stepEl.classList.remove('active');
            } else if (index === step - 1) {
                stepEl.classList.add('active');
                stepEl.classList.remove('completed');
            } else {
                stepEl.classList.remove('active', 'completed');
            }
        });

        prevStepBtn.style.display = step > 1 ? 'flex' : 'none';
        nextStepBtn.style.display = step < 4 ? 'flex' : 'none';
        nextStepBtn.textContent = step === 3 ? 'Export' : `Step ${step + 1}`;
    }

    // Handle scroll
    function handleScroll() {
        header.classList.toggle('scrolled', window.scrollY > 50);
    }

    // Show toast notification
    function showToast(title, message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = 'toast';

        let icon = 'fas fa-check-circle';
        let borderColor = 'var(--accent-color)';

        if (type === 'error') {
            icon = 'fas fa-exclamation-circle';
            borderColor = 'var(--danger-color)';
        } else if (type === 'warning') {
            icon = 'fas fa-exclamation-triangle';
            borderColor = 'var(--warning-color)';
        } else if (type === 'info') {
            icon = 'fas fa-info-circle';
            borderColor = 'var(--accent-color)';
        }

        toast.innerHTML = `
                    <i class="${icon} toast-icon"></i>
                    <div class="toast-content">
                        <div class="toast-title">${title}</div>
                        <div class="toast-message">${message}</div>
                    </div>
                    <div class="toast-progress"></div>
                `;

        toast.style.borderLeftColor = borderColor;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.transform = 'translateX(100px)';
            toast.style.opacity = '0';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 300);
        }, 5000);
    }

    // Helper function: Convert hex to RGB
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 0, g: 0, b: 0 };
    }

    // Initialize the application
    init();
});
    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

