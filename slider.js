const initSlider = (cssSelector, config) => {
  let currentSliderIndex = 0

  const showPreviousSlide = ($slider, $slides) => {
    const $sliderContainer = $slider.querySelector('[data-js="slider_container"]')
    const sliderWidth = $sliderContainer.offsetWidth

    if (currentSliderIndex-- === 0) {
      currentSliderIndex = $slides.length - 1
    }

    $sliderContainer.style.transform = `translateX(-${(currentSliderIndex * sliderWidth)}px)`
  }

  const showNextSlide = ($slider, $slides) => {
    const $sliderContainer = $slider.querySelector('[data-js="slider_container"]')
    const sliderWidth = $sliderContainer.offsetWidth

    if (currentSliderIndex++ === $slides.length - 1) {
      currentSliderIndex = 0
    }

    $sliderContainer.style.transform = `translateX(-${currentSliderIndex * sliderWidth}px)`
  }

  const goToSlide = (event, $slider) => {
    currentSliderIndex = Number(event.target.dataset.slide)

    const $sliderContainer = $slider.querySelector('[data-js="slider_container"]')
    const sliderWidth = $sliderContainer.offsetWidth

    $sliderContainer.style.transform = `translateX(-${(currentSliderIndex * sliderWidth)}px)`
  }


  const $slider = document.querySelector(cssSelector)
  const $slides = Array.from($slider.children)

  /* Cria o sliderContainer */
  const $sliderContainer = /*html*/`
    <div data-js="slider_container" class="slider_container">
      ${$slider.innerHTML}
    </div>
  `
  
  $slider.innerHTML = $sliderContainer

  /* Cria a navegação */
  if (config.nav) {
    const $sliderNav = document.createElement('div')
    const $prevButton = document.createElement('button')
    const $nextButton = document.createElement('button')

    $sliderNav.setAttribute('data-js', 'slider_nav')
    $sliderNav.setAttribute('class', 'slider_nav')

    $prevButton.setAttribute('data-js', 'prev-button')
    $prevButton.setAttribute('class', 'prev-button')
    $prevButton.textContent = 'Previous'
    $prevButton.addEventListener('click', event => {
      showPreviousSlide($slider, $slides)
    })
    
    $nextButton.setAttribute('data-js', 'next-button')
    $nextButton.setAttribute('class', 'next-button')
    $nextButton.textContent = 'Next'
    $nextButton.addEventListener('click', event => {
      showNextSlide($slider, $slides)
    })
    
    $sliderNav.append($prevButton, $nextButton)
    $slider.append($sliderNav)
  }

  if (config.dots) {
    const $sliderDots = document.createElement('div')

    $sliderDots.setAttribute('data-js', 'slider_dots')
    $sliderDots.setAttribute('class', 'slider_dots')

    $slides.forEach((slide, index) => {
      const $dot = document.createElement('button')
      
      $dot.setAttribute('data-slide', `${index}`)
      $dot.setAttribute('class', 'dot')
      $dot.textContent = `Slide ${index + 1}`
      $dot.addEventListener('click', event => {
        goToSlide(event, $slider)
      })


      $sliderDots.append($dot)
    });

    $slider.append($sliderDots)
  }
}