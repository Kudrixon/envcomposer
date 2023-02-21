const lecturerId = JSON.parse(localStorage.getItem('selectedLecturerId'));
        const courseId = JSON.parse(localStorage.getItem('selectedCourseId'));

        fetch(`http://localhost:3000/lecturers/${lecturerId}/course/${courseId}/program`)
            .then(response => response.json())
            .then(data => {
                const programList = document.getElementById('programCheckboxes');
                data.lecturers.forEach(program => {
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.name = 'program';
                    checkbox.value = program.link;

                    const label = document.createElement('label');
                    label.appendChild(checkbox);
                    label.appendChild(document.createTextNode(program.program_name));

                    programList.appendChild(label);
                });
            });

        const selectedPrograms = [];

        document.getElementById('programCheckboxes').addEventListener('click', e => {
            if (e.target.tagName === 'INPUT' && e.target.name === 'program') {
                if (e.target.checked) {
                    selectedPrograms.push(e.target.value);
                } else {
                    const index = selectedPrograms.indexOf(e.target.value);
                    selectedPrograms.splice(index, 1);
                }
            }
        });

        document.getElementById("linux-checkbox").addEventListener("click", onLinuxCheckboxClicked);
        document.getElementById("windows-checkbox").addEventListener("click", onWindowsCheckboxClicked);


        function onLinuxCheckboxClicked() {
            const selectedSystem = "linux"
            localStorage.setItem('selectedSystem', selectedSystem);

        }

        function onWindowsCheckboxClicked() {
            const selectedSystem = "windows"
            localStorage.setItem('selectedSystem', selectedSystem);
        }


        fetch(`http://localhost:3000/courses/${courseId}/scripts`)
            .then(response => response.json())
            .then(data => {
                const scriptnameObj = JSON.parse(data.results[0]);
                const scriptname = String(scriptnameObj.scriptname);
                localStorage.setItem('scriptname', scriptname);

            })
            .catch(error => {
                console.error(error);
            });
        
    const downloadSelectedPrograms = () => {
            const selectedSystem = localStorage.getItem('selectedSystem');
            const scriptname = localStorage.getItem('scriptname');

            downloadSelectedProgramsText(selectedPrograms);
            //nie mam pomyslu jak to inaczej zrobić naprawde
            setTimeout(() => {
                downloadInstallScript(selectedSystem);
            }, 1000);

            downloadScript(selectedSystem, scriptname);
        };

        const downloadSelectedProgramsText = (selectedPrograms) => {
            const data = selectedPrograms.join('\n');
            const blob = new Blob([data], { type: 'text/plain' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'selected_programs.txt';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };

        const downloadInstallScript = (selectedSystem) => {
            const installScriptLink = document.createElement('a');
            installScriptLink.href = `http://localhost:7000/scripts/${selectedSystem}/installer.${selectedSystem === 'windows' ? 'ps1' : 'sh'}`;
            installScriptLink.download = 'installer';
            document.body.appendChild(installScriptLink);
            installScriptLink.click();
            document.body.removeChild(installScriptLink);
        };

        const downloadScript = (selectedSystem, scriptname) => {
            const scriptLink = document.createElement('a');
            scriptLink.href = `http://localhost:7000/scripts/${selectedSystem}/${scriptname}.${selectedSystem === 'windows' ? 'ps1' : 'sh'}`;
            scriptLink.download = scriptname;
            document.body.appendChild(scriptLink);
            scriptLink.click();
            document.body.removeChild(scriptLink);
        };

        document.getElementById('downloadButton').addEventListener('click', downloadSelectedPrograms);