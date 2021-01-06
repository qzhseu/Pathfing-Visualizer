export const getUsers = (userList) => {
  const url = "/api/users/getAll";

  fetch(url)
      .then(res => {
          if (res.status === 200) {
              return res.json();
          } else {
              //alert("Could not get Users");
              console.log("Could not get Users");
          }
      })
      .then(json => {
          //const scores= getPassedRoundScoreforAdmin();
          userList.setState({ users: json.users });
      })
      .catch(error => {
          console.log("Get Users Error: ",error);
      });
};

export const addUser = userlists => {
    const userList = userlists.state.users;
    //Clear Error
    userlists.setState({
      errors: {}
    })

    const newUser={
      username: userlists.state.userName,
      password: userlists.state.password,
      email: userlists.state.email,
    }

    const request = new Request("/api/users/register", {
      method: "post",
      body: JSON.stringify(newUser),
      headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
      }
    });

  fetch(request)
      .then(res => {
        if (res.status === 200) {
            userlists.setState({
              isOpen:true, 
              message:'Registration Success', 
              type:'success'
          })
        }
        return res.json();
      })
      .then(json => {
        if(json.Error){
          userlists.setState({
            errors: json.Error
          })
        }else{
          userList.push(json);
          userlists.setState({
            users: userList
          });
        }
      })
      .catch(error => {
          console.log(error);
      });
};

  
export const deleteUser = (userlists, userId) => {
    const url='/api/users/delete/'+userId;
    fetch( url, {
      method: 'delete'
    })
      .then(res=>{
        if (res.status === 200) {
          // filters out the user 
          const filteredUsers = userlists.state.users.filter(s => {
            return s._id !== userId;
          });
          userlists.setState({
              users: filteredUsers
          });
        }
      })
      .catch(error => {
        console.log("Delete Users Error: ",error);
      });

};

