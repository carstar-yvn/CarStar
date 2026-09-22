const carType = document.getElementById("carType");
const packageSelect = document.getElementById("package");
const priceBox = document.getElementById("priceBox");
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxoTCua62QaIvhcPaQbx_nb4zsGxGSPzBi80ydSedIYtXX2WuGP0RIBLqrzk4EltHY/exec";
const prices = {
    sedan: {
        standard: 18000,
        premium: 25000,
        full: 30000
    },

    suv: {
        standard: 22000,
        premium: 27000,
        full: 32000
    }
};


function updatePrice() {

    const selectedCar = carType.value;
    const selectedPackage = packageSelect.value;

    if (!selectedCar || !selectedPackage) {

        priceBox.textContent =
            "Стоимость появится после выбора автомобиля и пакета";

        return;
    }

    const price =
        prices[selectedCar][selectedPackage];

    priceBox.textContent =
        "Стоимость: " +
        price.toLocaleString("ru-RU") +
        " ֏";
}


carType.addEventListener(
    "change",
    updatePrice
);


packageSelect.addEventListener(
    "change",
    updatePrice
);

const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        car: document.getElementById("car").value,
        carType: document.getElementById("carType").value,
        package: document.getElementById("package").value,
        price: priceBox.textContent,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value
    };

    await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(data),
        mode: "no-cors"
    });

    alert("Շնորհակալություն։ Ձեր հայտը հաջողությամբ ընդունվել է։");

    bookingForm.reset();

    priceBox.textContent =
        "Արժեքը կհայտնվի ավտոմեքենայի և փաթեթի ընտրությունից հետո";
});