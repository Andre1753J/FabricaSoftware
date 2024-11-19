const dropDown = document.querySelector('.dropDown');
const lidrop = document.querySelector('.lidrop');
lidrop.addEventListener('mouseover', () => {
    dropDown.style.height = '10vh';
})

lidrop.addEventListener('mouseout', () => {
    setTimeout(() => {

        dropDown.style.height = '0';
    },2000)
});