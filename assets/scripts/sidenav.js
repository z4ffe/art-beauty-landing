const sidenav = document.querySelector('#sidenav')
const sidenavBtn = document.querySelector('#sidebar-btn')
const body = document.querySelector('body')
const closeSideNavBtn = document.querySelector('#close-sidenav')

const closeSideNav = () => {
	sidenav.style.setProperty('transform', 'translateX(500px)')
	body.classList.remove('prevent-scroll')
}

const openSideNav = () => {
	sidenav.style.setProperty('transform', 'translateX(0)')
	body.classList.add('prevent-scroll')
}


sidenavBtn.addEventListener('click', openSideNav)

sidenav.addEventListener('click', (event) => {
	if (event.target === event.currentTarget) closeSideNav()
})

closeSideNavBtn.addEventListener('click', () => {
	closeSideNav()
})