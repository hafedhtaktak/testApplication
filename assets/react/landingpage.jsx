var React = require('react'),
  ReactDOM = require('react-dom');

var $ = require('jquery');

/*************************************************************
*************************************************************/

var ContactForm = React.createClass({
  

//initialiser les états 
  getInitialState: function () {
    return { champs:{
      name:'',
      email:'',
      message:''
    },
    errorName:"",
    errorEmail:"",
    hasErrorNameRed:""
   
   };
  },
  
  componentDidMount: function () {},

  componentWillUnmount: function () {},

  saveContactInfo: function (data) {
    
   
    
    
   

    $.ajax({
      url: "/saveContactInfo",
      dataType: 'json',
      type: 'POST',
      data:data,
      success: function (result) {
        alert("Le formulaire a été ajouté avec succés!")
      },
      error: function (xhr, status, err) {
        var err = eval("(" + xhr.responseText + ")");
        alert(err.Message);
      }
    });
  },
  //cette methode va nou permettre de faire les controles de saisies coté Client avec la gestion des erreurs
  onSubmit_:function(e){
       
    const errors={
      errorName:"",
      errorEmail:"",
      hasErrorNameRed:""

    }
    e.preventDefault();
    if(this.state.champs.name.length<5  ){
      //Associer le message d'erreur adequat avec l'erreur
     this.setState({errorName:"le nom doit avoir au moin 5 caracteres",hasErrorNameRed:"has-error"});
    }
    else if(this.state.champs.email.indexOf("@")==-1){
      this.setState({errorEmail:"Veuillez entrer un mail valide"});
    }
    else if(this.state.champs.name.length>5 )
      {
      this.saveContactInfo(this.state.champs);
      //reinitialiser tout les états au nul 
      let champs = Object.assign({}, this.state.champs);
      champs.name = '';     
      champs.email = '';                         
      champs.message = '';                        
                         
      this.setState({champs});
      this.setState({errorEmail:"",errorName:"",hasErrorNameRed:""});
      
      }
  
    

  }
 ,
   
  setValue_:function(e){
     const AllData= this.state.champs;
     AllData [e.target.name]=e.target.value;
     this.setState(AllData);

  },
 
  render: function () {

    //YOUR CODE GOES HERE
    let { email, name, message } = this.state.champs;
    
    return (
     
    /**my code is here */ 

    
 <div> 
      
 <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
 <a className="navbar-brand" href="/">Contact Info</a>
 <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
   aria-expanded="false" aria-label="Toggle navigation">
   <span className="navbar-toggler-icon"></span>
 </button>

 
</nav>
 <form onSubmit={this.onSubmit_} >
     <div className="form-group">
       <label>
         Email:
         <input type="email" name="email" value={email}   onChange={this.setValue_} className="form-control "/>
       </label>
     </div>

     <div className={"form-group " +this.state.hasErrorNameRed}>
       <label>
         Name: 
         <input type="text" name="name" value={name}   onChange={this.setValue_} className="form-control" />
         <span className="help-block ">{this.state.errorName}</span>
       </label>
     </div>
     <div className="form-group">
       <label>
         Message:
         <textarea  name="message" value={message}   onChange={this.setValue_} className="form-control"/>
       </label>
     </div>
     <input type="submit" value="Submit" className="btn btn-primary" />
   </form>

   </div>
    
    );
  }

});

ReactDOM.render(
  <ContactForm/>, document.getElementById('containerHome'));
