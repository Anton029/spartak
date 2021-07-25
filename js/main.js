//adaptive fix
let windowHeight = window.innerHeight;
adaptiveFix = $('.content_1_wrapper, .content_2_wrapper')
adaptiveFix.css('height', `${windowHeight}`);
//

const category_buttons = $('.categoriy_title')
const applyButton = document.getElementById('application_button_wrapper')

category_buttons.click(function () {
    category_buttons.removeClass('selected')
    let category = Number(parseInt(this.dataset.category));
    $(`.categoriy_title[data-category=${category}]`).addClass('selected')
})

let content_2 = document.getElementById('content_2')

applyButton.addEventListener('click', function(){
    let sliderPosition = content_2.offsetTop;
    window.scrollTo({
        left: 0,
        top: sliderPosition,
        behavior: 'smooth'
    });
})


// const applButton = document.getElementById('application_button');
// const slider = document.getElementById('sliderPositiotn');
// const categoryButtons = $('.category');
// let adv;
// const advantages = $('.advantage');
// let categoryButtonsData = $('[data-category]');
// const advantagesData = document.querySelectorAll('[data-advantage]');
// let category_selected = Number(4);
// const typeRentButtons = $('.rent_type_text');
// const track = document.getElementById('slide_tracker');
// const previousSlide = document.getElementById('back_arrow');
// const sliderBigTitle = document.getElementById('big_title_slider');
// const nextSlide = document.getElementById('purchase_button');
// const progressBar = document.getElementById('prog_bar_marker');
// const lodgeTitle = document.getElementById('slide_title');

// const slideServiceButtons = $('.butt[data-service-button]');
// const columnMarker = $('.column_marker');
// //column_marker_anim

// let SliderBigTitlesList =
// ['Категории лож', 'Выберите расположение', 'Выберите Уровень сервиса', 'Выберите питание', 'Форма бронирования'];





// slideServiceButtons.click(function tableInput() {

// console.log(parseInt(this.dataset.serviceButton));

// buttonNumber = parseInt(this.dataset.serviceButton);

// slideServiceButtons.removeClass('button_red')

// $(`.butt[data-service-button=${buttonNumber}]`).addClass('button_red');

// $(`#service_radio_${buttonNumber}`).prop('checked', true);

// columnMarker.css({'transform': `translateX(calc( ${buttonNumber - 1} * (100% + 30px - 2px) ) )`});
// columnMarker.addClass('column_marker_anim');
// })


// typeRentButtons.click(function () {
// const statusBar = document.getElementById('status_bar_2');
// const choiceDetalis = document.getElementById('choice_detalis');
// let data = Number(this.dataset.rentType);

// if (data === 1) {
//     statusBar.style.cssText = 'transform: translateX(0px)'

//     choiceDetalis.style.cssText = 'transform: translateY(calc(-7vh - 10px))'
// }

// if (data === 2) {
//     statusBar.style.cssText = 'transform: translateX(100%)'
    
//     choiceDetalis.style.cssText = 'transform: translateY(0px)'
// }
// })

// let advList = {
// category_1: [0, 1, 2, 3, 4, 5, 6, 7],
// category_2: [0, 1, 2, 3, 4, 5],
// category_3: [0, 1, 2, 3],
// category_4: [0, 1],
// };

// applButton.addEventListener('click', function (){
// let sliderPosition = slider.offsetTop;
// window.scrollTo({
//     left: 0,
//     top: sliderPosition,
//     behavior: 'smooth'
// });
// console.log(sliderPosition);
// })


// categoryButtons.click(function clickCategory(){
// category_selected = Number(this.dataset.category);
// categoryButtons.removeClass('selected_category');
// $(`.category[data-category=${category_selected}]`).addClass('selected_category');

// advantages.removeClass('advantage_selected');

// $(`#check_${category_selected}`).prop('checked', true);

// if (category_selected === 1) {
//     for (cat of advList.category_1) {
//         $(`.advantage[data-advantage=${cat + 1}]`).addClass('advantage_selected')
//     }
//     lodgeTitle.innerHTML = 'Фотографии VIP-ложи категории «Platinum»'
// };

// if (category_selected === 2) {
//     for (cat of advList.category_2) {
//         $(`.advantage[data-advantage=${cat + 1}]`).addClass('advantage_selected')
//     }
//     lodgeTitle.innerHTML = 'Фотографии VIP-ложи категории «Gold»'
// };

// if (category_selected === 3) {
//     for (cat of advList.category_3) {
//         $(`.advantage[data-advantage=${cat + 1}]`).addClass('advantage_selected')
//     }
//     lodgeTitle.innerHTML = 'Фотографии VIP-ложи категории «Silver»'
// };

// if (category_selected === 4) {
//     for (cat of advList.category_4) {
//         $(`.advantage[data-advantage=${cat + 1}]`).addClass('advantage_selected')
//     }
//     lodgeTitle.innerHTML = 'Фотографии VIP-ложи категории «Bronze»'
// };    
// });