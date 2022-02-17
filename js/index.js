document.addEventListener("DOMContentLoaded", function() {

    const urlForm = document.getElementById("urlForm");
    const resultField = document.getElementById("resultShortened");
    const copyButton = document.getElementById("copyButton");
    
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
        console.log(response);
        console.log(response.result_url);
        resultField.value = response.result_url;
        
    })
    .catch(err => {
        console.error(err);
    });

    }

    urlForm.addEventListener("submit", function(e){
        e.preventDefault();
        copyButton.classList.remove("button-success");
        copyButton.innerText = "Copy";
        const urlFormData = new FormData(urlForm);
        let jurl = JSON.stringify(Object.fromEntries(urlFormData.entries()));
        doThing(jurl);
    })

    copyButton.addEventListener("click", function(e) {
        navigator.clipboard.writeText(resultField.value).then(function(e){
            copyButton.classList.add("button-success");
            copyButton.innerText = "Copied!";
        }, function (err) {
            console.log(err);
        });
    })
})