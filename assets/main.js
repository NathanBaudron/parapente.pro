document.addEventListener('DOMContentLoaded', () => {
    // Page transition fade out
    document.querySelectorAll('a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = this.getAttribute('href');
            // Only animate for internal relative links that aren't anchors
            if (target && !target.startsWith('#') && !target.startsWith('http') && !target.startsWith('mailto') && this.getAttribute('target') !== '_blank') {
                e.preventDefault();
                document.body.classList.add('fade-out');
                setTimeout(() => {
                    window.location.href = target;
                }, 300); // matches the 0.3s CSS transition
            }
        });
    });
});
