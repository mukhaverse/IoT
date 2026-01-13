document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('submitGuestbook');
    const nameInput = document.getElementById('guestName');
    const messageInput = document.getElementById('guestMessage');
    const entriesContainer = document.getElementById('entriesContainer');

    submitBtn.addEventListener('click', () => {
        const name = nameInput.value.trim();
        const message = messageInput.value.trim();
        
        // Simple timestamp
        const now = new Date();
        const timeString = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

        if (name && message) {
            const noEntries = entriesContainer.querySelector('.no-entries');
            if (noEntries) noEntries.remove();

            // Create Enhanced Entry Card
            const entryDiv = document.createElement('div');
            entryDiv.className = 'guest-entry';
            entryDiv.innerHTML = `
                <div class="entry-header">
                    <span class="entry-name">${name}</span>
                    <span class="entry-time">${timeString}</span>
                </div>
                <p class="entry-message">${message}</p>
            `;

            entriesContainer.prepend(entryDiv);

            // Clear inputs
            nameInput.value = '';
            messageInput.value = '';
        } else {
            alert("Please fill in both fields!");
        }
    });
});