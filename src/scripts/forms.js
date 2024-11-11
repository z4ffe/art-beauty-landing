const forms = document.querySelectorAll('form')

forms.forEach(form => {
	form.addEventListener('submit', (event) => {
		event.preventDefault()
		const formData = new FormData(form)
		const formObj = Object.fromEntries(formData)
		console.log(formObj)
		form.reset()
	})
})




