const form = document.getElementById("predictionForm");
const resultSection = document.getElementById("resultSection");

form.addEventListener("submit", function (event) {

    event.preventDefault();

    // Get values
    const cgpa = parseFloat(document.getElementById("cgpa").value) || 0;
    const tenth = parseFloat(document.getElementById("tenth").value) || 0;
    const twelfth = parseFloat(document.getElementById("twelfth").value) || 0;
    const backlogs = parseInt(document.getElementById("backlogs").value) || 0;

    const coding = parseFloat(document.getElementById("coding").value) || 0;
    const projects = parseInt(document.getElementById("projects").value) || 0;
    const internships = parseInt(document.getElementById("internships").value) || 0;
    const certifications = parseInt(document.getElementById("certifications").value) || 0;

    const aptitude = parseFloat(document.getElementById("aptitude").value) || 0;
    const communication = parseFloat(document.getElementById("communication").value) || 0;


    // -----------------------------
    // ACADEMIC SCORE
    // -----------------------------

    const cgpaScore = (cgpa / 10) * 100;

    const academicScore =
        (cgpaScore * 0.50) +
        (tenth * 0.25) +
        (twelfth * 0.25);


    // -----------------------------
    // TECHNICAL SCORE
    // -----------------------------

    const technicalScore =
        (coding * 0.55) +
        (aptitude * 0.45);


    // -----------------------------
    // PROJECT SCORE
    // -----------------------------

    const projectScore =
        Math.min(projects * 20, 100);


    // -----------------------------
    // EXPERIENCE SCORE
    // -----------------------------

    const internshipScore =
        Math.min(internships * 35, 100);

    const certificationScore =
        Math.min(certifications * 20, 100);

    const experienceScore =
        (internshipScore * 0.65) +
        (certificationScore * 0.35);


    // -----------------------------
    // BACKLOG PENALTY
    // -----------------------------

    const backlogPenalty =
        Math.min(backlogs * 4, 25);


    // -----------------------------
    // FINAL PREDICTION
    // -----------------------------

    let finalScore =
        (academicScore * 0.35) +
        (technicalScore * 0.25) +
        (projectScore * 0.12) +
        (experienceScore * 0.12) +
        (communication * 0.16) -
        backlogPenalty;


    finalScore = Math.max(
        0,
        Math.min(100, finalScore)
    );

    finalScore = Math.round(finalScore);


    // -----------------------------
    // STATUS
    // -----------------------------

    let status;

    if (finalScore >= 75) {

        status = "GOOD PLACEMENT POTENTIAL";

    } else if (finalScore >= 50) {

        status = "MODERATE POTENTIAL";

    } else {

        status = "NEEDS IMPROVEMENT";

    }


    // -----------------------------
    // UPDATE RESULT
    // -----------------------------

    document.getElementById("resultPercentage")
        .textContent = finalScore;

    document.getElementById("resultStatus")
        .textContent = status;


    // -----------------------------
    // BREAKDOWN
    // -----------------------------

    const academic = Math.round(
        Math.max(0, Math.min(100, academicScore))
    );

    const technical = Math.round(
        Math.max(0, Math.min(100, technicalScore))
    );

    const project = Math.round(projectScore);

    const experience = Math.round(
        Math.max(0, Math.min(100, experienceScore))
    );


    document.getElementById("academicResult")
        .textContent = academic + "%";

    document.getElementById("technicalResult")
        .textContent = technical + "%";

    document.getElementById("projectResult")
        .textContent = project + "%";

    document.getElementById("experienceResult")
        .textContent = experience + "%";


    // -----------------------------
    // PROGRESS BARS
    // -----------------------------

    document.getElementById("academicBar")
        .style.width = academic + "%";

    document.getElementById("technicalBar")
        .style.width = technical + "%";

    document.getElementById("projectBar")
        .style.width = project + "%";

    document.getElementById("experienceBar")
        .style.width = experience + "%";


    // -----------------------------
    // SHOW RESULT
    // -----------------------------

    resultSection.classList.remove("hidden");


    // Scroll directly to result
    setTimeout(() => {

        resultSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 100);

});