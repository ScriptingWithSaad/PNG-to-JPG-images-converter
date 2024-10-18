
document.getElementById('convertBtn').addEventListener('click', function () {
    const fileInput = document.getElementById('upload');
    const formatSelectTo = document.getElementById('formatSelectTo');
    const canvas = document.getElementById('canvas');
    const downloadLink = document.getElementById('downloadLink');
    const file = fileInput.files[0];
    const selectedFormatTo = formatSelectTo.value;

    if (file) {
        if (file.type.startsWith('image/')) {
            convertImage(file, selectedFormatTo);
        } else if (file.type === 'application/pdf') {
            alert('PDF conversion is not implemented in this client-side version.');
        } else {
            alert('Please upload a valid image or PDF file.');
        }
    } else {
        alert('Please select a file to convert.');
    }
});

function convertImage(file, selectedFormatTo) {
    const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            if (selectedFormatTo === 'pdf') {
                alert('Converting to PDF is not implemented in this client-side version.');
            } else {
                // Convert the canvas content to the selected output format
                const dataUrl = canvas.toDataURL(`image/${selectedFormatTo}`);
                downloadLink.href = dataUrl;
                downloadLink.download = `converted-image.${selectedFormatTo}`;
                downloadLink.style.display = 'inline-block';
                downloadLink.textContent = `Download ${selectedFormatTo.toUpperCase()}`;
            }
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}
