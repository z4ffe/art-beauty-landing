import JSON from '../data/clients.json' with {type: 'json'}

const clientsSlider = document.querySelector('.clients-slider')
const sliderButtons = document.querySelectorAll('button[data-type=slider]')

const clients = Array.from(JSON)
const CLIENTS_ON_PAGE = 4
let CURRENT_POSITION = 0

const clientTileTemplate = (name, photo, desc) => `<div class='client-tile'>
      <img alt='maria' class='client-photo' src='${photo}'>
      <h4 class='client-name'>${name}</h4>
      <p class='client-desc'>${desc}</p>
      <div class='client-social'>
        <ul>
          <li>
            <a href='https://vk.com'>
            	<img src='assets/images/clients/social/client-vk.svg' alt='VK'>
				</a>
          </li>
          <li>
           <a href='https://vk.com'>
            	<img src='assets/images/clients/social/client-instagram.svg' alt='Instagram'>
				</a>
          </li>
        </ul>
      </div>
    </div>
`

const switchPage = (direction) => {
	if (direction === 'left' && !(CURRENT_POSITION - CLIENTS_ON_PAGE < 0)) {
		CURRENT_POSITION = CURRENT_POSITION - CLIENTS_ON_PAGE
		clientsSlider.style.setProperty('transform', 'translateX(-1000px)')
		clientsSlider.style.setProperty('opacity', '0')
	}
	if (direction === 'right' && CURRENT_POSITION + CLIENTS_ON_PAGE < clients.length) {
		CURRENT_POSITION = CURRENT_POSITION + CLIENTS_ON_PAGE
		clientsSlider.style.setProperty('transform', 'translateX(1000px)')
		clientsSlider.style.setProperty('opacity', '0')
	}
	clientsSlider.innerHTML = ''
	for (let i = CURRENT_POSITION; i < CURRENT_POSITION + CLIENTS_ON_PAGE; i++) {
		if (i > clients.length - 1) {
			break
		}
		clientsSlider.insertAdjacentHTML('beforeend', clientTileTemplate(clients[i].firstName, clients[i].photo, clients[i].desc))
	}
	setTimeout(() => {
		clientsSlider.style.setProperty('transform', 'translateX(0)')
		clientsSlider.style.setProperty('opacity', '1')
	}, 500)
}

sliderButtons.forEach((btn) => {
	btn.addEventListener('click', () => {
		switchPage(btn.dataset.dir)
	})
})


// ------------------

window.onload = () => {
	for (let i = CURRENT_POSITION; i < CLIENTS_ON_PAGE; i++) {
		clientsSlider.insertAdjacentHTML('beforeend', clientTileTemplate(clients[i].firstName, clients[i].photo, clients[i].desc))
	}
}