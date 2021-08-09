//buttons scrollTo
const applyButton = document.getElementById('application_button_wrapper');
const content_2 = document.querySelector('.content_2_wrapper');
const goToPurhcase_1 = document.querySelector('#go_to_purchase_wrapper');
const content_3 = document.querySelector('.content_3_wrapper');
const content_4 = document.querySelector('.content_4_wrapper');
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
        
        document.querySelector('.locations_wrapper').querySelector(`input[data-location="${tabData}"`).checked = false

        tabData = e.target.dataset.category;

        document.querySelector('.locations_wrapper').querySelector(`input[data-location="${tabData}"`).checked = true

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
            if (lodgeSelect.innerHTML != 'Выберите ложу') {
                nextButton.classList.add('active')
            }
        }
        if (rentType == 1) {
            rentTypeWindow.style.cssText = `height: ${defaultHeight + rentWindowResize + 5}px`
            if (nextButton.classList.contains('active') && document.querySelector('.calendar .date').innerHTML == 'Выберите дату') {
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
        
        document.querySelector(`.select_body[data-location-select="${tabData}"]`).classList.remove('visible')
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
        
        let selectedDate = document.querySelector('.calendar_wrapper .date').innerHTML

        if (!nextButton.classList.contains('active') && rentType != 1
            ||
            !nextButton.classList.contains('active') && selectedDate != 'Выберите дату') {
            nextButton.classList.add('active')
        }
    })
})

let calendarButton = document.querySelector('.calendar')
let calendarBody = document.querySelector('.calendar_body_wrapper')

let isHoverOnCalendarBody = false
let isHoverOnCalendarButton = false

$(function() {
    $('.calendar_body').datepicker();
});

$('.calendar_body').change(() => {
    
    let date = $('.calendar_body').val()
    $('.calendar .date').html(`${date}`)
    calendarBody.style.cssText = ('transform', 'translateY(-40%) scaleY(0)')

    if (lodgeSelect.innerHTML != 'Выберите ложу') {
        nextButton.classList.add('active')
    }
})

calendarBody.addEventListener('mouseenter', async() => {
    isHoverOnCalendarBody = true
    // console.log('ent');
    // document.querySelector('.calendar_wrapper').style.cssText = 'z-index: 8'
    // calendarBody.style.cssText = 'transform: translateY(calc(-100% + 10px)) scaleY(1)'
})

calendarBody.addEventListener('mouseleave', async() => {
    isHoverOnCalendarBody = false
    setTimeout(() => {
        if (isHoverOnCalendarBody == false && isHoverOnCalendarButton == false) {
            calendarBody.style.cssText = ';'
            setTimeout(() => {
                document.querySelector('.calendar_wrapper').style.cssText = 'z-index: 6'
            }, 300)
        }
    }, 600)
})

// calendarButton.addEventListener('click', async() => {
//     document.querySelector('.calendar_wrapper').style.cssText = 'z-index: 8'
//     document.querySelector('.calendar_body_wrapper').style.cssText = 'transform: translateY(calc(-100%)) scaleY(1)'
// })

calendarButton.addEventListener('mouseenter', async() => {
    isHoverOnCalendarButton = true
    setTimeout(() => {
        if (isHoverOnCalendarButton == true) {
            document.querySelector('.calendar_wrapper').style.cssText = 'z-index: 8'
            calendarBody.style.cssText = 'transform: translateY(calc(-100%)) scaleY(1)'
        }
    }, 600)
})

calendarButton.addEventListener('mouseleave', async() => {
    isHoverOnCalendarButton = false
    setTimeout(() => {
        if (isHoverOnCalendarBody == false && isHoverOnCalendarButton == false) {
            calendarBody.style.cssText = ''
            setTimeout(() => {
                document.querySelector('.calendar_wrapper').style.cssText = 'z-index: 6'
            }, 300)
        }
    }, 600)
})

lodgeSelect.addEventListener('click', () =>{
    document.querySelector(`.select_body[data-location-select="${tabData}"]`).classList.add('visible')
    let elem = document.querySelector(`.select_body[data-location-select="${tabData}"]`)
    elem.style.cssText = 'transform: translateX(0px)';
})

lodgeSelect.addEventListener('mouseover', () =>{
    isHoverOnSelectButton = true;

    document.querySelector('.user_choice_wrapper').style.cssText = 'z-index: 8'
    setTimeout(() => {
       if (isHoverOnSelectButton == true) {
            document.querySelector(`.select_body[data-location-select="${tabData}"]`).classList.add('visible')
            let elem = document.querySelector(`.select_body[data-location-select="${tabData}"]`)
            elem.style.cssText = 'transform: translateX(0px)';
       }
    }, 600)
})

lodgeSelect.addEventListener('mouseout', () =>{
    isHoverOnSelectButton = false;
    setTimeout(() => {
        if (isHoverOnSelectList == false && isHoverOnSelectButton == false) {
            document.querySelector(`.select_body[data-location-select="${tabData}"]`).classList.remove('visible')
            let elem = document.querySelector(`.select_body[data-location-select="${tabData}"]`)
            elem.style.cssText = 'transform: translateX(40px)';
            setTimeout(() => {
                if (isHoverOnSelectButton == false) {
                    document.querySelector('.user_choice_wrapper').style.cssText = 'z-index: 5'
                }
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

        setTimeout(() => {
            if (isHoverOnSelectList == false && isHoverOnSelectButton != true) {
                document.querySelector(`.select_body[data-location-select="${tabData}"]`).classList.remove('visible')
                let elem = document.querySelector(`.select_body[data-location-select="${tabData}"]`)
                elem.style.cssText = 'transform: translateX(40px)';
            }
        }, 600)
    })
})

const nextButton_2 = document.querySelector('.next_button')

nextButton_2.addEventListener('click', () => {
    if (nextButton_2.classList.contains('active')) {
        let scrollPosition = content_4.offsetTop
        window.scrollTo({
            left: 0,
            top: scrollPosition,
            behavior: 'smooth'
        })
    }
})

const tableHeaders = document.querySelectorAll('.table .table_header')
const tableButtons = document.querySelectorAll('.table .table_footer .button')
let dataTable = 0

tableHeaders.forEach((e) => {
    e.addEventListener('click', () => {
        console.log(parseInt(e.dataset.service))
        tableHeaders[dataTable].classList.remove('active')
        tableButtons[dataTable].classList.remove('active')

        tableItems.forEach((e) => {
            let out = e.querySelectorAll('.item')[dataTable].querySelectorAll('.icon')
            out.forEach((e) => {
                e.classList.remove('bright');
            })
        })

        dataTable = parseInt(e.dataset.service)

        tableItems.forEach((e) => {
            let out = e.querySelectorAll('.item')[dataTable].querySelectorAll('.icon')
            out.forEach((e) => {
                e.classList.add('bright');
            })
        })

        tableButtons[dataTable].classList.add('active')
        tableHeaders[dataTable].classList.add('active')
    })
})

let tableItems = document.querySelectorAll('.table_content .table_row')

tableButtons.forEach((e) => {
    e.addEventListener('click', () => {
        console.log(parseInt(e.dataset.service))
        tableHeaders[dataTable].classList.remove('active')
        tableButtons[dataTable].classList.remove('active')

        tableItems.forEach((e) => {
            let out = e.querySelectorAll('.item')[dataTable].querySelectorAll('.icon')
            out.forEach((e) => {
                e.classList.remove('bright');
            })
        })

        dataTable = parseInt(e.dataset.service)

        tableItems.forEach((e) => {
            let out = e.querySelectorAll('.item')[dataTable].querySelectorAll('.icon')
            out.forEach((e) => {
                e.classList.add('bright');
            })
        })

        tableButtons[dataTable].classList.add('active')
        tableHeaders[dataTable].classList.add('active')
    })
})


// let test = document.querySelectorAll('.table_row .table_cell')

// tableItems.forEach((e) => {
//     // let elem = e.querySelectorAll('.table_cell')[1].querySelector('.item').querySelector('.icon')
//     // // elem.forEach((el) => {
//     // //     el.classList.add('mod')
//     // // })
//     // console.log(elem.classList.remove('bright'));
//     // // elem.classList.remove('bright')
    
//     })