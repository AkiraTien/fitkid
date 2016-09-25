(function () {
    "use strict";
    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
      // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        firststate();
		//check if login is already done
		
		/*if(localStorage.length!=0){
			var islogged=localStorage.getItem("name");
			$("#showloginform").hide();
			$("#contactform").hide();
			$("#showaddcontact").show();
			$("#showcontacts").hide();
			$("#content").load("main.html");
			$("#sayhello").html("<h1>Hello " + islogged + "</h1>");
			getContacts();
		}else{
			$("#showlogout").hide();
			$("#showaddcontact").hide();
			$("#contactform").hide();*/
		
		
		//when "Registration" -button is clicked		
		$("#Registrationbtn").click(function(event){
			registration();
		});
		//when "Login" -button is clicked		
		$("#loginbtn1").click(function(event){
			login1();
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
	  
	
	
	  
	  
	  function firststate()
	  
	  {
		  $("#loginorregistration").show();
			$("#showloginform").hide();
			$("#contactform").hide();
			$("#showaddcontact").hide();
			$("#showlogout").hide();
			
	  };
	function login1(){
		 $("#loginorregistration").hide();
			$("#showloginform").show();
			$("#contactform").hide();
			$("#showaddcontact").hide();
			$("#showlogout").hide();
	};
	
	 /* function checkConnection() {
		var networkState = navigator.connection.type;
 		var states = {};
		states[Connection.UNKNOWN]  = 'Unknown connection';
		states[Connection.ETHERNET] = 'Ethernet connection';
		states[Connection.WIFI]     = 'WiFi connection';
		states[Connection.CELL_2G]  = 'Cell 2G connection';
		states[Connection.CELL_3G]  = 'Cell 3G connection';
		states[Connection.CELL_4G]  = 'Cell 4G connection';
		states[Connection.CELL]     = 'Cell generic connection';
		states[Connection.NONE]     = 'No network connection';
		if(states[networkState]=='No network connection'){
			$("#nonetwork").html('No network available at the moment!');
			$("#main").hide();
		}else{
			$("#nonetwork").hide();
			$("#main").show();
			main();
		}
	}
	function main(){
		if(localStorage.length!=0){
			var user=JSON.parse(localStorage.getItem("user"));
			var welcomemsg='<h2>Hello ' + user.student[0].firstname + ' ' +  user.student[0].lastname  + '!</h2>';
			$("#showlogin").hide();
			$("#showaddform").hide();
			$("#content").show();
			$("#user").html(welcomemsg);
			mymoves();
		}else{
			$("#showlogin").show();
			$("#content").hide();
		}
	}*/
	
		
    function login(){
			var loginname=$("#username").val();
			var loginpw=$("#password").val();
			var dataString="username="+loginname+"&password="+loginpw;
			var msg='';
			$("#content").html("Login...");
			$.ajax({
				type: "POST",
				url:"http://192.168.1.10/mobileAPI/login_rekisteri.php",
				data: dataString,
				crossDomain: true,
				cache: false,
				beforeSend: function(){ $("#content").val('Connecting...');},
				error: function(){$("#content").html("Ajax error");},
				success: function(data){
						if(data!="Error"){
							$("#content").html("Login ok");
							$("#showloginform").fadeOut(2000);
							setTimeout(function(){
								localStorage.setItem("name",data);
								showMain();
							},2000);
						}
						else if(data=="Error"){
							$("#content").html("Login error");
							document.getElementById("loginform").reset();
						}
				}
			});
			return false;
	};

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
	
	function showMain(){
		getContacts();
		$("#content").load("main.html");
		$("#showlogout").show();
		$("#showaddcontact").show();
		$("#sayhello").html("<h1>Hello " + data + "</h1>");
		$("#showcontacts").hide();
		$("#contactform").hide();
	}
	
	function getContacts(){
		$.ajax({
			url: "192.168.1.10/mobileAPI/getContacts.php",
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
	
	function addContact(){
		$("#showcontacts").show();
		$("#contacts").html('');
		$("#contactform").show();
		
	};
	
	function saveContact(){
		var msg='';
		$.post("192.168.1.10/mobileAPI/insert_contact.php",{
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
	};	
	
    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };

} )();