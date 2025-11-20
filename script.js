document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu functionality
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const navButtons = document.querySelector('.nav-buttons'); // Get the nav-buttons
    const dropdowns = document.querySelectorAll('.nav-links .dropdown');

    hamburgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Toggle nav-buttons visibility with the hamburger menu
        if (window.innerWidth <= 768) { // Only for mobile screens
            if (navLinks.classList.contains('active')) {
                navButtons.style.display = 'flex';
                navButtons.style.flexDirection = 'column';
                navButtons.style.gap = '10px';
                navButtons.style.marginTop = '15px';
            } else {
                navButtons.style.display = 'none';
            }
        }
    });

    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active') && !link.parentElement.classList.contains('dropdown')) {
                navLinks.classList.remove('active');
                if (window.innerWidth <= 768) {
                    navButtons.style.display = 'none';
                }
            }
        });
    });

    // Handle dropdowns in mobile menu
    dropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('a');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');

        dropdownToggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault(); // Prevent default link behavior on mobile
                dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
            }
        });
    });

    // Reset mobile menu state on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            navButtons.style.display = 'flex'; // Always show on desktop
            navButtons.style.flexDirection = 'row'; // Reset to row on desktop
            navButtons.style.gap = '15px'; // Reset gap on desktop
            dropdowns.forEach(dropdown => {
                dropdown.querySelector('.dropdown-menu').style.display = ''; // Reset dropdown display
            });
        } else {
            // Hide nav-buttons if mobile menu is not active
            if (!navLinks.classList.contains('active')) {
                navButtons.style.display = 'none';
            }
        }
    });


    // Phone numbers dropdown functionality (from original index.html)
    const phoneBox = document.getElementById('phone-box');
    const phoneNumbersContainer = document.getElementById('phone-numbers');
    if (phoneBox && phoneNumbersContainer) {
        phoneBox.addEventListener('click', () => {
            phoneNumbersContainer.classList.toggle('show');
            phoneBox.classList.toggle('open');
        });
    }

    // Copy to clipboard functionality (from original index.html)
    const copyIcons = document.querySelectorAll('.copy-icon');
    if (copyIcons.length > 0) {
        copyIcons.forEach(icon => {
            icon.setAttribute('data-tooltip', icon.getAttribute('title'));
            icon.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent dropdown from closing if it's open
                const textToCopy = icon.getAttribute('data-clipboard-text');
                navigator.clipboard.writeText(textToCopy).then(() => {
                    const originalTooltip = icon.getAttribute('data-tooltip');
                    icon.setAttribute('data-tooltip', 'কপি হয়েছে!');
                    icon.classList.add('copied');
                    setTimeout(() => {
                        icon.setAttribute('data-tooltip', originalTooltip);
                        icon.classList.remove('copied');
                    }, 2000);
                });
            });
        });
    }

    // Dummy functionality for login/register form submission
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('দুঃখিত! রেজিস্ট্রেশন পরিষেবাটি বর্তমানে সাময়িকভাবে বন্ধ রয়েছে। অনুগ্রহ করে পরে চেষ্টা করুন।');
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('দুঃখিত! Server Maintainance এর জন্য লগইন সেবাটি সাময়িক ভাবে বন্ধ আছে। ');
        });
    }

    // Appointment page logic
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        const calendarDays = document.querySelectorAll('.calendar-day');
        const timeSlotBtns = document.querySelectorAll('.time-slot-btn');
        let selectedDate = null;
        let selectedTime = null;

        calendarDays.forEach(day => {
            day.addEventListener('click', () => {
                if (!day.classList.contains('empty-day') && !day.classList.contains('past-day')) {
                    calendarDays.forEach(d => d.classList.remove('selected-day'));
                    day.classList.add('selected-day');
                    selectedDate = day.dataset.date;
                    console.log('Selected Date:', selectedDate);
                }
            });
        });

        timeSlotBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                timeSlotBtns.forEach(b => b.classList.remove('selected-slot'));
                btn.classList.add('selected-slot');
                selectedTime = btn.dataset.time;
                console.log('Selected Time:', selectedTime);
            });
        });

        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = appointmentForm.querySelector('input[name="name"]').value;
            const email = appointmentForm.querySelector('input[name="email"]').value;
            const phone = appointmentForm.querySelector('input[name="phone"]').value;

            if (name && email && phone && selectedDate && selectedTime) {
                alert(`আপনার মিটিং এর অনুরোধ সফলভাবে জমা হয়েছে!\nনাম: ${name}\nইমেইল: ${email}\nফোন: ${phone}\nতারিখ: ${selectedDate}\nসময়: ${selectedTime}`);
                appointmentForm.reset();
                calendarDays.forEach(d => d.classList.remove('selected-day'));
                timeSlotBtns.forEach(b => b.classList.remove('selected-slot'));
                selectedDate = null;
                selectedTime = null;
            } else {
                alert('অনুগ্রহ করে আগে সাইনআপ অথবা লগইন করুন');
            }
        });
    }

    // Dynamic calendar generation logic for appointment.html
    const today = new Date();
    let displayMonth = today.getMonth(); // 0-indexed
    let displayYear = today.getFullYear();
    const currentDay = today.getDate();

    const monthNames = [
        "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
        "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
    ];

    const currentMonthYearSpan = document.getElementById('currentMonthYear');
    const calendarGrid = document.querySelector('.appointment-calendar .calendar-grid');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');

    function generateCalendar(year, month) {
        if (!currentMonthYearSpan || !calendarGrid) return; // Ensure elements exist on the page

        currentMonthYearSpan.textContent = `${monthNames[month]} ${year}`;
        calendarGrid.innerHTML = `
            <span class="calendar-day-name">শনি</span>
            <span class="calendar-day-name">রবি</span>
            <span class="calendar-day-name">সোম</span>
            <span class="calendar-day-name">মঙ্গল</span>
            <span class="calendar-day-name">বুধ</span>
            <span class="calendar-day-name">বৃহ</span>
            <span class="calendar-day-name">শুক্র</span>
        `;

        const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 for Sunday, 6 for Saturday
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let startGridDay = (firstDayOfMonth === 6) ? 0 : firstDayOfMonth + 1;
        
        for (let i = 0; i < startGridDay; i++) {
            const emptyDay = document.createElement('span');
            emptyDay.classList.add('calendar-day', 'empty-day');
            calendarGrid.appendChild(emptyDay);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const daySpan = document.createElement('span');
            daySpan.classList.add('calendar-day');
            daySpan.textContent = day;
            daySpan.dataset.date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

            const dateToCheck = new Date(year, month, day);
            if (dateToCheck.setHours(0,0,0,0) < today.setHours(0,0,0,0)) {
                daySpan.classList.add('past-day');
            }
            if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                daySpan.classList.add('selected-day');
            }

            calendarGrid.appendChild(daySpan);
        }

        const newCalendarDays = document.querySelectorAll('.calendar-day:not(.empty-day):not(.past-day)');
        newCalendarDays.forEach(day => {
            day.addEventListener('click', () => {
                document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected-day'));
                day.classList.add('selected-day');
            });
        });
    }

    if (currentMonthYearSpan && calendarGrid) { // Only run if on appointment.html
        generateCalendar(displayYear, displayMonth);

        if (prevMonthBtn) {
            prevMonthBtn.addEventListener('click', () => {
                displayMonth--;
                if (displayMonth < 0) {
                    displayMonth = 11;
                    displayYear--;
                }
                generateCalendar(displayYear, displayMonth);
            });
        }

        if (nextMonthBtn) {
            nextMonthBtn.addEventListener('click', () => {
                displayMonth++;
                if (displayMonth > 11) {
                    displayMonth = 0;
                    displayYear++;
                }
                generateCalendar(displayYear, displayMonth);
            });
        }
    }

    // Intersection Observer for lazy loading animations
    const animatedElements = document.querySelectorAll('.animated-element, .section-hero, .about-section, .services-section, .links-section, .projects-section, .services-full-section, .team-section, .auth-container, .appointment-form, .footer');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the element must be visible
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
});