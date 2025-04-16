document.addEventListener('DOMContentLoaded', function() {
    // Highlight.js is initialized in HTML

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add hover effect to code blocks
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(block => {
        block.addEventListener('mouseover', () => {
            block.parentElement.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
        
        block.addEventListener('mouseout', () => {
            block.parentElement.style.boxShadow = 'none';
        });
    });
});