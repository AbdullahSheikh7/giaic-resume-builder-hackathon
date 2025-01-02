const renderResume = (resumeData) => {
  let workExperienceHtml = ""
  let educationHtml = ""
  let languagesHtml = ""

  resumeData.workExperience.forEach(e => {
    workExperienceHtml += `
<div class="experience-item">
  <div class="year">${e.startDate && e.endDate ? e.startDate + " - " + e.endDate : ""}</div>
  <div class="position">${e.jobTitle}</div>
  <div class="company">${e.company}</div>
</div>`
  })

  resumeData.languages.forEach(e => {
    languagesHtml += `
<div class="language-item">
  <div class="language">${e.language}</div>
  <div class="proficiency">${e.proficiencyLevel}</div>
</div>`
  })

  resumeData.education.forEach(e => {
    educationHtml += `
<div class="education-item">
  <div class="year">${e.startYear && e.endYear ? e.startYear + " - " + e.endYear : ""}</div>
  <div class="degree">${e.degree}</div>
  <div class="university">${e.institution}</div>
</div>`
  })

  const html = `
<div class="resume">
  <div class="profile-info">
    <h1>${resumeData.personalInformation.fullName}</h1>
    <h2>${resumeData.personalInformation.jobTitle}</h2>
  </div>

  <div class="resume-content">
    <div class="left-column">
      <section class="education">
        <h3>Education</h3>
        ${educationHtml}
      </section>

      <section class="languages">
        <h3>Languages</h3>
        ${languagesHtml}
      </section>

      <section class="contact">
        <h3>Contact</h3>
        <div class="contact-item">
          <div>Phone</div>
          <div>${resumeData.personalInformation.phone}</div>
        </div>
        <div class="contact-item">
          <div>Email</div>
          <div>${resumeData.personalInformation.email}</div>
        </div>
      </section>
    </div>

    <div class="right-column">
      <section class="profile">
        <h3>Profile</h3>
        <p>${resumeData.personalInformation.professionalSummary}</p>
      </section>
      <section class="experience">
        <h3>Experience</h3>
        ${workExperienceHtml}
      </section>

      <section class="skills">
        <h3>Skills</h3>
        <div class="skill-item">
          ${resumeData.skills.join(`</div><div class="skill-item">`)}
        </div>
      </section>
    </div>
  </div>
</div>`

  localStorage.setItem("resumeData", JSON.stringify(resumeData))

  return html
}
