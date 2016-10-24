(function () {
    "use strict";
	var localServerPath="http://192.168.1.10/mobileAPI/"; //Server address + folder for PHP-scripts there
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
		//when "Show Contacts" -button is clicked in form
		$("#showcontacts").click(function(event){
			showMain();
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
							/*	localStorage.setItem("user",data);
				var user=JSON.parse(localStorage.getItem("user"));
				var welcomemsg='<h2>Hello ' + user.student[0].firstname + ' ' +  user.student[0].lastname  + '!</h2>';*/
				
				localStorage.setItem('user', JSON.stringify({
    username: '#username'
}));

var user = JSON.parse(localStorage.getItem('user'));
			
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
		/*var user=JSON.parse(localStorage.getItem("user"));
			var welcomemsg='<h2>Hello ' + user.student[0].firstname + ' ' +  user.student[0].lastname  + '!</h2>';*/
	/*var user=JSON.parse(localStorage.getItem("user"));
		var userStudentID=user.student[0].studentid;*/
		$.post(localServerPath+"savemymove.php",{
			/*studentID:userStudentID,*/
			var user = JSON.parse(localStorage.getItem('user'));
			activitytype:$("#activitytype").val(),
			activitytype1:$("#activitytype1").val(),
			duration:$("#duration").val(),
			definition:$("#definition").val()
		},function(data){
			alert('Your move was saved!');
			$("#showaddform").hide();
			/*mymoves();*/
		});
		$("#addmoveform").trigger("reset");
	};
	
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
	
	//might be useful later
	function showMain(){
		getContacts();
		$("#content").load("main.html");
		$("#showlogout").show();
		$("#showaddcontact").show();
		$("#sayhello").html("<h1>Hello " + data + "</h1>");
		$("#showcontacts").hide();
		$("#contactform").hide();
	}
	
	//also
	function getContacts(){
		$.ajax({
			url: "http://192.168.1.10/mobileAPI/getContacts.php",
			dataType: 'json',
		})
		.done(function(data){
			var output='';
			output+='<table><tr><th>Name</th><th>Contact</th></tr>';
			$.each(data,function(key,val){
				output+='<tr><td>' + val.firstname + ' ' + val.lastname + '</td><td>';
				output+=val.email + ' ' + val.phone + '</td></tr>';
			});
			$("#contacts").html(output + "</table>");
		});
	};
	
	
	
	/*function saveContact(){
		var msg='';
		$.post("http://192.168.1.10/mobileAPI/insert_contact.php",{
				firstname:$("#firstname").val(),
				lastname:$("#lastname").val(),
				email:$("#email").val()
		},function(data){
			if(data=='OK'){
				$("#addcontactForm").trigger("reset");
				msg='<h3>Contact saved!</h3>';
				$("#addresult").html(msg);
				setTimeout(function(){
						$("#contactform").hide();
						showMain();
					},2000);
			}else{
				$("#addresult").html('<h3>Error in saving contact</h3>');
			}
		});
	};	*/
	
    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };

} )();