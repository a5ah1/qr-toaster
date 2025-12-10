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
    <p>Contact QR codes use the vCard 3.0 format, an internationally recognized standard for electronic business cards. We use an enhanced format optimized for maximum compatibility with iOS and Android devices:</p>

    <pre><code>BEGIN:VCARD
VERSION:3.0
N:Doe;John;;;
FN:John Doe
NICKNAME:John Doe
ORG:Acme Corporation
TITLE:Software Engineer
TEL;TYPE=CELL:+1-555-123-4567
EMAIL;TYPE=WORK:john.doe@example.com
URL:https://example.com
ADR;TYPE=WORK:;;123 Main St;New York;NY;10001;USA
BDAY:1990-01-15
END:VCARD</code></pre>

    <p>The components are:</p>
    <ul>
        <li><strong>N:</strong> Structured name (LastName;FirstName) - ensures phones display the correct name</li>
        <li><strong>FN:</strong> Full formatted name</li>
        <li><strong>NICKNAME:</strong> Display name fallback for some devices</li>
        <li><strong>ORG:</strong> Organization or company name</li>
        <li><strong>TITLE:</strong> Job title or position</li>
        <li><strong>TEL;TYPE=CELL:</strong> Mobile phone number</li>
        <li><strong>EMAIL;TYPE=WORK:</strong> Work email address</li>
        <li><strong>URL:</strong> Website URL</li>
        <li><strong>ADR;TYPE=WORK:</strong> Physical address (street, city, state, postal code, country)</li>
        <li><strong>BDAY:</strong> Birthday in YYYY-MM-DD format</li>
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
    <div class="grid grid-cols-2 gap-4">
        <div>
            <label for="contact-firstname" class="block text-sm font-medium text-gray-300 mb-2">
                First Name
            </label>
            <input
                type="text"
                id="contact-firstname"
                class="w-full rounded-md"
                placeholder="John"
            >
        </div>
        <div>
            <label for="contact-lastname" class="block text-sm font-medium text-gray-300 mb-2">
                Last Name
            </label>
            <input
                type="text"
                id="contact-lastname"
                class="w-full rounded-md"
                placeholder="Doe"
            >
        </div>
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

    <!-- Additional Details (collapsible) -->
    <details class="border border-gray-600 rounded-lg">
        <summary class="px-4 py-3 cursor-pointer text-sm font-medium text-gray-300 hover:bg-gray-700 rounded-lg">
            Additional Details
        </summary>
        <div class="p-4 pt-2 space-y-4 border-t border-gray-600">
            <!-- Job Title -->
            <div>
                <label for="contact-title" class="block text-sm font-medium text-gray-300 mb-2">
                    Job Title
                </label>
                <input
                    type="text"
                    id="contact-title"
                    class="w-full rounded-md"
                    placeholder="Software Engineer"
                >
            </div>

            <!-- Address -->
            <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">
                    Address
                </label>
                <div class="space-y-3">
                    <input
                        type="text"
                        id="contact-street"
                        class="w-full rounded-md"
                        placeholder="Street Address"
                    >
                    <div class="grid grid-cols-2 gap-3">
                        <input
                            type="text"
                            id="contact-city"
                            class="w-full rounded-md"
                            placeholder="City"
                        >
                        <input
                            type="text"
                            id="contact-state"
                            class="w-full rounded-md"
                            placeholder="State/Region"
                        >
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <input
                            type="text"
                            id="contact-postal"
                            class="w-full rounded-md"
                            placeholder="Postal Code"
                        >
                        <input
                            type="text"
                            id="contact-country"
                            class="w-full rounded-md"
                            placeholder="Country"
                        >
                    </div>
                </div>
            </div>

            <!-- Birthday -->
            <div>
                <label for="contact-birthday" class="block text-sm font-medium text-gray-300 mb-2">
                    Birthday
                </label>
                <input
                    type="date"
                    id="contact-birthday"
                    class="w-full rounded-md"
                >
            </div>

        </div>
    </details>
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
    const inputs = form.querySelectorAll('input, textarea');
    const firstNameInput = document.getElementById('contact-firstname');
    const lastNameInput = document.getElementById('contact-lastname');
    const phoneInput = document.getElementById('contact-phone');
    const emailInput = document.getElementById('contact-email');
    const orgInput = document.getElementById('contact-org');
    const urlInput = document.getElementById('contact-url');
    // Additional details fields
    const titleInput = document.getElementById('contact-title');
    const streetInput = document.getElementById('contact-street');
    const cityInput = document.getElementById('contact-city');
    const stateInput = document.getElementById('contact-state');
    const postalInput = document.getElementById('contact-postal');
    const countryInput = document.getElementById('contact-country');
    const birthdayInput = document.getElementById('contact-birthday');

    // Create debounced save function
    const debouncedSave = window.QRToaster?.storage.createDebouncedSave('contact');

    // Load saved data
    function loadSavedData() {
        const saved = window.QRToaster?.storage.load('contact');
        if (saved) {
            // Support legacy 'name' field by splitting into first/last
            if (saved.name && !saved.firstName && !saved.lastName) {
                const parts = saved.name.trim().split(/\s+/);
                if (parts.length >= 2) {
                    firstNameInput.value = parts.slice(0, -1).join(' ');
                    lastNameInput.value = parts[parts.length - 1];
                } else {
                    firstNameInput.value = saved.name;
                }
            } else {
                if (saved.firstName) firstNameInput.value = saved.firstName;
                if (saved.lastName) lastNameInput.value = saved.lastName;
            }
            if (saved.phone) phoneInput.value = saved.phone;
            if (saved.email) emailInput.value = saved.email;
            if (saved.org) orgInput.value = saved.org;
            if (saved.url) urlInput.value = saved.url;
            // Additional details
            if (saved.title) titleInput.value = saved.title;
            if (saved.street) streetInput.value = saved.street;
            if (saved.city) cityInput.value = saved.city;
            if (saved.state) stateInput.value = saved.state;
            if (saved.postal) postalInput.value = saved.postal;
            if (saved.country) countryInput.value = saved.country;
            if (saved.birthday) birthdayInput.value = saved.birthday;
            updateVCard();
        }
    }

    // Save current data
    function saveData() {
        if (debouncedSave) {
            debouncedSave({
                firstName: firstNameInput.value,
                lastName: lastNameInput.value,
                phone: phoneInput.value,
                email: emailInput.value,
                org: orgInput.value,
                url: urlInput.value,
                // Additional details
                title: titleInput.value,
                street: streetInput.value,
                city: cityInput.value,
                state: stateInput.value,
                postal: postalInput.value,
                country: countryInput.value,
                birthday: birthdayInput.value
            });
        }
    }

    // Escape special characters for vCard (commas, semicolons, backslashes, newlines)
    function escapeVCard(str) {
        if (!str) return '';
        return str
            .replace(/\\/g, '\\\\')
            .replace(/;/g, '\\;')
            .replace(/,/g, '\\,')
            .replace(/\n/g, '\\n');
    }

    function updateVCard() {
        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const phone = phoneInput.value.trim();
        const email = emailInput.value.trim();
        const org = orgInput.value.trim();
        const url = urlInput.value.trim();
        // Additional details
        const title = titleInput.value.trim();
        const street = streetInput.value.trim();
        const city = cityInput.value.trim();
        const state = stateInput.value.trim();
        const postal = postalInput.value.trim();
        const country = countryInput.value.trim();
        const birthday = birthdayInput.value.trim();

        // Build full name from parts
        const fullName = [firstName, lastName].filter(Boolean).join(' ');

        // Build vCard string with improved compatibility
        // N and NICKNAME fields ensure proper display on iOS/Android
        let vcard = 'BEGIN:VCARD\nVERSION:3.0\n';

        // N (structured name) - critical for phone compatibility
        // Format: N:LastName;FirstName;MiddleName;Prefix;Suffix
        if (firstName || lastName) {
            vcard += `N:${escapeVCard(lastName)};${escapeVCard(firstName)};;;\n`;
        }

        // FN (formatted name) - required by vCard spec
        if (fullName) vcard += `FN:${escapeVCard(fullName)}\n`;

        // NICKNAME - fallback display name for some devices
        if (fullName) vcard += `NICKNAME:${escapeVCard(fullName)}\n`;

        // Organization
        if (org) vcard += `ORG:${escapeVCard(org)}\n`;

        // Job title
        if (title) vcard += `TITLE:${escapeVCard(title)}\n`;

        // Phone with TYPE for better categorization
        if (phone) vcard += `TEL;TYPE=CELL:${phone}\n`;

        // Email with TYPE for better categorization
        if (email) vcard += `EMAIL;TYPE=WORK:${email}\n`;

        // Website
        if (url) vcard += `URL:${url}\n`;

        // Address - format: ADR;TYPE=WORK:;;Street;City;State;PostalCode;Country
        if (street || city || state || postal || country) {
            vcard += `ADR;TYPE=WORK:;;${escapeVCard(street)};${escapeVCard(city)};${escapeVCard(state)};${escapeVCard(postal)};${escapeVCard(country)}\n`;
        }

        // Birthday - format: BDAY:YYYY-MM-DD
        if (birthday) vcard += `BDAY:${birthday}\n`;

        vcard += 'END:VCARD';

        // Update QR code
        if (window.QRToaster && (firstName || lastName || phone || email)) {
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