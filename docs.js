document.addEventListener('DOMContentLoaded', function () {
    // Sidebar toggle functionality for categories
    const toggles = document.querySelectorAll('.category-toggle');
    toggles.forEach(toggle => {
        toggle.addEventListener('click', function () {
            const siblingList = this.nextElementSibling;
            if (siblingList) {
                siblingList.style.display = siblingList.style.display === 'block' ? 'none' : 'block';
            }
        });
    });

    // Fade-in animation when scrolling
    const sections = document.querySelectorAll('.doc-card');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        {
            threshold: 0.1, // Trigger when 10% of the element is visible
        }
    );

    sections.forEach((section) => {
        observer.observe(section);
    });
});
