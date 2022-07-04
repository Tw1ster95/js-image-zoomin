(() => {
    const zoomElements = document.querySelectorAll('[data-img-zoom]');
    if(!zoomElements.length) return false;

    const fixedEl = document.createElement('div');
    fixedEl.classList.add('fixed-img-zoom');
    fixedEl.id = 'fixedImgZoomElement';
    const fixedElImage = document.createElement('img');
    fixedElImage.alt = 'zoomin-img';
    fixedEl.append(fixedElImage);
    document.body.append(fixedEl);

    const onPointerEnter = (e) => {
        const img = e.currentTarget.querySelector('img');
        if(!img) return;
        const rect = e.currentTarget.getBoundingClientRect();
        fixedEl.classList.add('active');
        fixedEl.style.left = `${rect.left - 100}px`;
        fixedEl.style.width = `${rect.width + 200}px`;
        fixedEl.style.height = `${rect.height + 200}px`;
        fixedElImage.src = img.src;
        fixedElImage.style.setProperty(`--percent`, 200);
    }
    const onPointerLeave = (e) => {
        if(fixedEl.classList.contains('active')) fixedEl.classList.remove('active');
    }
    const onFixedElRightClick = (e) => {
        const percent = parseInt(fixedElImage.style.getPropertyValue('--percent')) || 100;
        if(percent > 150) {
            fixedElImage.style.setProperty(`--percent`, percent-50);
            const elRect = fixedEl.getBoundingClientRect();
            const imgRect = fixedElImage.getBoundingClientRect();
            fixedElImage.style.left = `-${(imgRect.width * ((e.pageX - elRect.x) / elRect.width)) - elRect.width}px`;
            fixedElImage.style.top = `-${(imgRect.height * ((e.pageY - elRect.y) / elRect.height)) - elRect.height}px`;
        }
        return false;
    }
    const onFixedElClick = (e) => {
        const percent = parseInt(fixedElImage.style.getPropertyValue('--percent')) || 100;
        if(percent < 500) {
            fixedElImage.style.setProperty(`--percent`, percent+50);
            const elRect = fixedEl.getBoundingClientRect();
            const imgRect = fixedElImage.getBoundingClientRect();
            fixedElImage.style.left = `-${(imgRect.width * ((e.pageX - elRect.x) / elRect.width)) - elRect.width}px`;
            fixedElImage.style.top = `-${(imgRect.height * ((e.pageY - elRect.y) / elRect.height)) - elRect.height}px`;
        }
        e.preventDefault();
    }
    const onPointerMove = (e) => {
        const elRect = fixedEl.getBoundingClientRect();
        const imgRect = fixedElImage.getBoundingClientRect();
        fixedElImage.style.left = `-${(imgRect.width * ((e.pageX - elRect.x) / elRect.width)) - elRect.width}px`;
        fixedElImage.style.top = `-${(imgRect.height * ((e.pageY - elRect.y) / elRect.height)) - elRect.height}px`;
    }

    for(let i = 0; i < zoomElements.length; i++) {
        zoomElements[i].addEventListener('pointerenter', onPointerEnter);
    }
    fixedEl.addEventListener('pointerleave', onPointerLeave);
    fixedEl.addEventListener('pointermove', onPointerMove);
    fixedEl.addEventListener('click', onFixedElClick);
    fixedEl.oncontextmenu = onFixedElRightClick;
})();