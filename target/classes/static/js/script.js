// ==================== Thymeleaf Data Integration ====================
let examQuestions = [];

// Load questions from Thymeleaf data
function loadQuestionsFromThymeleaf() {
    try {
        console.log('Checking for Thymeleaf data...');
        console.log('window.examQuestionsData:', window.examQuestionsData);
        
        // Use data passed from Thymeleaf
        if (window.examQuestionsData && window.examQuestionsData.length > 0) {
            examQuestions = window.examQuestionsData;
            console.log('Loaded questions from Thymeleaf:', examQuestions.length);
            console.log('First question:', examQuestions[0]);
            initializeExam();
        } else {
            console.log('No Thymeleaf data found, falling back to sample questions');
            loadSampleQuestions();
        }
    } catch (error) {
        console.error('Error loading questions from Thymeleaf:', error);
        loadSampleQuestions();
    }
}

// ==================== Render Options Dynamically ====================
function renderOptions(question) {
    const optionsContainer = document.getElementById('optionsContainer');
    if (!optionsContainer) return;
    
    optionsContainer.innerHTML = '';

    const isAnswered = question.status === 'answered';
    question.options.forEach((option, index) => {
        const isChecked = (question.selectedAnswer === index) ? 'checked' : '';
        const isDisabled = isAnswered ? 'disabled' : '';
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        if (isAnswered) optionDiv.classList.add('disabled-option');
        optionDiv.innerHTML = `
            <input type="radio" id="option${index + 1}" name="answer" value="${index}" ${isChecked} ${isDisabled}>
            <label for="option${index + 1}">
                <span class="option-text">${option}</span>
            </label>
        `;
        optionsContainer.appendChild(optionDiv);
    });

    // Add event listeners to new options
    if (!isAnswered) {
        optionsContainer.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.addEventListener('change', function() {
                question.selectedAnswer = parseInt(this.value);
                question.status = 'answered';
                updateQuestionStats();
            });
        });
    }
}

// Fallback sample questions
function loadSampleQuestions() {
    examQuestions = [
        {
            id: 1,
            text: "Which option is used to insert page numbers in a document?",
            options: [
                "Insert → Header & Footer → Page Number",
                "Layout → Margins → Page Number",
                "Review → Page Setup → Page Number",
                "View → Header → Page Number"
            ],
            correctAnswer: 0,
            status: "not-visited"
        },
        {
            id: 2,
            text: "What is the primary function of the CPU?",
            options: [
                "To store data",
                "To perform calculations and execute instructions",
                "To display images",
                "To connect to the internet"
            ],
            correctAnswer: 1,
            status: "not-visited"
        },
        {
            id: 3,
            text: "Which of the following is not a programming language?",
            options: [
                "Python",
                "Java",
                "HTML",
                "C++"
            ],
            correctAnswer: 2,
            status: "not-visited"
        },
        {
            id: 4,
            text: "What does RAM stand for?",
            options: [
                "Random Access Memory",
                "Rapid Application Module",
                "Read-Only Memory Access",
                "Removable Archive Memory"
            ],
            correctAnswer: 0,
            status: "not-visited"
        },
        {
            id: 5,
            text: "Which protocol is used to send emails?",
            options: [
                "HTTP",
                "FTP",
                "SMTP",
                "TCP"
            ],
            correctAnswer: 2,
            status: "not-visited"
        },
        {
            id: 6,
            text: "What is the keyboard shortcut for saving a file?",
            options: [
                "Ctrl + P",
                "Ctrl + S",
                "Ctrl + N",
                "Ctrl + O"
            ],
            correctAnswer: 1,
            status: "not-visited"
        },
        {
            id: 7,
            text: "Which of the following is an output device?",
            options: [
                "Mouse",
                "Keyboard",
                "Monitor",
                "Scanner"
            ],
            correctAnswer: 2,
            status: "not-visited"
        },
        {
            id: 8,
            text: "What is the full form of URL?",
            options: [
                "Uniform Resource Locator",
                "Universal Reference Link",
                "Unified Remote Location",
                "User Resource Lookup"
            ],
            correctAnswer: 0,
            status: "not-visited"
        },
        {
            id: 9,
            text: "Which programming language is known as the 'language of web'?",
            options: [
                "Python",
                "JavaScript",
                "Java",
                "C++"
            ],
            correctAnswer: 1,
            status: "not-visited"
        },
        {
            id: 10,
            text: "What does CSS stand for?",
            options: [
                "Computer Styling System",
                "Cascading Style Sheets",
                "Creative Style Syntax",
                "Core Style Standard"
            ],
            correctAnswer: 1,
            status: "not-visited"
        },
        {
            id: 11,
            text: "Which is the most used database management system?",
            options: [
                "MongoDB",
                "PostgreSQL",
                "MySQL",
                "SQLite"
            ],
            correctAnswer: 2,
            status: "not-visited"
        },
        {
            id: 12,
            text: "What is the size of a byte?",
            options: [
                "4 bits",
                "8 bits",
                "16 bits",
                "32 bits"
            ],
            correctAnswer: 1,
            status: "not-visited"
        },
        {
            id: 13,
            text: "Which of the following is a vector graphics software?",
            options: [
                "Photoshop",
                "Illustrator",
                "GIMP",
                "Paint"
            ],
            correctAnswer: 1,
            status: "not-visited"
        },
        {
            id: 14,
            text: "What does API stand for?",
            options: [
                "Application Programming Interface",
                "Advanced Protocol Integration",
                "Automated Process Interface",
                "Application Performance Index"
            ],
            correctAnswer: 0,
            status: "not-visited"
        },
        {
            id: 15,
            text: "Which layer of the OSI model deals with routing?",
            options: [
                "Data Link Layer",
                "Network Layer",
                "Transport Layer",
                "Application Layer"
            ],
            correctAnswer: 1,
            status: "not-visited"
        },
        {
            id: 16,
            text: "What is the default port for HTTP?",
            options: [
                "21",
                "22",
                "80",
                "443"
            ],
            correctAnswer: 2,
            status: "not-visited"
        },
        {
            id: 17,
            text: "Which is a NoSQL database?",
            options: [
                "Oracle",
                "MongoDB",
                "SQL Server",
                "PostgreSQL"
            ],
            correctAnswer: 1,
            status: "not-visited"
        },
        {
            id: 18,
            text: "What does JSON stand for?",
            options: [
                "Java Source Object Notation",
                "JavaScript Object Notation",
                "Java Serial Object Number",
                "JavaScript Online Notation"
            ],
            correctAnswer: 1,
            status: "not-visited"
        },
        {
            id: 19,
            text: "Which method is used to extract characters from a string?",
            options: [
                "substring()",
                "extract()",
                "slice()",
                "Both A and C"
            ],
            correctAnswer: 3,
            status: "not-visited"
        },
        {
            id: 20,
            text: "What is the time complexity of Binary Search?",
            options: [
                "O(n)",
                "O(n²)",
                "O(log n)",
                "O(1)"
            ],
            correctAnswer: 2,
            status: "not-visited"
        },
        {
            id: 21,
            text: "Which sorting algorithm is the fastest?",
            options: [
                "Bubble Sort",
                "Quick Sort",
                "Selection Sort",
                "Insertion Sort"
            ],
            correctAnswer: 1,
            status: "not-visited"
        },
        {
            id: 22,
            text: "What is the maximum value of a 32-bit signed integer?",
            options: [
                "2,147,483,647",
                "4,294,967,295",
                "1,073,741,823",
                "536,870,911"
            ],
            correctAnswer: 0,
            status: "not-visited"
        },
        {
            id: 23,
            text: "Which data structure is LIFO?",
            options: [
                "Queue",
                "Stack",
                "Tree",
                "Graph"
            ],
            correctAnswer: 1,
            status: "not-visited"
        },
        {
            id: 24,
            text: "What is the purpose of the JOIN operation?",
            options: [
                "To combine rows from two or more tables",
                "To delete records",
                "To update records",
                "To sort data"
            ],
            correctAnswer: 0,
            status: "not-visited"
        },
        {
            id: 25,
            text: "Which design pattern is used in MVC architecture?",
            options: [
                "Singleton",
                "Factory",
                "Observer",
                "Model-View-Controller"
            ],
            correctAnswer: 3,
            status: "not-visited"
        },
        {
            id: 26,
            text: "What does CRUD stand for?",
            options: [
                "Create, Read, Update, Delete",
                "Code, Refactor, Unify, Debug",
                "Compile, Run, Upload, Deploy",
                "Create, Restore, Update, Debug"
            ],
            correctAnswer: 0,
            status: "not-visited"
        },
        {
            id: 27,
            text: "Which of the following is a compiled language?",
            options: [
                "Python",
                "JavaScript",
                "C++",
                "PHP"
            ],
            correctAnswer: 2,
            status: "not-visited"
        },
        {
            id: 28,
            text: "What is the purpose of the 'this' keyword in JavaScript?",
            options: [
                "To refer to the current object",
                "To refer to the parent object",
                "To refer to the global object",
                "To refer to the previous object"
            ],
            correctAnswer: 0,
            status: "not-visited"
        },
        {
            id: 29,
            text: "Which of the following is NOT a JavaScript data type?",
            options: [
                "String",
                "Number",
                "Boolean",
                "Character"
            ],
            correctAnswer: 3,
            status: "not-visited"
        },
        {
            id: 30,
            text: "What is the difference between '==' and '===' in JavaScript?",
            options: [
                "No difference",
                "'==' compares values, '===' compares values and types",
                "'===' compares values, '==' compares values and types",
                "One is for numbers, one is for strings"
            ],
            correctAnswer: 1,
            status: "not-visited"
        },
        {
            id: 31,
            text: "Which HTML element is used for the most important heading?",
            options: [
                "<h1>",
                "<h2>",
                "<h6>",
                "<heading>"
            ],
            correctAnswer: 0,
            status: "not-visited"
        },
        {
            id: 32,
            text: "Which option is used to insert page numbers in a document?",
            options: [
                "Insert → Header & Footer → Page Number",
                "Layout → Margins → Page Number",
                "Review → Page Setup → Page Number",
                "View → Header → Page Number"
            ],
            correctAnswer: 0,
            status: "not-visited"
        },
        {
            id: 33,
            text: "What is the correct syntax for creating a function in JavaScript?",
            options: [
                "function myFunc() {}",
                "define myFunc() {}",
                "func myFunc() {}",
                "def myFunc() {}"
            ],
            correctAnswer: 0,
            status: "not-visited"
        },
        {
            id: 34,
            text: "Which method removes the last element from an array?",
            options: [
                "shift()",
                "pop()",
                "slice()",
                "splice()"
            ],
            correctAnswer: 1,
            status: "not-visited"
        },
        {
            id: 35,
            text: "What is the purpose of the 'async' keyword?",
            options: [
                "To create a synchronous function",
                "To create a function that returns a promise",
                "To create a variable",
                "To create a loop"
            ],
            correctAnswer: 1,
            status: "not-visited"
        },
        {
            id: 36,
            text: "Which of the following is a valid CSS selector?",
            options: [
                ".class",
                "#id",
                "element",
                "All of the above"
            ],
            correctAnswer: 3,
            status: "not-visited"
        },
        {
            id: 37,
            text: "What does REST stand for?",
            options: [
                "Representational State Transfer",
                "Request Execution State Transfer",
                "Relational Execution State Technology",
                "Remote Execution State Transfer"
            ],
            correctAnswer: 0,
            status: "not-visited"
        },
        {
            id: 38,
            text: "Which HTTP method is used to retrieve data?",
            options: [
                "GET",
                "POST",
                "PUT",
                "DELETE"
            ],
            correctAnswer: 0,
            status: "not-visited"
        },
        {
            id: 39,
            text: "What is the purpose of Git?",
            options: [
                "Version control",
                "Code compilation",
                "Code execution",
                "Code documentation"
            ],
            correctAnswer: 0,
            status: "not-visited"
        },
        {
            id: 40,
            text: "Which command is used to commit changes in Git?",
            options: [
                "git add",
                "git commit",
                "git push",
                "git pull"
            ],
            correctAnswer: 1,
            status: "not-visited"
        },
        {
            id: 41,
            text: "What is a breakpoint in debugging?",
            options: [
                "A line where execution pauses",
                "An error in the code",
                "A function call",
                "A variable declaration"
            ],
            correctAnswer: 0,
            status: "not-visited"
        },
        {
            id: 42,
            text: "Which of the following is NOT a CSS property?",
            options: [
                "color",
                "size",
                "margin",
                "padding"
            ],
            correctAnswer: 1,
            status: "not-visited"
        }
    ];
    initializeExam();
}

// ==================== State Management ====================
let currentQuestion = 1; 
let currentFontSize = 16;
const defaultFontSize = 16;
const minFontSize = 12;
const maxFontSize = 24;
let timeLeft = 3600; // 1 hour in seconds
let timerInterval;

// ==================== Initialize Application ====================
document.addEventListener('DOMContentLoaded', function () {
    // Load questions from Thymeleaf data
    loadQuestionsFromThymeleaf();
});

function initializeExam() {
    console.log('Initializing exam...');
    console.log('Number of questions:', examQuestions.length);
    
    generateQuestionMap();
    updateDateTime();
    updateQuestionStats(); // Initialize stats on load
    loadQuestion(currentQuestion);
    setupEventListeners();
    startCountdownTimer(); // Start the 1-hour countdown

    // Update time every second
    setInterval(updateDateTime, 1000);

    // Theme Switch Logic
    const themeCheckbox = document.getElementById('theme-checkbox');
    if (themeCheckbox) {
        themeCheckbox.addEventListener('change', function () {
            if (this.checked) {
                document.documentElement.setAttribute('data-theme', 'dark');
            } else {
                document.documentElement.removeAttribute('data-theme');
            }
        });
    }

    // Font Size Control Logic
    const fontIncrease = document.getElementById('font-increase');
    const fontDecrease = document.getElementById('font-decrease');
    const fontReset = document.getElementById('font-reset');

    if (fontIncrease) {
        fontIncrease.addEventListener('click', () => {
            console.log('Increase clicked, current size:', currentFontSize);
            if (currentFontSize < maxFontSize) {
                currentFontSize += 1;
                updateAppFontSize();
            }
        });
    }

    if (fontDecrease) {
        fontDecrease.addEventListener('click', () => {
            if (currentFontSize > minFontSize) {
                currentFontSize -= 1;
                updateAppFontSize();
            }
        });
    }

    if (fontReset) {
        fontReset.addEventListener('click', () => {
            currentFontSize = defaultFontSize;
            updateAppFontSize();
        });
    }

    function updateAppFontSize() {
        document.documentElement.style.setProperty('--app-font-size', `${currentFontSize}px`);
    }
    
    console.log('Exam initialization complete');
}

// ==================== Question Map Generation ====================
function generateQuestionMap() {
    console.log('Generating question map...');
    const questionMap = document.getElementById('questionMap');
    if (!questionMap) {
        console.error('Question map element not found');
        return;
    }
    questionMap.innerHTML = '';

    const totalQuestions = examQuestions.length > 0 ? examQuestions.length : 50;
    console.log('Total questions for map:', totalQuestions);

    for (let i = 1; i <= totalQuestions; i++) {
        const btn = document.createElement('button');
        btn.className = 'question-btn question-no-'+i;
        btn.textContent = i;
        btn.dataset.questionId = i;

        // Get status from exam questions or default
        const question = examQuestions.find(q => q.id === i);
        const status = question ? question.status : 'not-visited';
        btn.classList.add(status);

        if (i === currentQuestion) {
            btn.classList.add('active');
        }

        btn.addEventListener('click', () => {
            document.querySelectorAll('.question-btn.active').forEach(el => {
                el.classList.remove('active');
            });
            btn.classList.add('active');
            currentQuestion = i;
            loadQuestion(i);
        });

        questionMap.appendChild(btn);
    }
    console.log('Question map generated with', totalQuestions, 'buttons');
}

// ==================== Load Question ====================
function loadQuestion(questionId) {
    console.log('Loading question:', questionId);
    const question = examQuestions[questionId-1];

    if (question) {
        console.log('Found question:', question);
        
        // Update question number
        const questionNumberEl = document.getElementById('questionNumber');
        if (questionNumberEl) {
            questionNumberEl.textContent = questionId;
        }

        // Update question text
        const questionContentEl = document.getElementById('questionContent');
        if (questionContentEl) {
            questionContentEl.textContent = question.text;
        }

        // Render options dynamically
        renderOptions(question);

        // Update Save & Next button text if answered
        const saveNextBtn = document.querySelector('.btn-save');
        if (saveNextBtn) {
             saveNextBtn.textContent = "Save & Next";
            if(question.status === 'answered' ){
                let btnId = "question-no-"+questionId;
                let btn = document.querySelector("."+btnId);
                btn.classList.add("answered");
                btn.classList.remove("not-visited");
                saveNextBtn.textContent ="Next";
            }            
        }
    } else {
        console.log("Question not found:", questionId);
    }
}

// ==================== Update Date and Time ====================
function updateDateTime() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');

    const dateTimeString = `${day}/${month}/${year} ${hour}:${minute}:${second} am IST`;
    document.getElementById('currentDateTime').textContent = dateTimeString;
}

// ==================== Timer Management ====================
function startCountdownTimer() {
    const timerDisplay = document.getElementById('timeRemaining');

    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        if (timerDisplay) {
            timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert('Time is up! Your test will be submitted automatically.');
            // Add auto-submit logic here if needed
        } else {
            timeLeft--;

            // Enable End Test buttons only if 30 minutes or less remain (1800 seconds)
            if (timeLeft <= 1800) {
                const endBtns = document.querySelectorAll('.btn-end, .btn-end-test');
                endBtns.forEach(btn => {
                    if (btn.disabled) {
                        btn.disabled = false;
                        // btn.title = "You can now end the test";
                        btn.title = "End Test";
                    }
                });
            }
        }
    }

    updateTimer(); // Initial call
    timerInterval = setInterval(updateTimer, 1000);
}

function setupEventListeners() {
    // Save & Next button
    const saveNextBtn = document.querySelector('.btn-save');
    if (saveNextBtn) {
        saveNextBtn.addEventListener('click', async () => {
            const question = examQuestions[currentQuestion-1];

            // Only save if not already answered
            if (question && question.status == 'answered') {
                const selectedOption = document.querySelector('input[name="answer"]:checked');
                if (selectedOption) {
                    // Save to backend
                    const formData = new FormData();
                    formData.append('answer', selectedOption.value);
                    formData.append('questionId', question.id);

                    try {
                        const response = await fetch('/answers/save', {
                            method: 'POST',
                            body: formData
                        });
                        const result = await response.json();
                        if (result.success) {
                            question.status = 'answered';
                            question.selectedAnswer = parseInt(selectedOption.value);
                        }
                    } catch (error) {
                        console.error('Error saving answer:', error);
                    }
                } else {
                    if (question.status === 'not-visited') {
                        question.status = 'not-answered';
                    }
                }
            }else{
                let btnId = "question-no-"+currentQuestion;
                let btn = document.querySelector("."+btnId);
                btn.classList.add("answered");
                btn.classList.remove("not-visited");
            }

            // Move to next question
            if (currentQuestion < examQuestions.length) {
                currentQuestion++;
                loadQuestion(currentQuestion);
                // generateQuestionMap();
                updateQuestionStats();
            } else {
                alert('You have reached the end of the exam.');
                // generateQuestionMap();
                updateQuestionStats();
                // Optionally load the current question again to update button text
                loadQuestion(currentQuestion);
            }
        });
    }

    // End Test buttons - Initial state: disabled if more than 30 mins left
    const endTestBtns = document.querySelectorAll('.btn-end, .btn-end-test');
    endTestBtns.forEach(btn => {
        if (timeLeft > 1800) {
            btn.disabled = true;
            btn.title = "You can only end the test when 30 minutes or less remain";
        }

        btn.addEventListener('click', () => {
            if (btn.disabled) return;
            if (confirm('Are you sure you want to end the test? You cannot resume after this.')) {
                alert('Test submitted successfully!');
            }
        });
    });

    // Profile button
    const profileBtn = document.querySelector('.btn-profile');
    if (profileBtn) {
        profileBtn.addEventListener('click', () => {
            alert('Profile information would be displayed here.');
        });
    }
}

// ==================== Update Stats ====================
function updateQuestionStats() {
    const answeredCount = examQuestions.filter(q => q.status === 'answered').length;
    const notAnsweredCount = examQuestions.filter(q => q.status === 'not-answered').length;
    const partiallyAnsweredCount = examQuestions.filter(q => q.status === 'partially-answered').length;
    const notVisitedCount = examQuestions.filter(q => q.status === 'not-visited').length;

    // Update the sidebar boxes
    const answeredBox = document.querySelector('.answered-box');
    const notAnsweredBox = document.querySelector('.not-answered-box');
    const partiallyAnsweredBox = document.querySelector('.partially-answered-box');
    const notVisitedBox = document.querySelector('.not-visited-box');

    if (answeredBox) answeredBox.textContent = answeredCount;
    if (notAnsweredBox) notAnsweredBox.textContent = notAnsweredCount;
    if (partiallyAnsweredBox) partiallyAnsweredBox.textContent = partiallyAnsweredCount;
    if (notVisitedBox) notVisitedBox.textContent = notVisitedCount;

    // Update the top info bar
    const topAnsweredCount = document.querySelector('.answer-count');
    if (topAnsweredCount) topAnsweredCount.textContent = answeredCount;

    // Update the "Number of questions" res-label (index 1)
    const resLabels = document.querySelectorAll('.res-label');
    if (resLabels.length > 1) {
        resLabels[1].textContent = answeredCount;
    }
}

// ==================== Utility Functions ====================
function markQuestionAnswered(questionId) {
    const question = examQuestions.find(q => q.id === questionId);
    if (question && question.status === 'not-answered') {
        // question.status = 'answered';
        generateQuestionMap();
        updateQuestionStats();
    }
}

// Call initial update
updateQuestionStats();

// ==================== Auto-Start Camera for Proctoring ====================
let cameraStream = null;

// Initialize and auto-start camera on page load
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(startCameraAutomatically, 500);
});

// Auto-start camera function
async function startCameraAutomatically() {
    const videoElement = document.getElementById('examCamera');
    const cameraOverlay = document.getElementById('cameraOverlay');

    try {
        // Request camera permission
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: { ideal: 1280 },
                height: { ideal: 720 },
                facingMode: 'user'
            },
            audio: false
        });

        cameraStream = stream;
        videoElement.srcObject = stream;
        cameraOverlay.classList.add('hidden');
        console.log('Camera started automatically for proctoring');

        // Wait for video to load metadata before capturing
        videoElement.onloadedmetadata = function () {
            console.log('Video metadata loaded, waiting 2 seconds before capture');
            setTimeout(captureImageFromCamera, 2000);
        };

    } catch (error) {
        handleCameraError(error, cameraOverlay);
    }
}

// Capture image from camera after 2 seconds
function captureImageFromCamera() {
    const videoElement = document.getElementById('examCamera');
    const canvas = document.getElementById('captureCanvas');
    const capturedImage = document.getElementById('capturedImage');

    try {
        // Get the actual video dimensions
        const videoWidth = videoElement.videoWidth || videoElement.width;
        const videoHeight = videoElement.videoHeight || videoElement.height;

        console.log('Video dimensions:', videoWidth, videoHeight);

        if (videoWidth > 0 && videoHeight > 0) {
            // Set canvas dimensions to match video
            canvas.width = videoWidth;
            canvas.height = videoHeight;

            // Get canvas context and draw video frame
            const context = canvas.getContext('2d');
            // Flip the canvas as well to match the flipped video
            context.scale(-1, 1);
            context.drawImage(videoElement, -videoWidth, 0, videoWidth, videoHeight);

            // Convert canvas to image and display in image box
            const imageData = canvas.toDataURL('image/png');
            capturedImage.src = imageData;

            console.log('Image captured successfully from camera');
        } else {
            console.error('Video dimensions not available');
        }
    } catch (error) {
        console.error('Error capturing image:', error);
    }
}

// Handle Camera Errors
function handleCameraError(error, overlayElement) {
    let errorMessage = 'Camera Error';

    if (error.name === 'NotAllowedError') {
        errorMessage = 'Permission Denied - Allow camera access';
        console.error('Camera permission denied by user');
    } else if (error.name === 'NotFoundError') {
        errorMessage = 'No Camera Found';
        console.error('No camera device found');
    } else if (error.name === 'NotReadableError') {
        errorMessage = 'Camera Already in Use';
        console.error('Camera is already in use by another application');
    } else {
        console.error('Camera error:', error.message);
    }

    overlayElement.innerHTML = `<p>${errorMessage}</p>`;
    overlayElement.classList.remove('hidden');
}
