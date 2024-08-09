import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";



const form = document.querySelector(".form")


form.addEventListener("submit", handleSubmit)


function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget;

    const formData = {
        delay: Number(form.elements.delay.value.trim()),
        state: form.elements.state.value,
    }

    const promise = new Promise((res, rej) => {
        form.reset()
        setTimeout(() => {
            if (formData.state === "fulfilled") {
                res(formData.delay)
            } else {
                rej(formData.delay)
            }
        }, formData.delay)
    })

    promise.then(delay =>
        iziToast.show({
            message: `✅ Fulfilled promise in ${delay}ms`,
            titleColor: 'white',
            messageColor: 'white',
            backgroundColor: 'green',
            position: 'topRight'
        })).catch(delay =>
            iziToast.show({
                message: `❌ Rejected promise in ${delay}ms`,
                titleColor: 'white',
                messageColor: 'white',
                backgroundColor: 'red',
                position: 'topRight'
            }))

}