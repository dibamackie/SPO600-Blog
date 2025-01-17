// JavaScript Blog Template with Menu and Bootstrap Styling

// A simple script to dynamically generate a blog page with a menu for multiple labs

document.addEventListener("DOMContentLoaded", () => {
    const menuContainer = document.getElementById('menu-container');
    const blogContainer = document.getElementById('blog-container');

    // Lab data
    const labs = [
        {
            id: "lab1",
            title: "Lab 1: Optimizing Bitmap Displays",
            content: {
                blogTitle: "Optimizing Bitmap Displays: My Lab 1 Journey with 6502 Assembly",
                blogIntro: `Have you ever wondered how assembly language interacts with hardware? 
                In Lab 1 of the SPO600 course, we dive deep into the fascinating world of low-level programming. This blog captures my journey through performance analysis, code optimization, and bitmap manipulation on the 6502 Emulator.`,
                blogSections: [
                    {
                        heading: "Bitmap Code Execution",
                        content: `The provided code fills the emulator's bitmapped display with the color yellow. Below is the original code:`,
                        code: `lda #$00        ; set a pointer in memory location $40 to point to $0200\nsta $40         ; ... low byte ($00) goes in address $40\nlda #$02        \nsta $41         ; ... high byte ($02) goes into address $41\nlda #$07        ; colour number\nldy #$00        ; set index to 0\nloop: sta ($40),y   ; set pixel colour at the address (pointer)+Y\niny             ; increment index\nbne loop        ; continue until done the page (256 pixels)\ninc $41         ; increment the page\nldx $41         ; get the current page number\ncpx #$06        ; compare with 6\nbne loop        ; continue until done all pages`,
                    },
                    {
                        heading: "Performance Analysis",
                        content: `I calculated the time required to execute the code assuming a 1 MHz clock speed. After summing up the execution counts and cycle times for all instructions, I determined the total execution time to be approximately [INSERT TIME HERE].`,
                    },
                    {
                        heading: "Modifications",
                        content: `I modified the code to fill the screen with light blue by changing the color value to $0E. Additionally, I made each page of the display a different color and introduced random pixel colors using a pseudo-random number generator.`,
                    },
                    {
                        heading: "Experiments",
                        content: `Adding the TYA instruction caused a gradient effect. Replacing it with LSR produced a pixelated pattern. Incremental experiments with multiple LSR or ASL instructions resulted in varying pixel shifts.`,
                    },
                    {
                        heading: "Challenges",
                        content: `To create border lines around the display, I wrote a program to draw specific patterns in memory locations. For example, the top line was colored red, while the bottom line was green.`,
                    },
                ],
                reflections: `This lab was an eye-opener for understanding assembly language and hardware interaction. I gained insights into optimizing code and how performance impacts program design. Assembly language is challenging yet rewarding, and I'm excited to explore more.`,
            }
        }
    ];

    // Generate menu dynamically with Bootstrap styling
    menuContainer.innerHTML = `
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Lab Blog</a>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        ${labs.map(lab => `
                            <li class="nav-item">
                                <button class="btn btn-link nav-link text-white menu-button" data-id="${lab.id}">${lab.title}</button>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        </nav>
    `;

    // Function to render a lab's blog content
    const renderLab = (lab) => {
        const { blogTitle, blogIntro, blogSections, reflections } = lab.content;
        const blogHTML = `
            <div class="container mt-4">
                <h1 class="text-primary">${blogTitle}</h1>
                <p>${blogIntro}</p>
                ${blogSections.map(section => `
                    <div class="my-4">
                        <h2 class="text-secondary">${section.heading}</h2>
                        <p>${section.content}</p>
                        ${section.code ? `<pre class="bg-light p-3 rounded"><code>${section.code}</code></pre>` : ''}
                    </div>
                `).join('')}
                <div class="my-4">
                    <h2 class="text-secondary">Reflections</h2>
                    <p>${reflections}</p>
                </div>
            </div>
        `;
        blogContainer.innerHTML = blogHTML;
    };

    // Add event listeners to menu buttons
    document.querySelectorAll('.menu-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const labId = e.target.dataset.id;
            const lab = labs.find(l => l.id === labId);
            if (lab) renderLab(lab);
        });
    });

    // Load the first lab by default
    if (labs.length > 0) renderLab(labs[0]);
});

// HTML structure should include:
// <div id="menu-container"></div>
// <div id="blog-container"></div>
