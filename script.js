document.addEventListener('DOMContentLoaded', () => {
    // Define your courses here
    // Each course object should have a name and a category.
    // Categories will determine the cell's color.
    const courses = [
        { name: 'Calculus I', category: 'mathematics' },
        { name: 'Linear Algebra', category: 'mathematics' },
        { name: 'Differential Equations', category: 'mathematics' },
        { name: 'Circuit Analysis I', category: 'electrical-engineering' },
        { name: 'Digital Electronics', category: 'electrical-engineering' },
        { name: 'Electromagnetism', category: 'physics' },
        { name: 'Classical Mechanics', category: 'physics' },
        { name: 'Thermodynamics', category: 'physics' },
        { name: 'Programming Fundamentals', category: 'other' },
        { name: 'Ethics in Engineering', category: 'other' },
        { name: 'Data Structures', category: 'other' },
        { name: 'Power Systems', category: 'electrical-engineering' },
        // Add more courses as needed
    ];

    const courseGrid = document.getElementById('course-grid');

    // Function to render courses
    function renderCourses() {
        courseGrid.innerHTML = ''; // Clear existing courses
        courses.forEach(course => {
            const courseCell = document.createElement('div');
            courseCell.classList.add('course-cell');
            courseCell.classList.add(course.category); // Add category class for styling

            // Check if the course was previously completed (from local storage)
            const isCompleted = localStorage.getItem(course.name) === 'completed';
            if (isCompleted) {
                courseCell.classList.add('completed');
            }

            courseCell.textContent = course.name;
            courseCell.addEventListener('click', () => {
                // Toggle 'completed' class
                courseCell.classList.toggle('completed');

                // Update completion status in local storage
                if (courseCell.classList.contains('completed')) {
                    localStorage.setItem(course.name, 'completed');
                } else {
                    localStorage.removeItem(course.name);
                }
            });
            courseGrid.appendChild(courseCell);
        });
    }

    renderCourses(); // Initial render
});
