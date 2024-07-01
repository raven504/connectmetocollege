document.addEventListener('DOMContentLoaded', function() {
    const acceptanceList = document.getElementById('acceptance-list');
    const acceptanceListContainer = document.getElementById('acceptance-list-container');
    let isMouseDown = false;
    let startX;
    let scrollLeft;

    // Function to pause the animation
    function pauseAnimation() {
        acceptanceList.style.animationPlayState = 'paused';
    }

    // Function to resume the animation
    function resumeAnimation() {
        acceptanceList.style.animationPlayState = 'running';
    }

    // Mouse down event to start dragging
    acceptanceListContainer.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        acceptanceListContainer.style.cursor = 'grabbing'; // Change cursor to grabbing
        pauseAnimation(); // Pause auto-scrolling
        startX = e.pageX - acceptanceListContainer.offsetLeft;
        scrollLeft = acceptanceListContainer.scrollLeft;
    });

    // Mouse leave event to stop dragging
    acceptanceListContainer.addEventListener('mouseleave', () => {
        if (!isMouseDown) return;
        isMouseDown = false;
        acceptanceListContainer.style.cursor = 'grab'; // Change cursor back to grab
        resumeAnimation(); // Resume auto-scrolling
    });

    // Mouse up event to stop dragging
    acceptanceListContainer.addEventListener('mouseup', () => {
        if (!isMouseDown) return;
        isMouseDown = false;
        acceptanceListContainer.style.cursor = 'grab'; // Change cursor back to grab
        resumeAnimation(); // Resume auto-scrolling
    });

    // Mouse move event to drag the content
    acceptanceListContainer.addEventListener('mousemove', (e) => {
        if (!isMouseDown) return;
        e.preventDefault();
        const x = e.pageX - acceptanceListContainer.offsetLeft;
        const walk = (x - startX) * 2; // Adjust the scroll speed (slower drag)
        acceptanceListContainer.scrollLeft = scrollLeft - walk;
    });
    
    // Handle form submission
    const contactForm = document.getElementById('contact-form');
    const formResponse = document.getElementById('form-response');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(contactForm);

        fetch('https://formspree.io/f/{your_form_id}', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                contactForm.reset();
                formResponse.style.display = 'block';
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        alert(data["errors"].map(error => error["message"]).join(", "));
                    } else {
                        alert("Oops! There was a problem submitting your form");
                    }
                });
            }
        }).catch(error => {
            alert("Oops! There was a problem submitting your form");
        });
    });
});
