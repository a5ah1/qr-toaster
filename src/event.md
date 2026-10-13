---
layout: base.html
title: Event QR - QR Toaster
description: Create iCalendar QR codes for events. Share event details including title, date, time, location, and description with a scannable QR code.
permalink: /event/
---

<!-- Page header content -->
<template id="header-content">
    <h1>Calendar Event QR Code Generator</h1>
    <p>Create calendar event QR codes that let people add your event to their calendar with a single scan—no manual entry required.</p>
</template>

<!-- Page documentation content -->
<template id="documentation-content">
    <h2>How It Works</h2>
    <p>When someone scans your event QR code, their device recognizes it as a calendar event and offers to add it to their calendar app. This works seamlessly with Google Calendar, Apple Calendar, Outlook, and most other calendar applications.</p>

    <h2>Format Overview</h2>
    <p>Event QR codes use the iCalendar format (RFC 5545), a widely-adopted standard for exchanging calendar and scheduling information. The structure looks like this:</p>

    <pre><code>BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//QR Toaster//Event QR//EN
BEGIN:VEVENT
UID:3f9c2a71b04e5d68@qr-toaster
DTSTAMP:20250301T120000Z
SUMMARY:Team Meeting
DTSTART:20250311T140000Z
DTEND:20250311T150000Z
LOCATION:Conference Room A
DESCRIPTION:Monthly team sync meeting
END:VEVENT
END:VCALENDAR</code></pre>

    <p>Key components:</p>
    <ul>
        <li><strong>UID / DTSTAMP:</strong> A unique ID and creation timestamp, required by the standard so calendars can recognise the event</li>
        <li><strong>SUMMARY:</strong> Event title/name</li>
        <li><strong>DTSTART:</strong> Start date and time in ISO 8601 format (UTC timezone)</li>
        <li><strong>DTEND:</strong> End date and time (optional but recommended)</li>
        <li><strong>LOCATION:</strong> Where the event takes place</li>
        <li><strong>DESCRIPTION:</strong> Additional details about the event</li>
    </ul>

    <h3>Date and Time Format</h3>
    <p>Times are stored in UTC timezone using the format <code>YYYYMMDDTHHMMSSZ</code>. For all-day events, the format changes to <code>YYYYMMDD</code> with the <code>VALUE=DATE</code> parameter, and the end date is exclusive (an event that runs through the 17th ends on the 18th). The generator handles these conversions automatically based on your local timezone.</p>

    <h3>Special Characters</h3>
    <p>Commas, semicolons, backslashes, and line breaks in the title, location, and description are escaped automatically so they arrive intact.</p>

    <h2>Compatibility</h2>
    <ul>
        <li><strong>iOS:</strong> Works with native Calendar app via QR scanner</li>
        <li><strong>Android:</strong> Compatible with Google Calendar and most calendar apps</li>
        <li><strong>Desktop:</strong> Can be imported into Outlook, Apple Calendar, Google Calendar, and other desktop calendar software</li>
        <li><strong>Cross-platform:</strong> iCalendar is an open standard supported by virtually all modern calendar applications</li>
    </ul>

    <h2>Tips for Best Results</h2>
    <ul>
        <li><strong>Include end time:</strong> While optional, specifying an end time helps attendees block the correct amount of time</li>
        <li><strong>Be specific with location:</strong> Include full addresses for physical events, or meeting links for virtual events</li>
        <li><strong>Keep descriptions concise:</strong> Long descriptions create larger, more complex QR codes. Include only essential information</li>
        <li><strong>Test timezone handling:</strong> Verify that the event appears at the correct time when scanned in different timezones</li>
        <li><strong>All-day events:</strong> Use the all-day checkbox for events that don't have specific times (conferences, holidays, etc.)</li>
    </ul>

    <h2>Use Cases</h2>
    <ul>
        <li>Conference and workshop schedules</li>
        <li>Meetup and networking event invitations</li>
        <li>Webinar registration confirmations</li>
        <li>Party and social gathering invites</li>
        <li>Appointment reminders</li>
        <li>Public event flyers and posters</li>
    </ul>

    <h2>Size Considerations</h2>
    <p>Be mindful that longer descriptions and detailed location information increase the complexity of your QR code. If you have extensive event details, consider keeping the QR code simple and providing a URL in the description that links to a full event page.</p>
</template>

<form id="event-form" class="qrt-stack">
    <h2 class="qrt-section-title">Event details</h2>

    <div class="qrt-field">
        <label for="event-title" class="qrt-label">
            <span>Event title<span class="qrt-label__required"> *</span></span>
        </label>
        <input type="text" id="event-title" class="qrt-input" placeholder="Team Meeting" required>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3);">
        <div class="qrt-field">
            <label for="event-start" class="qrt-label">
                <span>Start date &amp; time<span class="qrt-label__required"> *</span></span>
            </label>
            <input type="datetime-local" id="event-start" class="qrt-input" required>
        </div>
        <div class="qrt-field">
            <label for="event-end" class="qrt-label">End date &amp; time</label>
            <input type="datetime-local" id="event-end" class="qrt-input">
            <p id="event-end-error" class="qrt-help qrt-help--error" hidden>End must be after the start. It's left out until fixed.</p>
        </div>
    </div>

    <div class="qrt-field">
        <label for="event-location" class="qrt-label">Location</label>
        <input type="text" id="event-location" class="qrt-input" placeholder="Conference Room A, 123 Main St">
    </div>

    <div class="qrt-field">
        <label for="event-description" class="qrt-label">Description</label>
        <textarea id="event-description" class="qrt-textarea" rows="3" placeholder="Meeting agenda and details..."></textarea>
    </div>

    <label class="qrt-check">
        <input type="checkbox" id="event-allday">
        <span class="qrt-check__label">All-day event</span>
    </label>
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
    const form = document.getElementById('event-form');
    const inputs = form.querySelectorAll('input, textarea');
    const titleInput = document.getElementById('event-title');
    const startInput = document.getElementById('event-start');
    const endInput = document.getElementById('event-end');
    const locationInput = document.getElementById('event-location');
    const descriptionInput = document.getElementById('event-description');
    const allDayCheckbox = document.getElementById('event-allday');
    const endError = document.getElementById('event-end-error');

    // UID and DTSTAMP are required by RFC 5545. They're generated once per
    // visit so the code doesn't change while you type.
    const uid = Array.from(crypto.getRandomValues(new Uint8Array(8)), b => b.toString(16).padStart(2, '0')).join('') + '@qr-toaster';
    const dtstamp = formatDateTime(new Date());

    // Create debounced save function
    const debouncedSave = window.QRToaster?.storage.createDebouncedSave('event');

    // Load saved data
    function loadSavedData() {
        const saved = window.QRToaster?.storage.load('event');
        if (saved) {
            // Set the input types first: a date input discards a date-time
            // value (and vice versa), which used to lose saved all-day dates.
            if (saved.allDay !== undefined) allDayCheckbox.checked = saved.allDay;
            setTimeInputTypes(allDayCheckbox.checked);
            if (saved.title) titleInput.value = saved.title;
            if (saved.start) startInput.value = saved.start;
            if (saved.end) endInput.value = saved.end;
            if (saved.location) locationInput.value = saved.location;
            if (saved.description) descriptionInput.value = saved.description;
            updateEvent();
        }
    }

    // Save current data
    function saveData() {
        if (debouncedSave) {
            debouncedSave({
                title: titleInput.value,
                start: startInput.value,
                end: endInput.value,
                location: locationInput.value,
                description: descriptionInput.value,
                allDay: allDayCheckbox.checked
            });
        }
    }

    // Date to iCalendar UTC date-time (YYYYMMDDTHHMMSSZ)
    function formatDateTime(date) {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    }

    // "2026-03-15" to iCalendar date (YYYYMMDD), optionally shifted by days
    function formatDate(value, addDays = 0) {
        const date = new Date(value.slice(0, 10) + 'T00:00:00Z');
        date.setUTCDate(date.getUTCDate() + addDays);
        return date.toISOString().slice(0, 10).replace(/-/g, '');
    }

    // Escape TEXT values per RFC 5545 §3.3.11
    function escapeText(value) {
        return value
            .replace(/\\/g, '\\\\')  // Backslash must be first
            .replace(/;/g, '\\;')
            .replace(/,/g, '\\,')
            .replace(/\r\n|\r|\n/g, '\\n');
    }

    function updateEvent() {
        const title = titleInput.value.trim();
        const startTime = startInput.value;
        const endTime = endInput.value;
        const location = locationInput.value.trim();
        const description = descriptionInput.value.trim();
        const allDay = allDayCheckbox.checked;

        if (!title || !startTime) {
            endError.hidden = true;
            if (window.QRToaster) {
                window.QRToaster.setContent('');
            }
            return;
        }

        // Both values share one ISO-style format, so string order is time order.
        // An all-day event may end on its start day; a timed one must end later.
        const hasValidEnd = Boolean(endTime) && (allDay ? endTime >= startTime : endTime > startTime);
        endError.hidden = !endTime || hasValidEnd;

        const lines = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//QR Toaster//Event QR//EN',
            'BEGIN:VEVENT',
            `UID:${uid}`,
            `DTSTAMP:${dtstamp}`,
            `SUMMARY:${escapeText(title)}`
        ];

        if (allDay) {
            lines.push(`DTSTART;VALUE=DATE:${formatDate(startTime)}`);
            if (hasValidEnd) {
                // DTEND is exclusive, so the event runs through the chosen end date
                lines.push(`DTEND;VALUE=DATE:${formatDate(endTime, 1)}`);
            }
        } else {
            lines.push(`DTSTART:${formatDateTime(new Date(startTime))}`);
            if (hasValidEnd) {
                lines.push(`DTEND:${formatDateTime(new Date(endTime))}`);
            }
        }

        if (location) {
            lines.push(`LOCATION:${escapeText(location)}`);
        }
        if (description) {
            lines.push(`DESCRIPTION:${escapeText(description)}`);
        }

        lines.push('END:VEVENT', 'END:VCALENDAR');

        // Update QR code (iCalendar lines end with CRLF)
        if (window.QRToaster) {
            window.QRToaster.setContent(lines.join('\r\n'));
        }
    }

    // Switch between date and datetime-local inputs, carrying the date across
    // (the browser would otherwise clear a value that doesn't fit the new type)
    function setTimeInputTypes(allDay) {
        const type = allDay ? 'date' : 'datetime-local';
        for (const input of [startInput, endInput]) {
            if (input.type === type) continue;
            const value = input.value;
            if (allDay && value.length > 10) {
                input.dataset.time = value.slice(11, 16);
            }
            input.type = type;
            if (value) {
                input.value = allDay ? value.slice(0, 10) : `${value.slice(0, 10)}T${input.dataset.time || '09:00'}`;
            }
        }
    }

    function toggleTimeFields() {
        setTimeInputTypes(allDayCheckbox.checked);
        updateEvent();
    }

    // Event listeners
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            updateEvent();
            saveData();
        });
    });

    allDayCheckbox.addEventListener('change', () => {
        toggleTimeFields();
        saveData();
    });

    // Load saved data first
    loadSavedData();
});
</script>