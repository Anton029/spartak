//buttons scrollTo
const applyButton = document.getElementById('application_button_wrapper');
const content_2 = document.querySelector('.content_2_wrapper');
const goToPurhcase_1 = document.querySelector('#go_to_purchase_wrapper');
const content_3 = document.querySelector('.content_3_wrapper');
const nextButton = document.querySelector('.next_button');

applyButton.addEventListener('click', function(){
    let sliderPosition = content_2.offsetTop;
    window.scrollTo({
        left: 0,
        top: sliderPosition,
        behavior: 'smooth'
    });
})

goToPurhcase_1.addEventListener('click', function (){
    let scrollPosition = content_3.offsetTop
    window.scrollTo({
        left: 0,
        top: scrollPosition,
        behavior: 'smooth'
    })
})
//buttons scrollTo end
const categoryButtons = document.querySelector('.categories_title_wrapper');
const categories = document.querySelectorAll('.category_title');
const categoriesAdvantages = document.querySelectorAll('.list')
const bigPics = document.querySelectorAll('.big_picture img')
const smallPicsImg = document.querySelectorAll('.small_picture img')
const smallPics = document.querySelectorAll('.small_picture')
const rentDay = document.querySelector('.calendar_wrapper .date')
const categoriesNames = ['premium', 'gold', 'silver', 'bronze']
const minSeatsAmount = [16, 13, 14, 1]
const maxSeatsAmount = [51, 16, 17, 17]
let tabData = 0

function formRest(){
    lodgeSelect.innerHTML = 'Выберите ложу'
    nextButton.classList.remove('active')
}

function tabsHandler(data){
    document.querySelector('.location_choice').innerHTML = `Категория ${categoriesNames[data]}`

    document.querySelector(`.list[data-adv="${data}"]`).classList.add('visible')

    bigPics.forEach(el => {
        el.classList.remove('visible')
    })

    smallPicsImg.forEach(el => {
        el.classList.remove('visible')
    })

    smallPics.forEach(el => {
        el.querySelector(`.${categoriesNames[data]}`).classList.add('visible')
    })

    document.querySelector(`.big_picture .${categoriesNames[data]}`).classList.add('visible')
}

function amountSeatsRewrite(tabData){
    document.querySelector('.amount_text span').innerHTML = minSeatsAmount[tabData]
    document.querySelector('.input_wrapper .min_value').innerHTML = minSeatsAmount[tabData]
    document.querySelector('.input_wrapper .max_value').innerHTML = maxSeatsAmount[tabData]
    document.querySelector('.input_wrapper .amount_input').setAttribute('min', `${minSeatsAmount[tabData]}`)
    document.querySelector('.input_wrapper .amount_input').setAttribute('max', `${maxSeatsAmount[tabData]}`)
    document.querySelector('.input_wrapper .amount_input').value = `${minSeatsAmount[tabData]}`
    maxInputValue = inputSlider.getAttribute('max')
    minInputValue = inputSlider.getAttribute('min')
    fullProgWidth = document.querySelector('.input_wrapper').offsetWidth
    progWidth = fullProgWidth / (maxInputValue - minInputValue)
    inputProgressBar.style.width = '0px'
}

categoryButtons.addEventListener('click', (e) => {
    if(e.target.classList.contains('category_title')) {
        document.querySelector(`.category_title[data-category="${tabData}"]`).classList.remove('selected')
        document.querySelector(`.list[data-adv="${tabData}"]`).classList.remove('visible')

        tabData = e.target.dataset.category;

        amountSeatsRewrite(tabData)

        document.querySelector(`.category_title[data-category="${tabData}"]`).classList.add('selected')
        document.querySelector(`.category_title[data-category="${tabData}"]`).querySelector('input').checked = true
        tabsHandler(tabData)
        formRest()
    }
})


const rentTypeWindow = document.querySelector('.rent_details')
const rentTypeButtons = document.querySelector('.rent_type_wrapper')
const defaultHeight = rentTypeWindow.offsetHeight 
const rentWindowResize = document.querySelector('.calendar_wrapper').offsetHeight

var rentType = 0;
rentTypeButtons.addEventListener('click', (e) =>{
    if (e.target.classList.contains('rent_type')) {
        document.querySelector(`.rent_type[data-rent-type="${rentType}"]`).classList.remove('selected')
        rentType = parseInt(e.target.dataset.rentType)
        document.querySelector(`.rent_type[data-rent-type="${rentType}"]`).classList.add('selected')
        document.querySelector(`.rent_type[data-rent-type="${rentType}"]`).querySelector('input').checked = true

        if (rentType == 0) {
            rentTypeWindow.style.cssText = `height: ${defaultHeight}`
            calendarBody.style.cssText = 'transform: translateY(-40%) scaleY(0);'
            document.querySelector('.calendar_wrapper').style.cssText = 'z-index: 6'
        }
        if (rentType == 1) {
            rentTypeWindow.style.cssText = `height: ${defaultHeight + rentWindowResize + 10}px`
            if (nextButton.classList.contains('active')) {
                nextButton.classList.remove('active')
            }
        }
    }
})

const locationInput = document.querySelectorAll('.locations_wrapper input')
locationInput.forEach((e) => {
    e.addEventListener('click', () => {
        document.querySelector(`.category_title[data-category="${tabData}"]`).classList.remove('selected')
        document.querySelector(`.list[data-adv="${tabData}"]`).classList.remove('visible')

        tabData = e.dataset.location
        amountSeatsRewrite(tabData)

        document.querySelector(`.category_title[data-category="${tabData}"]`).classList.add('selected')
        document.querySelector(`.category_title[data-category="${tabData}"]`).querySelector('input').checked = true
        tabsHandler(tabData)
        formRest()
    })
})

const inputSlider = document.querySelector('.amount_input')
const inputSeats = document.querySelector('.amount_text span')
const inputProgressBar = document.querySelector('.progress_bar')
let maxInputValue = inputSlider.getAttribute('max')
let minInputValue = inputSlider.getAttribute('min')
let fullProgWidth = document.querySelector('.input_wrapper').offsetWidth
let progWidth = fullProgWidth / (maxInputValue - minInputValue)

inputSlider.oninput = (() => {
    let inputValue = Number(inputSlider.value)
    let progressPos = (inputValue - minInputValue)
    inputSeats.innerHTML = `${inputValue}`
    inputProgressBar.style.width = `${(progressPos * progWidth)}px`;
})

const lodgeSelect = document.querySelector('.select_header')
const selectList = document.querySelectorAll('.select_body')
const selectItems = document.querySelectorAll('.select_item')
let isHoverOnSelectList = false;
let isHoverOnSelectButton = false;

selectItems.forEach((e) => {
    e.addEventListener('click', () => {
        let itemValue = e.innerHTML
        lodgeSelect.innerHTML = itemValue
        document.querySelector(`.select_body[data-location-select="${tabData}"]`).classList.remove('visible')
        let elem = document.querySelector(`.select_body[data-location-select="${tabData}"]`)
        elem.style.cssText = 'transform: translateX(40px)';
        if (!nextButton.classList.contains('active')) {
            nextButton.classList.add('active')
        }
    })
})

let calendarButton = document.querySelector('.calendar')
let calendarBody = document.querySelector('.calendar_body_wrapper')

let isHoverOnCalendarBody = false
let isHoverOnCalendarButton = false
let date

$(function() {
    $('.calendar_body').datepicker();

    $('.calendar_body').change(() => {
    
        date = $('.calendar_body').val()
        $('.calendar .date').html(`${date}`)
        console.log('work');
        
        // calendarBody.style.cssText = ''
        // $('.calendar_wrapper').css({'z-index': '6'})
        $('.next_button').addClass('active')
    })
});

let eleme = document.querySelector('.calendar_body_wrapper')
eleme.style.cssText = 'margin-bottom: 200px';


calendarBody.addEventListener('mouseenter', async() => {
    isHoverOnCalendarBody = true
    document.querySelector('.calendar_wrapper').style.cssText = 'z-index: 8'
    calendarBody.style.cssText = 'transform: translateY(calc(-100% + 10px)) scaleY(1)'
})

// calendarBody.addEventListener('mouseleave', async() => {
//     isHoverOnCalendarBody = false
//     setTimeout(() => {
//         if (isHoverOnCalendarBody == false && isHoverOnCalendarButton == false) {
//             calendarBody.style.cssText = ';'
//             setTimeout(() => {
//                 document.querySelector('.calendar_wrapper').style.cssText = 'z-index: 6'
//             }, 300)
//         }
//     }, 600)
// })

calendarButton.addEventListener('click', async() => {
    document.querySelector('.calendar_wrapper').style.cssText = 'z-index: 8'
    calendarBody.style.cssText = 'transform: translateY(calc(-100% + 10px)) scaleY(1)'
})

calendarButton.addEventListener('mouseenter', async() => {
    isHoverOnCalendarButton = true
    setTimeout(() => {
        if (isHoverOnCalendarButton == true) {
            document.querySelector('.calendar_wrapper').style.cssText = 'z-index: 8'
            calendarBody.style.cssText = 'transform: translateY(calc(-100% + 10px)) scaleY(1)'
        }
    }, 600)
})

// calendarButton.addEventListener('mouseleave', async() => {
//     isHoverOnCalendarButton = false
//     setTimeout(() => {
//         if (isHoverOnCalendarBody == false && isHoverOnCalendarButton == false) {
//             calendarBody.style.cssText = ''
//             setTimeout(() => {
//                 document.querySelector('.calendar_wrapper').style.cssText = 'z-index: 6'
//             }, 300)
//         }
//     }, 600)
// })

// calendar.addEventListener('click', () => {
//     document.querySelector('.calendar_body_wrapper').style.cssText = 'transform: translateY(0px)'
//     document.querySelector('.calendar_visible_area')
// })

lodgeSelect.addEventListener('click', () =>{
    document.querySelector(`.select_body[data-location-select="${tabData}"]`).classList.add('visible')
    let elem = document.querySelector(`.select_body[data-location-select="${tabData}"]`)
    elem.style.cssText = 'transform: translateX(0px)';
})

lodgeSelect.addEventListener('mouseover', () =>{
    isHoverOnSelectButton = true;
    document.querySelector('.user_choice_wrapper').style.cssText = 'z-index: 7'
    setTimeout(function (){
       if (isHoverOnSelectButton == true) {
            document.querySelector(`.select_body[data-location-select="${tabData}"]`).classList.add('visible')
            let elem = document.querySelector(`.select_body[data-location-select="${tabData}"]`)
            elem.style.cssText = 'transform: translateX(0px)';
       }
    }, 600)
})

lodgeSelect.addEventListener('mouseout', () =>{
    isHoverOnSelectButton = false;
    setTimeout(function (){
        if (isHoverOnSelectList == false && isHoverOnSelectButton == false) {
            document.querySelector(`.select_body[data-location-select="${tabData}"]`).classList.remove('visible')
            let elem = document.querySelector(`.select_body[data-location-select="${tabData}"]`)
            elem.style.cssText = 'transform: translateX(40px)';
            setTimeout(() => {
                document.querySelector('.user_choice_wrapper').style.cssText = 'z-index: 5'
            }, 300)
        }
    }, 600)
})

selectList.forEach((e) => {
    e.addEventListener('mouseenter', () => {
        isHoverOnSelectList = true
    })
})

selectList.forEach((e) => {
    e.addEventListener('mouseleave', () => {
        isHoverOnSelectList = false

        setTimeout(function(){
            if (isHoverOnSelectList == false && isHoverOnSelectButton != true) {
                document.querySelector(`.select_body[data-location-select="${tabData}"]`).classList.remove('visible')
                let elem = document.querySelector(`.select_body[data-location-select="${tabData}"]`)
                elem.style.cssText = 'transform: translateX(40px)';
            }
        }, 600)
    })
})