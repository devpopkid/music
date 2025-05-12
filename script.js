document.addEventListener('DOMContentLoaded', () => {
    const linkInput = document.getElementById('linkInput');
    const downloadButton = document.getElementById('downloadButton');
    const statusDiv = document.getElementById('status');
    const downloadArea = document.getElementById('downloadArea');
    const downloadLink = document.getElementById('downloadLink');

    downloadButton.addEventListener('click', async () => {
        const videoLink = linkInput.value.trim();

        if (videoLink) {
            statusDiv.textContent = 'Processing link...';
            downloadArea.classList.add('hidden');

            try {
                const response = await fetch('/api/download', { // Your backend endpoint
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ url: videoLink }),
                });

                const data = await response.json();

                if (data.success && data.downloadUrl) {
                    statusDiv.textContent = 'Download ready!';
                    downloadLink.href = data.downloadUrl;
                    downloadArea.classList.remove('hidden');
                } else {
                    statusDiv.textContent = data.error || 'Download failed. Please try again.';
                }

            } catch (error) {
                statusDiv.textContent = 'An error occurred.';
                console.error(error);
            }
        } else {
            statusDiv.textContent = 'Please paste a valid link.';
        }
    });
});
