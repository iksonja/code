$(document).ready(function() {
    // Handle click events on the pulsating circles
    $('.pulse').click(function(){
        // Reset all circles to default color
        $('.pulse').css({'backgroundColor':'#c39565'});
        
        // Set the clicked circle to white
        $(this).css({'backgroundColor':'#fff'});
        
        // Get the ID of the clicked location
        var id = $(this).attr('id');
        
        // Hide all location info panels
        $('.map-location').css({'display':'none'});
        
        // Show the info panel for the clicked location
        $('#location-' + id).css({'display':'block'});
    });
});