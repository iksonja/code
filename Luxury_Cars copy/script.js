$(document).ready(function() {
    // Handle click events on the pulsating circles
    $('.pulse').click(function(){
        // Reset all circles to default color
        $('.pulse').css({'backgroundColor':'var(--clr-gold)'});
        
        // Set the clicked circle to white
        $(this).css({'backgroundColor':'#fff'});
        
        // Get the ID of the clicked location
        var id = $(this).attr('id');
        
        // Hide all location info panels
        $('.map-location').css({'display':'none'});
        
        // Show the info panel for the clicked location
        $('#location-' + id).css({'display':'block'});
    });
    
    // Initialize the map with the first location active
    $('.pulse:first').click();
    
    // Add smooth scrolling for navigation links
    $('a[href^="#"]').on('click', function(event) {
        event.preventDefault();
        
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 120
        }, 800);
    });
    
    // Form validation enhancements
    $('#bookingForm').on('submit', function(e) {
        e.preventDefault();
        
        if(validateForm()) {
            const pickUp = $('#location').val();
            const dropOff = $('#goal').val();
            const date = $('#date').val();
            const guests = $('#guests').val();
            const carClass = $('.category-tabs .active').text();
            
            // Show confirmation message
            showBookingConfirmation(pickUp, dropOff, date, guests, carClass);
            
            // Reset form
            this.reset();
        }
    });
    
    function validateForm() {
        let isValid = true;
        $('#bookingForm input[required]').each(function() {
            if($(this).val() === '') {
                $(this).css('border-color', '(212, 175, 55, 0.9)');
                isValid = false;
            } else {
                $(this).css('border-color', 'rgba(212, 175, 55, 0.2)');
            }
        });
        return isValid;
    }
    
    function showBookingConfirmation(pickUp, dropOff, date, guests, carClass) {
        // Create a confirmation overlay
        const confirmationHTML = `
            <div id="booking-confirmation" style="position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.8); z-index:9999; display:flex; justify-content:center; align-items:center;">
                <div style="background:var(--clr-black); border:2px solid var(--clr-gold); padding:30px; border-radius:10px; max-width:90%; width:500px; text-align:center;">
                    <h3 style="color:var(--clr-gold); margin-bottom:20px;">Booking Confirmed</h3>
                    <p>Thank you for choosing our premium service.</p>
                    <p>Your ${carClass} has been reserved for:</p>
                    <p style="margin:15px 0;"><strong>From:</strong> ${pickUp}<br><strong>To:</strong> ${dropOff}<br><strong>Date:</strong> ${date}<br><strong>Guests:</strong> ${guests}</p>
                    <p style="margin-bottom:20px;">We'll contact you shortly to confirm the details.</p>
                    <button id="close-confirmation" style="background:var(--clr-gold); color:var(--clr-black); border:none; padding:10px 30px; border-radius:5px; cursor:pointer;">Close</button>
                </div>
            </div>
        `;
        $('body').append(confirmationHTML);
        
        $('#close-confirmation').on('click', function() {
            $('#booking-confirmation').fadeOut(300, function() {
                $(this).remove();
            });
        });
    }
});


// Hero Section //

document.addEventListener('DOMContentLoaded', function() {
    // Select all elements with the hero-stat-value class
    const counterElements = document.querySelectorAll('.hero-stat-value');
    
    // Function to animate counting up with delay parameter added
    function animateCounter(element, targetValue, duration, delay) {
        // Remove any "+" symbols and convert to number
        const target = parseInt(targetValue.replace(/\D/g, ''));
        let startTime = null;
        const startValue = 0;
        
        // Add a delay using setTimeout
        setTimeout(() => {
            function updateCounter(timestamp) {
                if (!startTime) startTime = timestamp;
                
                // Calculate progress (0 to 1)
                const progress = Math.min((timestamp - startTime) / duration, 1);
                
                // Calculate current value using easing function
                const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                const currentValue = Math.floor(startValue + (target - startValue) * ease);
                
                // Update the element content with the original format (keeps the "+" if it was there)
                element.textContent = targetValue.includes('+') 
                    ? currentValue + '+' 
                    : currentValue;
                
                // Continue animation if not complete
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            }
            
            // Start the animation
            requestAnimationFrame(updateCounter);
        }, delay); // Delay in milliseconds before starting the animation
    }
    
    // Create an Intersection Observer to trigger counting when elements come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get the original text (e.g., "1200+")
                const finalValue = entry.target.textContent;
                
                // Start the animation with delay (e.g., 500ms delay)
                animateCounter(entry.target, finalValue, 5000, 500); // 5000ms duration, 500ms delay
                
                // Stop observing once animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); // Trigger when at least 10% of the element is visible
    
    // Observe each counter element
    counterElements.forEach(counter => {
        observer.observe(counter);
    });
});