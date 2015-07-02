$(document).ready(function(){

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

$('.offer .action a').popover({
	trigger:   'hover focus',
	placement: 'bottom',
});

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

});
