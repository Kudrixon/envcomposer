function redirectToPage() {
            window.location.href = "./download_page.html";
        }

        const semesterSelect = document.querySelector("#semester");
        const facultySelect = document.querySelector("#faculty");
        const lecturerSelect = document.querySelector("#lecturer");
        const courseSelect = document.querySelector("#course");

        async function getData(url) {
            try {
                const response = await fetch(url);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error(error);
            }
        }

        Promise.all([
            getData('http://localhost:3000/semesters'),
            getData('http://localhost:3000/faculties'),
            getData('http://localhost:3000/lecturers'),
            getData('http://localhost:3000/courses')
        ]).then(([semestersData, facultiesData, lecturersData, coursesData]) => {
            semestersData.semesters.forEach(semester => {
                const semesterObject = JSON.parse(semester);
                const option = document.createElement("option");
                option.value = semesterObject.id;
                option.textContent = semesterObject.name;
                semesterSelect.appendChild(option);
            });

            facultiesData.faculties.forEach(faculty => {
                const facultyObject = JSON.parse(faculty);
                const option = document.createElement("option");
                option.value = facultyObject.id;
                option.textContent = facultyObject.name;
                facultySelect.appendChild(option);
            });

            function updateLecturerOptions(facultyId) {
                if (lecturerSelect.options.length > 1) {
                    for (let i = lecturerSelect.options.length - 1; i > 0; i--) {
                        lecturerSelect.options[i] = null;
                    }
                }

                fetch(`http://localhost:3000/lecturers/${facultyId}`)
                    .then(response => response.json())
                    .then(data => {
                        const filteredLecturers = data.lecturers;
                        filteredLecturers.forEach(lecturer => {
                            const option = document.createElement("option");
                            option.value = lecturer.id;
                            option.textContent = `${lecturer.name} ${lecturer.surname}`;
                            lecturerSelect.appendChild(option);
                        });
                    })
                    .catch(error => console.error(error));
            }


            function updateCourseOptions(lecturerId, semesterId, facultyId) {
                // Remove all options except the first one
                 while (courseSelect.options.length > 1) {
                     courseSelect.remove(1);
                    }
                // Add new options based on the selected lecturer
                const filteredCourses = coursesData.courses
                    .map(course => JSON.parse(course))
                    .filter(course => course.lecturer_id === lecturerId && course.semester_id === semesterId && course.faculty_id === facultyId);
                filteredCourses.forEach(course => {
                    const option = document.createElement("option");
                    option.value = course.id;
                    option.textContent = course.name;
                    courseSelect.appendChild(option);
                });
            }

            semesterSelect.addEventListener("change", function () {
                const selectedSemesterId = parseInt(this.value);
                const selectedLecturerId = parseInt(lecturerSelect.value);
                const selectedFacultyId = parseInt(facultySelect.value);

                updateCourseOptions(selectedLecturerId, selectedSemesterId, selectedFacultyId);
            });

            facultySelect.addEventListener("change", function () {
                const selectedFacultyId = parseInt(this.value);
                const selectedSemesterId = parseInt(semesterSelect.value);
                const selectedLecturerId = parseInt(lecturerSelect.value);

                updateLecturerOptions(selectedFacultyId);
                updateCourseOptions(selectedLecturerId, selectedSemesterId, selectedFacultyId);

            });

            lecturerSelect.addEventListener("change", function () {
                const selectedLecturerId = parseInt(this.value);
                const selectedSemesterId = parseInt(semesterSelect.value);
                const selectedFacultyId = parseInt(facultySelect.value);
                
                updateCourseOptions(selectedLecturerId, selectedSemesterId, selectedFacultyId);
            });


    });

    const submitButton = document.getElementById("submitButton");
    submitButton.addEventListener("click", function () {
        const selectedSemester = semesterSelect.value;
        const selectedFaculty = facultySelect.value;
        const selectedLecturer = lecturerSelect.value;
        const selectedCourse = courseSelect.value;

        if (selectedSemester === "" || selectedFaculty === "" || selectedLecturer === "" || selectedCourse === "") {

            alert('Please select all values')

        } else {
            // Store the selected programs in local storage
            localStorage.setItem('selectedLecturerId', selectedLecturer);
            localStorage.setItem('selectedCourseId', selectedCourse);

            //redirect to new page
            window.location.href = "./download_page.html";
            }
            
    });