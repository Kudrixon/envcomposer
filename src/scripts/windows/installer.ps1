$filePath = "selected_programs.txt"

# Read the contents of the file
$lines = Get-Content $filePath

# Loop through each line in the file
foreach ($line in $lines) {
    # Start a new process to open the link in a web browser
    $process = Start-Process "iexplore.exe" $line -PassThru

    # Wait for the process to finish
    $process.WaitForExit()
}
