---
layout: base.html
title: Event QR - QR Toaster
permalink: /event/
---

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
                required
            >
        </div>
        
        <div>
            <label for="event-end" class="block text-sm font-medium text-gray-300 mb-2">
                End Date & Time
            </label>
            <input 
                type="datetime-local" 
                id="event-end" 
                class="w-full rounded-md"
            >
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