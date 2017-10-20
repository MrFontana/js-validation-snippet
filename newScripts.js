$(document).ready(function() {
	$('#acad_form').on('submit', function(e) {
		console.log('Validating...')
		var valid             = 0,
			password          = $('#Customer_Password').val(),
			verifyPassword    = $('#Customer_VerifyPassword').val(),
			shipStateSelect   = $('#Customer_ShipStateSelect').val(),
			shipOtherState    = $('#Customer_ShipState').val(),
			billStateSelect   = $('#Customer_BillStateSelect').val(),
			billOtherState    = $('#Customer_BillState').val(),
			shipCountrySelect = $('#Customer_ShipCountry').val(),
			billCountrySelect = $('#Customer_BillCountry').val(),
			emailRegEx        = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

		//---------- looping through ship-to inputs, confirming if they're blank and marking their labels ----------
		$('#ship-to .need').each(function() {
			if ($(this).val() == '') {
				$(this).prev().addClass('red');
				console.log('shipping fields are blank')
				valid = 1;
			} else {
				$(this).prev().removeClass('red');
			}
		});

		//---------- validates class of email within the acad_form -----------
		$('#login-details .email').each(function(){
			if($(this).val().search(emailRegEx) == -1){
				$(this).prev().addClass('red');
				console.log('invalid email')
				valid = 1;
			} else {
				$(this).prev().removeClass('red');
			}
		});

		//---------- Checks if passwords are 8 characters and match ----------
		if (password.length < 8 && verifyPassword.length < 8 || password !== verifyPassword) {
			$('#Customer_Password, #Customer_VerifyPassword').prev().addClass('red need');
			console.log('Passwords must be at least 8 characters and be exactly the same');
			valid = 1;
		} else {
			$('#Customer_Password, #Customer_VerifyPassword').prev().removeClass('red need');
		}

		//---------- Checks if ship state is selected ----------
		if (shipStateSelect == '') {
			$('#Customer_ShipState').prev().addClass('red need');
			console.log('Please select your shipping state')
			valid = 1;
		} else {
			$('#Customer_ShipState').prev().removeClass('red need');
		}

		//---------- Checks if ship country is selected ----------
		if (shipCountrySelect == '') {
			$('#Customer_ShipCountry').prev().addClass('red need');
			console.log('Please select your shipping country')
			valid = 1
		}

		//---------- if bill to is unchecked ----------
		if (!$('#billing_to_show').is(':checked')) {
			//---------- looping through ship-to inputs, confirming if they're blank and marking their labels ----------
			$('#bill-to .need').each(function() {
				if ($(this).val() == '') {
					$(this).prev().addClass('red');
					console.log('billing fields are blank')
					valid = 1;
				} else {
					$(this).prev().removeClass('red');
				}
			});

		//---------- Checks if ship state is selected ----------
		if (billStateSelect == '') {
			$('#Customer_BillState').prev().addClass('red need');
			console.log('Please select your billing state')
			valid = 1;
		} else {
			$('#Customer_BillState').prev().removeClass('red need');
		}

		//---------- Checks if ship country is selected ----------
		if (billCountrySelect == '') {
			$('#Customer_BillCountry').prev().addClass('red need');
			console.log('Please select your billing country')
			valid = 1
		} else {
			$('#Customer_BillCountry').prev().removeClass('red need');
		}
	}

	if (valid === 1) {
		e.preventDefault();
	}
});

});