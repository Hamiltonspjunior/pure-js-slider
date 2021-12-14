const createElement = (tagName, attributes) => {
  const element = document.createElement(tagName)

  Object.entries(attributes).forEach(([key, value]) => 
    element.setAttribute(key, value))

  return element
}

/* TODO:
  - Desabilitar os botões prev e next quando estiver no primeiro ou último slide
*/

const initSlider = (cssSelector, { 
  start = 0, loop = false, nav = true, dots = false, autoplay = false, }) => {

  const $slider = document.querySelector(cssSelector)
  const $slides = Array.from($slider.children)

  let $currentSlide = $slides[start]
  let currentSlideIndex = start

  const updateCurrentSlide = (slideIndex) => {
    $currentSlide = $slides[slideIndex]
    currentSlideIndex = slideIndex

    // console.log($currentSlide, currentSlideIndex)
  }

  const controlStateOfNavButtons = slideIndex => {
    if (slideIndex === 0) {
      document.querySelector('.prev').setAttribute('disabled', '')
    } else {
      document.querySelector('.prev').removeAttribute('disabled', '')
    }

    if (slideIndex === $slides.length - 1) {
      document.querySelector('.next').setAttribute('disabled', '')
    } else {
      document.querySelector('.next').removeAttribute('disabled', '')
    }
  }

  const goToSlide = slideIndex => {
    if (loop) {
      console.log('loop ativado')
    }
    
    controlStateOfNavButtons(slideIndex)
    
    $currentSlide.classList.remove('slider_item--visible')
    $slides[slideIndex].classList.add('slider_item--visible')
    $sliderContainer.style.transform = `translate(-${slideIndex * 100}%)`

    updateCurrentSlide(slideIndex)
  }

  const showPreviousSlide = () => {
     goToSlide(--currentSlideIndex)
  }

  const showNextSlide = () => {
    goToSlide(++currentSlideIndex)
  }

  /* Cria o slider_container e envolve os slides nele */
  const $sliderContainer = createElement('div', {
    'data-js': 'slider_container',
    class: 'slider_container',
  })
  
  $slides.forEach(slide => $sliderContainer.appendChild(slide))
  $slider.appendChild($sliderContainer)


  /* Seta o slide visivel ao carregar a página */
  goToSlide(currentSlideIndex)


  document.querySelector('.prev').addEventListener('click', showPreviousSlide)
  document.querySelector('.next').addEventListener('click', showNextSlide)
  document.querySelector('.go-to').addEventListener('click', event => {
    goToSlide(Number(event.target.dataset.slide))
  })
}
