---
layout: base.html
title: Contact QR - QR Toaster
description: Generate vCard QR codes for contact information. Add name, phone, email, address, and more to share your contact details instantly.
permalink: /contact/
---

<!-- Page header content -->
<template id="header-content">
    <h1 class="text-3xl font-bold text-gray-100 mb-3">Contact QR Code Generator</h1>
    <p class="text-gray-300 text-lg">Create vCard QR codes for instant contact sharing. Recipients can save your information directly to their contacts with a single scan.</p>
</template>

<!-- Page documentation content -->
<template id="documentation-content">
    <h2>How It Works</h2>
    <p>When someone scans your contact QR code, their device will recognize it as a vCard (virtual contact card) and prompt them to save the information to their contacts app. All major smartphones support this format natively—no additional apps required.</p>

    <h2>Format Overview</h2>
    <p>Contact QR codes use the vCard 3.0 format, an internationally recognized standard for electronic business cards. The format structures your contact information like this:</p>

    <pre><code>BEGIN:VCARD
VERSION:3.0
FN:John Doe
TEL:+1-555-123-4567
EMAIL:john.doe@example.com
ORG:Acme Corporation
URL:https://example.com
END:VCARD</code></pre>

    <p>The components are:</p>
    <ul>
        <li><strong>FN:</strong> Full name (required)</li>
        <li><strong>TEL:</strong> Phone number</li>
        <li><strong>EMAIL:</strong> Email address</li>
        <li><strong>ORG:</strong> Organization or company name</li>
        <li><strong>URL:</strong> Website URL</li>
    </ul>

    <h2>Compatibility</h2>
    <p>vCard QR codes work across all major platforms:</p>
    <ul>
        <li><strong>iOS:</strong> Native support via Camera app and Contacts app</li>
        <li><strong>Android:</strong> Native support via camera app, Google Lens, or QR scanner apps</li>
        <li><strong>Desktop:</strong> Can be imported into contact management software like Outlook, Apple Contacts, and Google Contacts</li>
    </ul>

    <h2>Phone Number Formatting</h2>
    <p>For best compatibility, use international format with country code (e.g., <code>+1-555-123-4567</code> for US numbers). This ensures the number works correctly regardless of where it's scanned. However, local formats will also work in most cases.</p>

    <h2>Tips for Best Results</h2>
    <ul>
        <li><strong>Fill in all relevant fields:</strong> The more information you provide, the more useful the contact becomes</li>
        <li><strong>Use professional email and website URLs:</strong> Include the full URL with <code>https://</code></li>
        <li><strong>Keep it concise:</strong> While vCards support many fields (address, birthday, notes, etc.), including only essential information keeps your QR code simpler and easier to scan</li>
        <li><strong>Test before sharing:</strong> Scan your QR code to verify all information appears correctly on the recipient's device</li>
        <li><strong>Update as needed:</strong> If your contact information changes, generate a new QR code with the updated details</li>
    </ul>

    <h2>Use Cases</h2>
    <ul>
        <li>Business cards (print the QR code on the back)</li>
        <li>Event name tags and badges</li>
        <li>Email signatures</li>
        <li>Professional networking events</li>
        <li>Storefront or office displays</li>
    </ul>
</template>

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
    // Inject header and documentation content
    const headerTemplate = document.getElementById('header-content');
    const docTemplate = document.getElementById('documentation-content');
    const headerContainer = document.getElementById('page-header');
    const docContainer = document.getElementById('page-documentation');

    if (headerTemplate && headerContainer) {
        headerContainer.appendChild(headerTemplate.content.cloneNode(true));
    }
    if (docTemplate && docContainer) {
        docContainer.appendChild(docTemplate.content.cloneNode(true));
    }

    // Rest of page functionality
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