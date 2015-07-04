$(document).ready(function(){

// highlight the contact form
$('.goto-contact').on('click', function(){
	function focusContactForm() {
		$('#contact .form-group:first-child .form-control').focus();
		$('#contact').addClass('focus');
		setTimeout(function(){
			$('#contact').removeClass('focus');
		}, 1700);
	}
	
	if ($('#contact').offset().top < $(document).scrollTop()) {
		$('html, body').animate({
			scrollTop: $('#contact').offset().top
		}, 500, focusContactForm);
	}
	else {
		focusContactForm();
	}
});

// tip popups at some places
$('.offer .action a').popover({
	trigger:   'hover focus',
	placement: 'bottom',
});

// show more from each offer
$('.offer').each(function(){
	$('.panel-body > :not(:first-child)', this).addClass('hidden');
	$('.panel-body > :first-child', this).append('<a href="#" class="toggler pull-right">Meer &hellip;</a>');
});
$('.offer .toggler').on('click', function(event){
	event.preventDefault();
	
	var offer = $(this).parents('.offer');
	$('.panel-body .hidden', offer).removeClass('hidden');
	$(this).remove();
});

// send the form to zapier
$('#contact form').on('submit', function(event){
	event.preventDefault();
	var form = this;
	
	$(form).find('.alert').addClass('hidden');
	
	$.ajax({
		url: 'https://zapier.com/hooks/catch/bwfz7f/',
		method: 'POST',
		data: {
			message: $('#message', form).val(),
			availability: $('#availability', form).val()
		}
	}).done(function(){
		$('.alert-success', form).removeClass('hidden');
	}).fail(function(){
		var email = 'lode@' + window.location.hostname;
		$('.alert-warning .email', form).html('<a href="mailto:' + email + '">' + email + '</a>');
		$('.alert-warning', form).removeClass('hidden');
	}).always(function(){
		$('html, body').animate({
			scrollTop: $(form).offset().top + ($(form).height() / 2),
		}, 100);
	});
});

});
