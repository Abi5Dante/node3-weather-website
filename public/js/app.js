const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const address = document.querySelector('#address')
const details = document.querySelector('#details')
const error = document.querySelector('#error')

weatherform.addEventListener('submit', () => {
    event.preventDefault();
    details.textContent = "loading....."
    error.textContent = ""
    fetch('/weather?address=' + search.value).then((response) => {
        response.json().then((data) => {
            address.textContent = data.location
            if (data.error) {
                details.textContent = ""
            } else {
                details.textContent = data.summary + ' It is currently ' + data.temperature + ' degrees celcius out. There is a ' + data.precipProbability + '% chance of rain.'
            }
            error.textContent = data.error
        })
    })
})