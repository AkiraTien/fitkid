(function () {
    "use strict";
	var localServerPath="https://fitkid.000webhostapp.com/mobileAPI/"; //Server address + folder for PHP-scripts there
    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
      // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        firststate(); //function for first screen
		
		
		
		//when "Registration" -button is clicked		
		$("#Registrationbtn").click(function(event){
			registration();
		});
		//when "Register" -button is clicked		
		$("#registrationbtn1").click(function(event){
			registrationbtn1();
		});
		//when "Login" -button is clicked		
		$("#loginbtn1").click(function(event){
			login1();
		});
		//when "Save my move" -button is clicked		
		$("#addmovebtn").click(function(event){
			savemove();
		});
		
		//when "Login" -button is clicked		
		$("#loginbtn").click(function(event){
			login();
		});
		//when "Logout" -button is clicked
		$("#logoutbtn").click(function(event){
			logout();
		});
		//when "Add Contact" -button is clicked
		$("#addcontact").click(function(event){
			addContact();
		});
		//when "Activities" -button is clicked		
		$("#dailymoves").click(function(event){
			$("#daily").show();
			mymoves();
		});
		//when "Save contact" -button is clicked
		$("#addContactBtn").click(function(event){
			saveContact();
		});	
		
      };  //onDeviceReady ends here
	  
	
	
	  
	  //function shows login or registration div
	  function firststate()
	  
	  {
		  $("#loginorregistration").show();
			$("#showloginform").hide();
			$("#showaddform").hide();
			$("#showaddcontact").hide();
			$("#showlogout").hide();
			$("#showregistrationform").hide();
			
	  };
	  
	  //function shows registration form
	  function registration(){
		  $("#loginorregistration").hide();
			$("#showloginform").hide();
			$("#showaddform").hide();
			$("#showaddcontact").hide();
			$("#showlogout").hide();
			$("#showregistrationform").show();
	  };
	  //function shows login form
	function login1(){
		 $("#loginorregistration").hide();
			$("#showloginform").show();
			$("#showaddform").hide();
			$("#showaddcontact").hide();
			$("#showlogout").hide();
			$("#showregistrationform").hide();
	};
	
		//function sends registration data to DB (not fixed yet)
		 function registrationbtn1(){
		$("#content").html('Login...');
		$.post(localServerPath+"insert_contact.php",{
			username1:$("#username1").val(),
			password1:$("#password1").val(),
			firstname:$("#firstname").val(),
			lastname:$("#lastname").val(),
			phone:$("#phone").val(),
			email:$("#email").val(),
			school:$("#school").val(),
			classname:$("#classname").val()
		},function(data){
					
			if(data!='Error'){
				$("#content").html('Registration done!');
			
				$("#loginorregistration").hide();
			$("#showloginform").show();
			$("#showaddform").hide();
			$("#showaddcontact").hide();
			$("#showlogout").hide();
			$("#registrationform").hide();
		}else{
				$("#content").html('Login error');	
				$("#showlogout").hide();
			$("#showaddcontact").hide();
			$("#showaddform").hide();		
			$("#loginorregistration").hide();
			}
		});
	};
		
	//function sends login and pwd to server
     function login(){
		$("#content").html('Login...');
		$.post(localServerPath+"login_rekisteri.php",{
			username:$("#username").val(),
			password:$("#password").val()
		},function(data){
			if(data!='Error'){
				$("#content").html('Login ok!');
							
		localStorage.setItem("test", data); //It's saved!
var test = localStorage.getItem("test"); //Let's grab it and save it to a variable
			
				$("#loginorregistration").hide();
			$("#showloginform").hide();
			$("#showaddform").show();
			$("#contactform").show();
			$("#showaddcontact").show();
			$("#showlogout").show();
		}else{
				$("#content").html('Login error');	
				$("#showlogout").hide();
			$("#showaddcontact").hide();
			$("#contactform").hide();	
			$("#showaddform").hide();			
			}
		});
		$("#loginform").trigger("reset");
		
	};
	
	function savemove(){
var test = localStorage.getItem("test")
		$.post(localServerPath+"savemymove.php",{
			username:(test),
			activitytype:$("#activitytype").val(),
			duration:$("#duration").val(),
			definition:$("#definition").val()
		},function(data){
			alert('Your move was saved! ');
			$("#showaddform").hide();
			/*mymoves();*/
		});
		$("#addmoveform").trigger("reset");
	};
	function mymoves(){
		var test = localStorage.getItem("test")
		$.post(localServerPath+"mymoves.php",{
				username:(test)
		},function(data){
			$("#results").html(data);
		});
		dailymoves(test);
	}
	
	function dailymoves(){
		var test = localStorage.getItem("test")
		$.post(localServerPath+"dailymoves.php",{
			username:(test)
		},function(data){
			$("#daily").html(data);
		});
	}
//function for logout
	function logout(){
		localStorage.clear();
		$("#content").html("Logged out. Please login to use.");
		//document.getElementById("loginform").reset();
		$("#loginform").trigger("reset");
		$("#showloginform").fadeIn(500);
		$("#showlogout").hide();
		$("#showaddcontact").hide();
		$("#sayhello").html("<h1>Login example</h1>");
		return false;
	};
	

	
	
    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };

} )();