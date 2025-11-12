---
layout: base.html
title: Event QR - QR Toaster
description: Create iCalendar QR codes for events. Share event details including title, date, time, location, and description with a scannable QR code.
permalink: /event/
---

<!-- Page header content -->
<template id="header-content">
    <h1 class="text-3xl font-bold text-gray-100 mb-3">Calendar Event QR Code Generator</h1>
    <p class="text-gray-300 text-lg">Create calendar event QR codes that let people add your event to their calendar with a single scan—no manual entry required.</p>
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
SUMMARY:Team Meeting
DTSTART:20250311T140000Z
DTEND:20250311T150000Z
LOCATION:Conference Room A
DESCRIPTION:Monthly team sync meeting
END:VEVENT
END:VCALENDAR</code></pre>

    <p>Key components:</p>
    <ul>
        <li><strong>SUMMARY:</strong> Event title/name</li>
        <li><strong>DTSTART:</strong> Start date and time in ISO 8601 format (UTC timezone)</li>
        <li><strong>DTEND:</strong> End date and time (optional but recommended)</li>
        <li><strong>LOCATION:</strong> Where the event takes place</li>
        <li><strong>DESCRIPTION:</strong> Additional details about the event</li>
    </ul>

    <h3>Date and Time Format</h3>
    <p>Times are stored in UTC timezone using the format <code>YYYYMMDDTHHMMSSZ</code>. For all-day events, the format changes to <code>YYYYMMDD</code> with the <code>VALUE=DATE</code> parameter. The generator handles these conversions automatically based on your local timezone.</p>

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

<form id="event-form" class="space-y-4">
    <h3 class="text-lg font-semibold text-gray-100 mb-4">Event Details</h3>
    
    <!-- Event Title -->
    <div>
        <label for="event-title" class="block text-sm font-medium text-gray-300 mb-2">
            Event Title *
        </label>
        <input 
            type="text" 
            id="event-title" 
            class="w-full rounded-md"
            placeholder="Team Meeting"
            required
        >
    </div>
    
    <!-- Start Date & Time -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label for="event-start" class="block text-sm font-medium text-gray-300 mb-2">
                Start Date & Time *
            </label>
            <input
                type="datetime-local"
                id="event-start"
                class="w-full rounded-md"
                required>
        </div>
        <div>
            <label for="event-end" class="block text-sm font-medium text-gray-300 mb-2">
                End Date & Time
            </label>
            <input
                type="datetime-local"
                id="event-end"
                class="w-full rounded-md">
        </div>
    </div>
    
    <!-- Location -->
    <div>
        <label for="event-location" class="block text-sm font-medium text-gray-300 mb-2">
            Location
        </label>
        <input 
            type="text" 
            id="event-location" 
            class="w-full rounded-md"
            placeholder="Conference Room A, 123 Main St"
        >
    </div>
    
    <!-- Description -->
    <div>
        <label for="event-description" class="block text-sm font-medium text-gray-300 mb-2">
            Description
        </label>
        <textarea 
            id="event-description" 
            rows="3"
            class="w-full rounded-md"
            placeholder="Meeting agenda and details..."
        ></textarea>
    </div>
    
    <!-- All Day Event -->
    <div class="flex items-center">
        <input 
            type="checkbox" 
            id="event-allday" 
            class="rounded"
        >
        <label for="event-allday" class="ml-2 text-sm text-gray-300">
            All-day event
        </label>
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
    const form = document.getElementById('event-form');
    const inputs = form.querySelectorAll('input, textarea');
    const titleInput = document.getElementById('event-title');
    const startInput = document.getElementById('event-start');
    const endInput = document.getElementById('event-end');
    const locationInput = document.getElementById('event-location');
    const descriptionInput = document.getElementById('event-description');
    const allDayCheckbox = document.getElementById('event-allday');

    // Create debounced save function
    const debouncedSave = window.QRToaster?.storage.createDebouncedSave('event');

    // Load saved data
    function loadSavedData() {
        const saved = window.QRToaster?.storage.load('event');
        if (saved) {
            if (saved.title) titleInput.value = saved.title;
            if (saved.start) startInput.value = saved.start;
            if (saved.end) endInput.value = saved.end;
            if (saved.location) locationInput.value = saved.location;
            if (saved.description) descriptionInput.value = saved.description;
            if (saved.allDay !== undefined) allDayCheckbox.checked = saved.allDay;
            // Update input types based on saved allDay state
            if (saved.allDay) {
                startInput.type = 'date';
                endInput.type = 'date';
            }
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

    function formatDateTime(dateTimeString) {
        // Convert HTML datetime-local format to iCalendar format
        const date = new Date(dateTimeString);
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    }

    function updateEvent() {
        const title = titleInput.value;
        const startTime = startInput.value;
        const endTime = endInput.value;
        const location = locationInput.value;
        const description = descriptionInput.value;
        const allDay = allDayCheckbox.checked;

        if (!title || !startTime) {
            if (window.QRToaster) {
                window.QRToaster.setContent('');
            }
            return;
        }

        // Build iCalendar string
        let icalString = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//QR Toaster//Event QR//EN\n';
        icalString += 'BEGIN:VEVENT\n';
        icalString += `SUMMARY:${title}\n`;

        if (allDay) {
            // All-day events use date format (YYYYMMDD)
            const startDate = new Date(startTime).toISOString().substr(0, 10).replace(/-/g, '');
            icalString += `DTSTART;VALUE=DATE:${startDate}\n`;
            if (endTime) {
                const endDate = new Date(endTime).toISOString().substr(0, 10).replace(/-/g, '');
                icalString += `DTEND;VALUE=DATE:${endDate}\n`;
            }
        } else {
            icalString += `DTSTART:${formatDateTime(startTime)}\n`;
            if (endTime) {
                icalString += `DTEND:${formatDateTime(endTime)}\n`;
            }
        }

        if (location) {
            icalString += `LOCATION:${location}\n`;
        }
        if (description) {
            icalString += `DESCRIPTION:${description}\n`;
        }

        icalString += 'END:VEVENT\nEND:VCALENDAR';

        // Update QR code
        if (window.QRToaster) {
            window.QRToaster.setContent(icalString);
        }
    }

    function toggleTimeFields() {
        const allDay = allDayCheckbox.checked;

        if (allDay) {
            // Change to date inputs
            startInput.type = 'date';
            endInput.type = 'date';
        } else {
            // Change to datetime-local inputs
            startInput.type = 'datetime-local';
            endInput.type = 'datetime-local';
        }
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