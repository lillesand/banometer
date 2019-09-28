let isDown, startY, scrollTop;

const dragscroll = (el) => {
    el.style['user-select'] = 'none';
    el.style['-moz-user-select'] = 'none';
    el.style['-webkit-user-select'] = 'none';
    el.style['-ms-user-select'] = 'none';
    
    el.addEventListener('mousedown', (e) => {
        isDown = true;
        startY = e.pageY - el.offsetTop;
        scrollTop = el.scrollTop;
    });

    el.addEventListener('mousemove', (e) => {
        if(!isDown) return;
        e.preventDefault();

        const endY = e.pageY - el.offsetTop;
        const scrollDistance = (startY - endY) * 1.4;
        const newPosition = scrollTop + scrollDistance;

        el.scrollTo({ top: newPosition, behavior: 'smooth' });
    });

    el.addEventListener('mouseleave', () => {
        isDown = false;
    });

    el.addEventListener('mouseup', () => {
        isDown = false;
    });

};
