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
	if ($('.panel-body > :not(:first-child)', this).length < 1) {
		return;
	}
	
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
		$('.alert-warning', form).removeClass('hidden');
	}).always(function(){
		$('html, body').animate({
			scrollTop: $(form).offset().top + ($(form).height() / 2),
		}, 100);
	});
	
	$.ajax({
		url: 'https://maker.ifttt.com/trigger/alsvanzelf_contact_form/with/key/gmYMqHqw1b_0v7avg84r-j-5aWO1SjPVaDSeWibwF6O',
		method: 'POST',
		data: {
			value1: $('#message', form).val(),
			value2: $('#availability', form).val()
		}
	});
});

});
