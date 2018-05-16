export default function getMessage() {
    const url = 'http://localhost:3000/';
    fetch(url)
        .then(response => console.log(response.text()));
}