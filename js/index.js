document.addEventListener("DOMContentLoaded", function() {

    const urlForm = document.getElementById("urlForm");
    const resultField = document.getElementById("resultShortened");
    const copyButton = document.getElementById("copyButton");
    const preloadCont = document.getElementById("preloaderContainer");
    const resultsCont = document.getElementById("resultContainer");

    let loadState = false;

    function doThing(data = null) {
        // console.log(data);
        fetch("https://url-shortener-service.p.rapidapi.com/shorten", {
        "method": "POST",
        "headers": {
            "content-type": 'application/json',
            "x-rapidapi-host": "url-shortener-service.p.rapidapi.com",
            "x-rapidapi-key": "d065a6d56cmsh177414c74052be8p1726dfjsn7ba97c54ee16"
        },
        "body": data,
        })
        .then((response) => response.json())
        .then(response => {
            // console.log(response);
            // console.log(response.result_url);
            resultField.value = response.result_url;

            // Hide loader, show result
            resultsCont.classList.toggle("hidden");
            preloadCont.classList.toggle("hidden");      
        })
        .catch(err => {
            console.error(err);
        });
    }

    urlForm.addEventListener("submit", function(e){
        e.preventDefault();
        // Reset the copy button whenever a new link is requested
        copyButton.classList.remove("button-success");
        copyButton.innerText = "Copy";

        // Show preloader on request
        preloadCont.classList.toggle("hidden");
        resultsCont.classList.toggle("hidden");

        const urlFormData = new FormData(urlForm);
        let jurl = JSON.stringify(Object.fromEntries(urlFormData.entries()));
        doThing(jurl);
    })

    // Clipboard function (copy)
    copyButton.addEventListener("click", function(e) {
        navigator.clipboard.writeText(resultField.value).then(function(e){
            copyButton.classList.add("button-success");
            copyButton.innerText = "Copied!";
        }, function (err) {
            console.log(err);
        });
    })
})