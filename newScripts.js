$(document).ready(function() {
	$('#acad_form').on('submit', function(e) {
		console.log('Validating...');
		var valid             = 0,
			acadNeed          = 0,
			password          = $('#Customer_Password').val(),
			verifyPassword    = $('#Customer_VerifyPassword').val(),
			shipStateSelect   = $('#Customer_ShipStateSelect').val(),
			shipOtherState    = $('#Customer_ShipState').val(),
			billStateSelect   = $('#Customer_BillStateSelect').val(),
			billOtherState    = $('#Customer_BillState').val(),
			shipCountrySelect = $('#Customer_ShipCountry').val(),
			billCountrySelect = $('#Customer_BillCountry').val(),
			emailRegEx        = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

		//---------- Empties existing errors before displaying remaining ----------
		$("#error-container").empty();

		//---------- looping through ship-to inputs, confirming if they're blank and marking their labels ----------
		$('#ship-to .need').each(function() {
			if ($(this).val() == '') {
				$(this).prev().addClass('red');
				valid = 1;
			} else {
				$(this).prev().removeClass('red');
			}
		});

		//---------- validates class of email within the acad_form -----------
		$('#login-details .email').each(function() {
			if($(this).val().search(emailRegEx) == -1 || $(this).val() == '') {
				$(this).prev().addClass('red');
				$("#error-container").append('<li>Login email format is invalid</li>').addClass('red');
				valid = 1;
			} else {
				$(this).prev().removeClass('red');
			}
		});

		//---------- Checks if passwords are 8 characters and match ----------
		if (password.length < 8 && verifyPassword.length < 8 || password !== verifyPassword) {
			$('#Customer_Password, #Customer_VerifyPassword').prev().addClass('red need');
			$("#error-container").append('<li>Password must be at least 8 characters and contain one number</li>').addClass('red');
			valid = 1;
		} else {
			$('#Customer_Password, #Customer_VerifyPassword').prev().removeClass('red need');
		}

		//---------- validates class of email within the ship-to section -----------
		$('#ship-to .email').each(function() {
			if($(this).val().search(emailRegEx) == -1 || $(this).val() == '') {
				$(this).prev().addClass('red');
				$("#error-container").append('<li>Shipping email format is invalid</li>').addClass('red');
				valid = 1;
			} else {
				$(this).prev().removeClass('red');
			}
		});

		//---------- Checks if ship state is selected ----------
		if (shipStateSelect == '' && shipCountrySelect == 'US' || shipCountrySelect == 'United states') {
			$('#Customer_ShipStateSelect').prev().addClass('red need');
			// $('#Customer_ShipState').prev().removeClass('red need');
			$("#error-container").append('<li>Please select your shipping state</li>').addClass('red');
			valid = 1;
		} else {
			$('#Customer_ShipStateSelect').prev().removeClass('red need');
		}

		//---------- Checks if ship country is selected ----------
		if (shipCountrySelect != 'US' && shipOtherState == '') {
			$('#Customer_ShipState').prev().addClass('red need');
			$("#error-container").append('<li>Please select other shipping state or province</li>').addClass('red');
			valid = 1;

		} else {
			$('#Customer_ShipState').prev().removeClass('red need');
		}

		//---------- removes needed class from bill to section if same as billing is checked ----------
		if ($('#billing_to_show').is(':checked')) {
			$('#bill-to .need').prev().removeClass('red need');
			$('#Customer_BillState').prev().removeClass('red need');
		}

		//---------- if bill to is unchecked ----------
		if (!$('#billing_to_show').is(':checked')) {
			$('#bill-to .need').each(function() {
				if ($(this).val() == '') {
					$(this).prev().addClass('red');
					valid = 1;
				} else {
					$(this).prev().removeClass('red');
				}
			});


		//---------- validates class of email within the ship-to section -----------
		$('#bill-to .email').each(function() {
			if($(this).val().search(emailRegEx) == -1 || $(this).val() == '') {
				$(this).prev().addClass('red');
				$("#error-container").append('<li>Billing email format is invalid</li>').addClass('red');
				valid = 1;
			} else {
				$(this).prev().removeClass('red');
				$("#error-container li").remove();
			}
		});

		//---------- Checks if ship state is selected ----------
		if (billStateSelect == '' && billCountrySelect == 'US' || billCountrySelect == 'United states') {
			$('#Customer_BillStateSelect').prev().addClass('red need');
			// $('#Customer_BillState').prev().removeClass('red need');
			$("#error-container").append('<li>Please select your billing state</li>').addClass('red');
			valid = 1;
		} else {
			$('#Customer_BillStateSelect').prev().removeClass('red need');
		}

		//---------- Checks if ship country is selected ----------
		if (billCountrySelect != 'US' && billOtherState == '') {
			$('#Customer_BillState').prev().addClass('red need');
			$("#error-container").append('<li>Please select other billing state or province</li>').addClass('red');
			valid = 1;
		} else {
			$('#Customer_BillState').prev().removeClass('red need');
		}

	}

	//---------- waits for ship to and bill to to loop, then checks for left over blank fields in this case, with the class of red ----------
	$('#acad_form .red').each(function() {
		if ($(this).next().val() == '') {
			acadNeed = 1;
			// console.log($(this));
		}
	});

	//---------- if any required fields are blank, appends general error message ----------
	if (acadNeed == 1) {
		$("#error-container").append('<li>Fields marked in red are required. One or more required fields are missing.</li>').addClass('red');
	} else {
		return true;
	}

	if (valid == 1) {
		e.preventDefault();
	}


});

});