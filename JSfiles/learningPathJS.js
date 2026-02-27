function toggle(card) {
    const wasOpen = card.classList.contains('open');
    document.querySelectorAll('.pcard.open').forEach(c => c.classList.remove('open'));
    if (!wasOpen) card.classList.add('open');
}