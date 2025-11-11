---
layout: base.html
title: Contact QR - QR Toaster
permalink: /contact/
---

<form id="contact-form" class="space-y-4">
    <h3 class="text-lg font-semibold text-gray-100 mb-4">Contact Information</h3>
    
    <!-- Name -->
    <div>
        <label for="contact-name" class="block text-sm font-medium text-gray-300 mb-2">
            Full Name
        </label>
        <input 
            type="text" 
            id="contact-name" 
            class="w-full rounded-md"
            placeholder="John Doe"
        >
    </div>
    
    <!-- Phone -->
    <div>
        <label for="contact-phone" class="block text-sm font-medium text-gray-300 mb-2">
            Phone Number
        </label>
        <input 
            type="tel" 
            id="contact-phone" 
            class="w-full rounded-md"
            placeholder="+1 (555) 123-4567"
        >
    </div>
    
    <!-- Email -->
    <div>
        <label for="contact-email" class="block text-sm font-medium text-gray-300 mb-2">
            Email Address
        </label>
        <input 
            type="email" 
            id="contact-email" 
            class="w-full rounded-md"
            placeholder="john.doe@example.com"
        >
    </div>
    
    <!-- Organization -->
    <div>
        <label for="contact-org" class="block text-sm font-medium text-gray-300 mb-2">
            Organization
        </label>
        <input 
            type="text" 
            id="contact-org" 
            class="w-full rounded-md"
            placeholder="Acme Corp"
        >
    </div>
    
    <!-- Website -->
    <div>
        <label for="contact-url" class="block text-sm font-medium text-gray-300 mb-2">
            Website
        </label>
        <input 
            type="url" 
            id="contact-url" 
            class="w-full rounded-md"
            placeholder="https://example.com"
        >
    </div>
</form>

<script>
// Page-specific functionality
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const inputs = form.querySelectorAll('input');
    const nameInput = document.getElementById('contact-name');
    const phoneInput = document.getElementById('contact-phone');
    const emailInput = document.getElementById('contact-email');
    const orgInput = document.getElementById('contact-org');
    const urlInput = document.getElementById('contact-url');

    // Create debounced save function
    const debouncedSave = window.QRToaster?.storage.createDebouncedSave('contact');

    // Load saved data
    function loadSavedData() {
        const saved = window.QRToaster?.storage.load('contact');
        if (saved) {
            if (saved.name) nameInput.value = saved.name;
            if (saved.phone) phoneInput.value = saved.phone;
            if (saved.email) emailInput.value = saved.email;
            if (saved.org) orgInput.value = saved.org;
            if (saved.url) urlInput.value = saved.url;
            updateVCard();
        }
    }

    // Save current data
    function saveData() {
        if (debouncedSave) {
            debouncedSave({
                name: nameInput.value,
                phone: phoneInput.value,
                email: emailInput.value,
                org: orgInput.value,
                url: urlInput.value
            });
        }
    }

    function updateVCard() {
        const name = nameInput.value;
        const phone = phoneInput.value;
        const email = emailInput.value;
        const org = orgInput.value;
        const url = urlInput.value;

        // Build vCard string
        let vcard = 'BEGIN:VCARD\nVERSION:3.0\n';
        if (name) vcard += `FN:${name}\n`;
        if (phone) vcard += `TEL:${phone}\n`;
        if (email) vcard += `EMAIL:${email}\n`;
        if (org) vcard += `ORG:${org}\n`;
        if (url) vcard += `URL:${url}\n`;
        vcard += 'END:VCARD';

        // Update QR code
        if (window.QRToaster && (name || phone || email)) {
            window.QRToaster.setContent(vcard);
        }
    }

    // Listen for changes
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            updateVCard();
            saveData();
        });
    });

    // Load saved data first
    loadSavedData();
});
</script>