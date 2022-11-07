let token = "";
if (token === ""){
    fetch('https://www.nyckel.com/connect/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'client_id=do1z4rtbsv8fbx1eki7rk3sw63smnh1o&client_secret=ubgjaxy13g5m72v2m59iu8vav5t0y7natjkzhh4mk6n4x6o47pzi8julg5o44x2v&grant_type=client_credentials'
    })
    .then(response => response.json())
    .then(data => getToken(data));
    function getToken(data){
        token = data.access_token;
    }
}

function onClick(){
    const url = document.getElementById("input");
    document.getElementById("image").src = url.value;

    fetch("https://www.nyckel.com/v1/functions/ca6goeer8issqw5l/invoke", {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(

            {"data": url.value}
        ) 
    })
    .then(response => response.json())
    .then(data => printResults(data));

    function printResults(data){
        console.log(data);
        document.getElementById("label").innerHTML = data.labelName;
        document.getElementById("confidence").innerHTML = data.confidence;
    }
}
