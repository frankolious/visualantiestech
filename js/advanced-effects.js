// Additional JavaScript for advanced interactive features

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Particle Background for Hero Section
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#5e35b1', '#ec407a', '#f9a825', '#00acc1']
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }

    // Typing effect for hero text
    const heroText = document.querySelector('.hero h1');
    if (heroText) {
        const text = heroText.textContent;
        heroText.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 1500);
    }

    // Enhanced parallax effect
    const parallaxSections = document.querySelectorAll('section');
    
    if (parallaxSections.length > 0) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            parallaxSections.forEach((section, index) => {
                // Create different parallax speeds for different sections
                const speed = 0.1 + (index % 3) * 0.05;
                const yPos = -(scrollY * speed);
                
                // Apply parallax to background
                const bg = section.querySelector('.animated-bg');
                if (bg) {
                    bg.style.transform = `translateY(${yPos}px)`;
                }
            });
        });
    }

    // 3D tilt effect for cards
    const cards = document.querySelectorAll('.service-card, .product-card, .portfolio-item');
    
    if (cards.length > 0) {
        cards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const angleX = (y - centerY) / 20;
                const angleY = (centerX - x) / 20;
                
                this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        });
    }

    // Advanced audio visualization with WebAudio API
    const setupAdvancedAudioVisualization = () => {
        const audioBtn = document.querySelector('.audio-btn');
        const audioVisualizer = document.querySelector('.audio-visualizer');
        
        if (!audioBtn || !audioVisualizer) return;
        
        let audioContext;
        let analyser;
        let microphone;
        let isAudioActive = false;
        let dataArray;
        let bufferLength;
        let canvas;
        let canvasCtx;
        
        // Create canvas for visualization
        canvas = document.createElement('canvas');
        canvas.width = audioVisualizer.clientWidth;
        canvas.height = audioVisualizer.clientHeight;
        audioVisualizer.appendChild(canvas);
        canvasCtx = canvas.getContext('2d');
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (canvas) {
                canvas.width = audioVisualizer.clientWidth;
                canvas.height = audioVisualizer.clientHeight;
            }
        });
        
        // Toggle audio visualization
        audioBtn.addEventListener('click', function() {
            if (!isAudioActive) {
                // Start audio visualization
                if (!audioContext) {
                    try {
                        audioContext = new (window.AudioContext || window.webkitAudioContext)();
                        analyser = audioContext.createAnalyser();
                        analyser.fftSize = 256;
                        bufferLength = analyser.frequencyBinCount;
                        dataArray = new Uint8Array(bufferLength);
                        
                        // Request microphone access
                        navigator.mediaDevices.getUserMedia({ audio: true })
                            .then(stream => {
                                microphone = audioContext.createMediaStreamSource(stream);
                                microphone.connect(analyser);
                                
                                // Start visualization
                                visualize();
                                
                                isAudioActive = true;
                                audioBtn.classList.add('active');
                                audioBtn.innerHTML = '<i class="fas fa-stop"></i>';
                            })
                            .catch(err => {
                                console.error('Microphone access denied:', err);
                                // Fall back to demo mode
                                startDemoMode();
                            });
                    } catch (e) {
                        console.error('Web Audio API not supported:', e);
                        // Fall back to demo mode
                        startDemoMode();
                    }
                } else {
                    // Resume existing audio context
                    audioContext.resume().then(() => {
                        visualize();
                        isAudioActive = true;
                        audioBtn.classList.add('active');
                        audioBtn.innerHTML = '<i class="fas fa-stop"></i>';
                    });
                }
            } else {
                // Stop audio visualization
                if (audioContext) {
                    audioContext.suspend();
                }
                
                isAudioActive = false;
                audioBtn.classList.remove('active');
                audioBtn.innerHTML = '<i class="fas fa-play"></i>';
                
                // Clear canvas
                canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
            }
        });
        
        // Visualize audio
        const visualize = () => {
            if (!isAudioActive) return;
            
            requestAnimationFrame(visualize);
            
            analyser.getByteFrequencyData(dataArray);
            
            canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
            
            const barWidth = (canvas.width / bufferLength) * 2.5;
            let barHeight;
            let x = 0;
            
            for (let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i] / 255 * canvas.height;
                
                // Create gradient based on height
                const gradient = canvasCtx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight);
                gradient.addColorStop(0, '#5e35b1');
                gradient.addColorStop(0.5, '#ec407a');
                gradient.addColorStop(1, '#f9a825');
                
                canvasCtx.fillStyle = gradient;
                canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                
                x += barWidth + 1;
            }
        };
        
        // Demo mode for when microphone access is denied
        const startDemoMode = () => {
            isAudioActive = true;
            audioBtn.classList.add('active');
            audioBtn.innerHTML = '<i class="fas fa-stop"></i>';
            
            const demoVisualizer = () => {
                if (!isAudioActive) return;
                
                requestAnimationFrame(demoVisualizer);
                
                canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
                
                const barWidth = (canvas.width / 64) * 2.5;
                let barHeight;
                let x = 0;
                
                for (let i = 0; i < 64; i++) {
                    // Generate random heights that follow a pattern
                    barHeight = (Math.sin(Date.now() * 0.001 + i * 0.15) * 0.5 + 0.5) * canvas.height * 0.8;
                    
                    // Create gradient based on height
                    const gradient = canvasCtx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight);
                    gradient.addColorStop(0, '#5e35b1');
                    gradient.addColorStop(0.5, '#ec407a');
                    gradient.addColorStop(1, '#f9a825');
                    
                    canvasCtx.fillStyle = gradient;
                    canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                    
                    x += barWidth + 1;
                }
            };
            
            demoVisualizer();
        };
    };
    
    // Initialize advanced audio visualization
    setupAdvancedAudioVisualization();

    // Enhanced 3D product viewer with mouse drag
    const product3DContainer = document.querySelector('.product-3d-container');
    if (product3DContainer) {
        const product3D = product3DContainer.querySelector('.product-3d');
        let isDragging = false;
        let startX;
        let startRotation = 0;
        let currentRotation = 0;
        
        product3DContainer.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX;
            product3DContainer.style.cursor = 'grabbing';
            
            // Prevent default to avoid text selection during drag
            e.preventDefault();
        });
        
        document.addEventListener('mouseup', () => {
            isDragging = false;
            startRotation = currentRotation;
            product3DContainer.style.cursor = 'grab';
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const deltaX = e.pageX - startX;
            currentRotation = startRotation + deltaX / 2;
            
            product3D.style.transform = `rotateY(${currentRotation}deg)`;
        });
        
        // Touch support for mobile
        product3DContainer.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].pageX;
            
            // Prevent default to avoid scrolling during drag
            e.preventDefault();
        });
        
        document.addEventListener('touchend', () => {
            isDragging = false;
            startRotation = currentRotation;
        });
        
        document.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            const deltaX = e.touches[0].pageX - startX;
            currentRotation = startRotation + deltaX / 2;
            
            product3D.style.transform = `rotateY(${currentRotation}deg)`;
            
            // Prevent default to avoid scrolling during drag
            e.preventDefault();
        });
    }

    // Animated counter for statistics
    const animateCounter = (element, target, duration = 2000) => {
        let start = 0;
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // Easing function for smoother animation
            const easeOutQuad = progress * (2 - progress);
            
            const value = Math.floor(easeOutQuad * target);
            element.textContent = value;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        requestAnimationFrame(updateCounter);
    };
    
    // Initialize counters when they come into view
    const counters = document.querySelectorAll('.counter-value');
    if (counters.length > 0) {
        const observerOptions = {
            threshold: 0.5
        };
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'), 10);
                    animateCounter(entry.target, target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // Enhanced smooth scrolling with GSAP if available
    if (typeof gsap !== 'undefined' && typeof ScrollToPlugin !== 'undefined') {
        const smoothScroll = (target, duration = 1) => {
            gsap.to(window, {
                duration: duration,
                scrollTo: {
                    y: target,
                    offsetY: 70
                },
                ease: 'power3.inOut'
            });
        };
        
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    smoothScroll(targetElement);
                }
            });
        });
    }

    // Text scramble effect for headings
    class TextScramble {
        constructor(el) {
            this.el = el;
            this.chars = '!<>-_\\/[]{}—=+*^?#________';
            this.update = this.update.bind(this);
        }
        
        setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise(resolve => this.resolve = resolve);
            this.queue = [];
            
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                this.queue.push({ from, to, start, end });
            }
            
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }
        
        update() {
            let output = '';
            let complete = 0;
            
            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];
                
                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.randomChar();
                        this.queue[i].char = char;
                    }
                    output += `<span class="scramble-char">${char}</span>`;
                } else {
                    output += from;
                }
            }
            
            this.el.innerHTML = output;
            
            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }
        
        randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
    }
    
    // Apply text scramble effect to section titles when they come into view
    const sectionTitles = document.querySelectorAll('.section-title h2');
    if (sectionTitles.length > 0) {
        const titleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const title = entry.target;
                    const text = title.textContent;
                    const scramble = new TextScramble(title);
                    scramble.setText(text);
                    titleObserver.unobserve(title);
                }
            });
        }, { threshold: 0.5 });
        
        sectionTitles.forEach(title => {
            titleObserver.observe(title);
        });
    }

    // Dynamic color theme based on scroll position
    const updateColorTheme = () => {
        const scrollPosition = window.scrollY;
        const documentHeight = document.body.scrollHeight - window.innerHeight;
        const scrollProgress = scrollPosition / documentHeight;
        
        // Create a dynamic color palette based on scroll position
        const hue1 = 270; // Purple
        const hue2 = 340; // Pink
        const hue3 = 40;  // Gold
        const hue4 = 180; // Teal
        
        let primaryHue, accentHue;
        
        if (scrollProgress < 0.25) {
            // Interpolate between purple and pink
            primaryHue = hue1 + (hue2 - hue1) * (scrollProgress * 4);
            accentHue = hue3 + (hue4 - hue3) * (scrollProgress * 4);
        } else if (scrollProgress < 0.5) {
            // Interpolate between pink and gold
            primaryHue = hue2 + (hue3 - hue2) * ((scrollProgress - 0.25) * 4);
            accentHue = hue4 + (hue1 - hue4) * ((scrollProgress - 0.25) * 4);
        } else if (scrollProgress < 0.75) {
            // Interpolate between gold and teal
            primaryHue = hue3 + (hue4 - hue3) * ((scrollProgress - 0.5) * 4);
            accentHue = hue1 + (hue2 - hue1) * ((scrollProgress - 0.5) * 4);
        } else {
            // Interpolate between teal and purple
            primaryHue = hue4 + (hue1 - hue4) * ((scrollProgress - 0.75) * 4);
            accentHue = hue2 + (hue3 - hue2) * ((scrollProgress - 0.75) * 4);
        }
        
        // Update CSS variables
        document.documentElement.style.setProperty('--dynamic-primary', `hsl(${primaryHue}, 70%, 50%)`);
        document.documentElement.style.setProperty('--dynamic-accent', `hsl(${accentHue}, 70%, 50%)`);
        
        // Apply to gradient elements
        document.querySelectorAll('.dynamic-gradient').forEach(el => {
            el.style.background = `linear-gradient(135deg, hsl(${primaryHue}, 70%, 50%), hsl(${accentHue}, 70%, 50%))`;
        });
    };
    
    // Update color theme on scroll
    window.addEventListener('scroll', updateColorTheme);
    updateColorTheme(); // Initialize on page load
});
