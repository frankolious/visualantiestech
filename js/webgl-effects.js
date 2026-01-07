// Additional JavaScript for WebGL effects

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // WebGL background effect for hero section
    const setupWebGLBackground = () => {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;
        
        // Create canvas element
        const canvas = document.createElement('canvas');
        canvas.className = 'webgl-bg';
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '0';
        canvas.style.opacity = '0.4';
        
        // Insert canvas as first child of hero section
        heroSection.insertBefore(canvas, heroSection.firstChild);
        
        // Initialize Three.js scene
        if (typeof THREE !== 'undefined') {
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            
            // Create scene, camera, and renderer
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({
                canvas: canvas,
                alpha: true,
                antialias: true
            });
            
            renderer.setSize(width, height);
            renderer.setPixelRatio(window.devicePixelRatio);
            
            // Create geometry for particles
            const particlesGeometry = new THREE.BufferGeometry();
            const particlesCount = 1500;
            
            const posArray = new Float32Array(particlesCount * 3);
            const scaleArray = new Float32Array(particlesCount);
            
            // Fill arrays with random positions and scales
            for (let i = 0; i < particlesCount * 3; i += 3) {
                // Position
                posArray[i] = (Math.random() - 0.5) * 10;     // x
                posArray[i + 1] = (Math.random() - 0.5) * 10; // y
                posArray[i + 2] = (Math.random() - 0.5) * 10; // z
                
                // Scale
                scaleArray[i / 3] = Math.random();
            }
            
            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
            particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));
            
            // Create material
            const particlesMaterial = new THREE.PointsMaterial({
                size: 0.05,
                color: 0x5e35b1,
                transparent: true,
                opacity: 0.8,
                blending: THREE.AdditiveBlending
            });
            
            // Create points
            const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
            scene.add(particlesMesh);
            
            // Position camera
            camera.position.z = 5;
            
            // Mouse movement effect
            let mouseX = 0;
            let mouseY = 0;
            
            document.addEventListener('mousemove', (event) => {
                mouseX = (event.clientX / width - 0.5) * 2;
                mouseY = (event.clientY / height - 0.5) * 2;
            });
            
            // Animation loop
            const animate = () => {
                requestAnimationFrame(animate);
                
                // Rotate particles based on mouse position
                particlesMesh.rotation.x += 0.001;
                particlesMesh.rotation.y += 0.001;
                
                particlesMesh.rotation.x += mouseY * 0.001;
                particlesMesh.rotation.y += mouseX * 0.001;
                
                renderer.render(scene, camera);
            };
            
            // Handle window resize
            window.addEventListener('resize', () => {
                const newWidth = canvas.clientWidth;
                const newHeight = canvas.clientHeight;
                
                camera.aspect = newWidth / newHeight;
                camera.updateProjectionMatrix();
                
                renderer.setSize(newWidth, newHeight);
            });
            
            // Start animation
            animate();
        }
    };
    
    // Initialize WebGL background if Three.js is available
    if (typeof THREE !== 'undefined') {
        setupWebGLBackground();
    } else {
        // Load Three.js dynamically if not available
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        script.onload = setupWebGLBackground;
        document.head.appendChild(script);
    }
    
    // Interactive wave effect for sections
    const setupWaveEffect = () => {
        const sections = document.querySelectorAll('section');
        
        sections.forEach((section, index) => {
            // Only add to certain sections (e.g., odd-indexed ones)
            if (index % 2 === 1) {
                const wave = document.createElement('div');
                wave.className = 'wave-divider';
                wave.innerHTML = `
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="wave-fill"></path>
                    </svg>
                `;
                
                // Add wave at the top of the section
                section.insertBefore(wave, section.firstChild);
                
                // Style the wave
                wave.style.position = 'absolute';
                wave.style.top = '0';
                wave.style.left = '0';
                wave.style.width = '100%';
                wave.style.height = '50px';
                wave.style.transform = 'translateY(-100%)';
                wave.style.zIndex = '1';
                
                // Style the wave fill
                const waveFill = wave.querySelector('.wave-fill');
                waveFill.style.fill = getComputedStyle(section).backgroundColor;
                
                // Add animation
                const keyframes = `
                    @keyframes wave-animation-${index} {
                        0% { transform: translateX(0); }
                        50% { transform: translateX(-25%); }
                        100% { transform: translateX(0); }
                    }
                `;
                
                const style = document.createElement('style');
                style.textContent = keyframes;
                document.head.appendChild(style);
                
                waveFill.style.animation = `wave-animation-${index} 15s ease-in-out infinite`;
            }
        });
    };
    
    // Initialize wave effect
    setupWaveEffect();
    
    // Magnetic buttons effect
    const magneticButtons = document.querySelectorAll('.btn');
    
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) * 0.2;
            const deltaY = (y - centerY) * 0.2;
            
            this.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });
    
    // Glitch text effect for headings
    const glitchHeadings = document.querySelectorAll('.hero h1, .section-title h2');
    
    glitchHeadings.forEach(heading => {
        // Create glitch layers
        const text = heading.textContent;
        heading.innerHTML = `
            <span class="glitch-text">${text}</span>
            <span class="glitch-layer glitch-layer-1" aria-hidden="true">${text}</span>
            <span class="glitch-layer glitch-layer-2" aria-hidden="true">${text}</span>
        `;
        
        // Add CSS for glitch effect
        heading.style.position = 'relative';
        
        const layers = heading.querySelectorAll('.glitch-layer');
        layers.forEach(layer => {
            layer.style.position = 'absolute';
            layer.style.top = '0';
            layer.style.left = '0';
            layer.style.width = '100%';
            layer.style.height = '100%';
        });
        
        // Add glitch animation on hover
        heading.addEventListener('mouseenter', function() {
            this.classList.add('glitching');
            
            // Remove class after animation completes
            setTimeout(() => {
                this.classList.remove('glitching');
            }, 1000);
        });
    });
    
    // Add CSS for glitch animation
    const glitchStyle = document.createElement('style');
    glitchStyle.textContent = `
        @keyframes glitch-anim-1 {
            0% { clip-path: inset(20% 0 36% 0); transform: translate(-2px, 2px); }
            10% { clip-path: inset(65% 0 15% 0); transform: translate(1px, -1px); }
            20% { clip-path: inset(82% 0 2% 0); transform: translate(3px, 1px); }
            30% { clip-path: inset(32% 0 27% 0); transform: translate(-3px, -2px); }
            40% { clip-path: inset(52% 0 7% 0); transform: translate(1px, 2px); }
            50% { clip-path: inset(12% 0 78% 0); transform: translate(-2px, -1px); }
            60% { clip-path: inset(25% 0 55% 0); transform: translate(2px, -2px); }
            70% { clip-path: inset(75% 0 5% 0); transform: translate(-1px, 1px); }
            80% { clip-path: inset(40% 0 43% 0); transform: translate(1px, -1px); }
            90% { clip-path: inset(3% 0 79% 0); transform: translate(-2px, 2px); }
            100% { clip-path: inset(20% 0 36% 0); transform: translate(2px, -2px); }
        }
        
        @keyframes glitch-anim-2 {
            0% { clip-path: inset(65% 0 12% 0); transform: translate(2px, -1px); }
            10% { clip-path: inset(25% 0 58% 0); transform: translate(-2px, 2px); }
            20% { clip-path: inset(5% 0 75% 0); transform: translate(1px, -2px); }
            30% { clip-path: inset(70% 0 2% 0); transform: translate(-1px, 1px); }
            40% { clip-path: inset(15% 0 65% 0); transform: translate(2px, -1px); }
            50% { clip-path: inset(55% 0 12% 0); transform: translate(-2px, 1px); }
            60% { clip-path: inset(35% 0 45% 0); transform: translate(1px, -2px); }
            70% { clip-path: inset(2% 0 89% 0); transform: translate(-1px, 2px); }
            80% { clip-path: inset(60% 0 30% 0); transform: translate(2px, -1px); }
            90% { clip-path: inset(40% 0 40% 0); transform: translate(-2px, 1px); }
            100% { clip-path: inset(65% 0 12% 0); transform: translate(2px, -1px); }
        }
        
        .glitching .glitch-layer-1 {
            animation: glitch-anim-1 0.4s linear infinite;
            color: #ec407a;
            opacity: 0.8;
        }
        
        .glitching .glitch-layer-2 {
            animation: glitch-anim-2 0.4s linear infinite;
            color: #00acc1;
            opacity: 0.8;
        }
    `;
    document.head.appendChild(glitchStyle);
});
