icdocument.addEventListener('DOMContentLoaded', () => {
    const courses = [
        // Primer semestre
        { name: 'Quimica y sociedad', category: 'other', semester: 1, prerequisites: [] },
        { name: 'Introducción al calculo', category: 'mathematics', semester: 1, prerequisites: [] },
        { name: 'Introducción al algebra', category: 'mathematics', semester: 1, prerequisites: [] },
        { name: 'Introducción a la física', category: 'physics', semester: 1, prerequisites: [] },

        // Segundo semestre
        { name: 'Programación', category: 'other', semester: 2, prerequisites: [] },
        { name: 'Calculo en una variable', category: 'mathematics', semester: 2, prerequisites: ['Introducción al calculo'] },
        { name: 'Algebra lineal', category: 'mathematics', semester: 2, prerequisites: ['Introducción al algebra'] },
        { name: 'Física general 1', category: 'physics', semester: 2, prerequisites: ['Introducción a la física'] },

        // Tercer semestre
        { name: 'Matemáticas 3', category: 'mathematics', semester: 3, prerequisites: ['Calculo en una variable', 'Algebra lineal'] },
        { name: 'Física general 2', category: 'physics', semester: 3, prerequisites: ['Calculo en una variable', 'Algebra lineal', 'Física general 1'] },
        { name: 'Materiales para ingeniería', category: 'other', semester: 3, prerequisites: ['Física general 1', 'Quimica y sociedad'] },

        // Cuarto semestre
        { name: 'Introducción a electrotecnia', category: 'electrical-engineering', semester: 4, prerequisites: ['Calculo en una variable', 'Algebra lineal', 'Física general 1'] },
        { name: 'Matemáticas 4', category: 'mathematics', semester: 4, prerequisites: ['Matemáticas 3'] },
        { name: 'Física general 3', category: 'physics', semester: 4, prerequisites: ['Física general 1'] },
        { name: 'Mecánica general', category: 'mecanic', semester: 4, prerequisites: ['Física general 1'] },

        // Quinto semestre
        { name: 'Redes 1', category: 'electrical-engineering', semester: 5, prerequisites: ['Introducción a electrotecnia'] },
        { name: 'Análisis numérico', category: 'mathematics', semester: 5, prerequisites: ['Matemáticas 4'] },
        { name: 'Estadística', category: 'mathematics', semester: 5, prerequisites: ['Matemáticas 3'] },
        { name: 'Resistencia de materiales generales', category: 'mecanic', semester: 5, prerequisites: ['Mecánica general'] },

        // Sexto semestre
        { name: 'Redes 2', category: 'electrical-engineering', semester: 6, prerequisites: ['Redes 1'] },
        { name: 'Electronica general 1', category: 'electrical-engineering', semester: 6, prerequisites: ['Redes 1'] },
        { name: 'Campos electromagnéticos', category: 'electrical-engineering', semester: 6, prerequisites: ['Física general 2', 'Matemáticas 4', 'Introducción a electrotecnia'] },
        { name: 'Metrología eléctrica', category: 'electrical-engineering', semester: 6, prerequisites: ['Redes 1'] },
    ];

    const courseGrid = document.getElementById('course-grid');

    // Function to check if a course's prerequisites are met
    function arePrerequisitesMet(courseName) {
        const course = courses.find(c => c.name === courseName);
        if (!course) return false; // Should not happen

        if (course.prerequisites.length === 0) {
            return true; // No prerequisites, so they are met
        }

        // Check if all prerequisites are marked as completed
        return course.prerequisites.every(prereq => {
            return localStorage.getItem(prereq) === 'completed';
        });
    }

    // Function to render courses
    function renderCourses() {
        courseGrid.innerHTML = ''; // Clear existing courses

        // Group courses by semester for better display
        const semesters = {};
        courses.forEach(course => {
            if (!semesters[course.semester]) {
                semesters[course.semester] = [];
            }
            semesters[course.semester].push(course);
        });

        // Render each semester
        Object.keys(semesters).sort((a, b) => a - b).forEach(semesterNum => {
            const semesterTitle = document.createElement('h2');
            semesterTitle.textContent = `Semestre ${semesterNum}`;
            courseGrid.appendChild(semesterTitle);

            const semesterContainer = document.createElement('div');
            semesterContainer.classList.add('semester-container'); // Add a class for semester grouping
            courseGrid.appendChild(semesterContainer);

            semesters[semesterNum].forEach(course => {
                const courseCell = document.createElement('div');
                courseCell.classList.add('course-cell');
                courseCell.classList.add(course.category); // Add category class for styling

                // Check if the course was previously completed (from local storage)
                const isCompleted = localStorage.getItem(course.name) === 'completed';
                if (isCompleted) {
                    courseCell.classList.add('completed');
                }

                // Check if prerequisites are met
                const canBeTaken = arePrerequisitesMet(course.name);
                if (!canBeTaken && !isCompleted) { // If not completed and prereqs not met
                    courseCell.classList.add('locked');
                    courseCell.title = 'Prerequisites not met'; // Add a tooltip
                }

                courseCell.textContent = course.name;
                courseCell.addEventListener('click', () => {
                    // Only allow clicking if prerequisites are met OR if it's already completed
                    if (courseCell.classList.contains('locked')) {
                        alert(`Cannot mark "${course.name}" as completed. Please complete its prerequisites first: ${course.prerequisites.join(', ')}`);
                        return; // Exit if locked
                    }

                    // Toggle 'completed' class
                    courseCell.classList.toggle('completed');

                    // Update completion status in local storage
                    if (courseCell.classList.contains('completed')) {
                        localStorage.setItem(course.name, 'completed');
                    } else {
                        localStorage.removeItem(course.name);
                    }

                    // Re-render courses to update locked/unlocked states of dependent courses
                    renderCourses();
                });
                semesterContainer.appendChild(courseCell);
            });
        });
    }

    renderCourses(); // Initial render
});
