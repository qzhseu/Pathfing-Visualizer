export const getUserImage = (page) =>{
    const url="/api/users/getimage";
    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } 
        })
        .then(json => {
            // the resolved promise with the JSON body
            page.setState({ imageURL: json.imageURL });
        })
        .catch(error => {
            console.log(error);
        });
}


export const updateImage = (form, dashboardComp)=>{
    const url = "/api/users/updateImage";
    console.log("Update image:", form);
    const imageData = new FormData(form);

    const request =new Request(url,{
        method: "PATCH",
        body: imageData, 
    });

    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
       
            return res.json()
        }).then(json => {
            
            // If image was added successfully, tell the user.
            dashboardComp.setState({
                message: {
                    body: "Success: Updated an image.",
                    type: "success"
                },
                imageURL: json.imageURL
            });
        })
        .catch(error => {
            console.log(error);
        });
}