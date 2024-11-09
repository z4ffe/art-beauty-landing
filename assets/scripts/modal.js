const callbackButtons = document.querySelectorAll('.callback')
const closeModal = document.querySelector('#close-modal')
const modal = document.querySelector('.modal')

const handleOpenModal = () => {
	document.querySelector('body').classList.add('prevent-scroll')
	modal.classList.add('modal-visible')
}

const handleCloseModal = () => {
	document.querySelector('body').classList.remove('prevent-scroll')
	modal.classList.add('modal-hidden')
	modal.addEventListener('animationend', () => {
		modal.classList.remove('modal-visible', 'modal-hidden')
	}, {once: true})
}

callbackButtons.forEach((button) => {
	button.addEventListener('click', handleOpenModal)
})

closeModal.onclick = () => {
	handleCloseModal()
}

modal.addEventListener('click', (event) => {
	if (event.target === event.currentTarget) handleCloseModal()
})