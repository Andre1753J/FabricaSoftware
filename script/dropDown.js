const dropDown = document.querySelector('.dropDown');
const lidrop = document.querySelector('.lidrop');
lidrop.addEventListener('mouseover', () => {
    dropDown.style.height = '22vh';
})

lidrop.addEventListener('mouseout', () => {
        dropDown.style.height = '0';
});