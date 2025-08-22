const resumeDataPrototype = {
  workExperience: {
    jobTitle: "",
    company: "",
    startDate: "",
    endDate: "",
  },
  education: {
    degree: "",
    institution: "",
    startYear: "",
    endYear: "",
  },
  languages: {
    language: "",
    proficiencyLevel: ""
  }
}

let workExperienceIndex = 0
let educationIndex = 0
let skillsIndex = 0
let languagesIndex = 0

const renderSidebar = () => {
  let workHtml = "";

  let educationHtml = ""

  let skillsHtml = "";

  let languagesHtml = ""


  for (workItem of resumeData.workExperience) {
    workHtml += `
<div class="section-fields">
  <input
    type="text"
    placeholder="Job Title"
    name="workExperience.${workExperienceIndex}.jobTitle"
    value="${workItem.jobTitle}"
  >
  <input
    type="text"
    placeholder="Company"
    name="workExperience.${workExperienceIndex}.company"
    value="${workItem.company}"
  >
  <div class="date-inputs">
    <input
      type="text"
      placeholder="Start Date (MM/YYYY)"
      name="workExperience.${workExperienceIndex}.startDate"
      value="${workItem.startDate}"
    >
    <input
      type="text"
      placeholder="End Date (MM/YYYY)"
      name="workExperience.${workExperienceIndex}.endDate"
      value="${workItem.endDate}"
    >
  </div>
</div>`;
    workExperienceIndex++;
    if (workExperienceIndex === resumeData.workExperience.length) continue
    workHtml += "<hr>"
  }

  for (educationItem of resumeData.education) {
    educationHtml += `
<div class="section-fields">
  <input
    type="text"
    name="education.${educationIndex}.degree"
    placeholder="Degree"
    value="${educationItem.degree}"
  />
  <input
    type="text"
    name="education.${educationIndex}.institution"
    placeholder="Institution"
    value="${educationItem.institution}"
  />
  <div class="date-inputs">
    <input
      type="text"
      name="education.${educationIndex}.startYear"
      placeholder="Start Year"
      value="${educationItem.startYear}"
    />
    <input
      type="text"
      name="education.${educationIndex}.endYear"
      placeholder="End Year"
      value="${educationItem.endYear}"
    />
  </div>
</div>`;
    educationIndex++;
    if (educationIndex === resumeData.education.length) continue
    educationHtml += "<hr>"
  }

  for (skillItem of resumeData.skills) {
    skillsHtml += `
<div class="section-fields">
  <input
    name="skills.${skillsIndex}"
    type="text"
    placeholder="Skill"
    value="${skillItem}"
  />
</div>`;
    skillsIndex++;
    if (skillsIndex === resumeData.skills.length) continue
    skillsHtml += "<hr>"
  }

  for (languageItem of resumeData.languages) {
    languagesHtml += `
<div class="section-fields">
  <input
    name="languages.${languagesIndex}.language"
    type="text"
    placeholder="Language"
    value="${languageItem.language}"
  />
  <select name="languages.${languagesIndex}.proficiencyLevel">
    <option ${languageItem.proficiencyLevel === "" ? "selected" : ""}>Proficiency Level</option>
    <option ${languageItem.proficiencyLevel === "Native" ? "selected" : ""}>Native</option>
    <option ${languageItem.proficiencyLevel === "Fluent" ? "selected" : ""}>Fluent</option>
    <option ${languageItem.proficiencyLevel === "Intermediate" ? "selected" : ""}>Intermediate</option>
    <option ${languageItem.proficiencyLevel === "Basic" ? "selected" : ""}>Basic</option>
  </select>
</div>`;
    languagesIndex++;
    if (languagesIndex === resumeData.languages.length) continue
    languagesHtml += "<hr>"
  }

  const sidebar = `
<div class="sections">
  <div class="section">
    <div class="section-header">
      <span>Personal Information</span>
      <span class="toggle">+</span>
    </div>
    <div class="section-content">
      <input
        name="personalInformation.fullName"
        type="text"
        placeholder="Full Name"
        value="${resumeData.personalInformation.fullName}"
      />
      <input
        name="personalInformation.jobTitle"
        type="text"
        placeholder="Job Title"
        value="${resumeData.personalInformation.jobTitle}"
      />
      <input
        name="personalInformation.email"
        type="email"
        placeholder="Email"
        value="${resumeData.personalInformation.email}"
      />
      <input
        name="personalInformation.phone"
        value="${resumeData.personalInformation.phone}"
        type="tel"
        placeholder="Phone"
      />
      <textarea
        name="personalInformation.professionalSummary"
        placeholder="Professional Summary"
      >${resumeData.personalInformation.professionalSummary}</textarea>
    </div>
  </div>

  <div class="section">
    <div class="section-header">
      <span>Work Experience</span>
      <span class="toggle">+</span>
    </div>
    <div class="section-content">
      ${workHtml}
      <button class="add-more">+ Add Experience</button>
    </div>
  </div>

  <div class="section">
    <div class="section-header">
      <span>Education</span>
      <span class="toggle">+</span>
    </div>
    <div class="section-content">
      ${educationHtml}
      <button class="add-more">+ Add Education</button>
    </div>
  </div>

  <div class="section">
    <div class="section-header">
      <span>Skills</span>
      <span class="toggle">+</span>
    </div>
    <div class="section-content">
      ${skillsHtml}
      <button class="add-more">+ Add Skill</button>
    </div>
  </div>

  <div class="section">
    <div class="section-header">
      <span>Languages</span>
      <span class="toggle">+</span>
    </div>
    <div class="section-content">
      ${languagesHtml}
      <button class="add-more">+ Add Language</button>
    </div>
  </div>
</div>`
  return sidebar
}

document.addEventListener('DOMContentLoaded', () => {
  // Handle section toggles
  const sections = document.querySelectorAll('.section-header');
  sections.forEach(section => {
    section.addEventListener('click', () => {
      const content = section.nextElementSibling;
      const toggle = section.querySelector('.toggle');

      // Toggle current section
      content.classList.toggle('active');
      toggle.textContent = content.classList.contains('active') ? '-' : '+';
    });
  });

  // Handle add more buttons
  const addButtons = document.querySelectorAll('.add-more');

  addButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionFields = button.parentElement.children[button.parentElement.children.length - 2];
      const newSectionFields = sectionFields.cloneNode(true)
      const children = newSectionFields.querySelectorAll("input, select, textarea")

      children.forEach(e => {
        const name = e.name.split(".")
        e.value = ""
        e.name = `${name[0]}.${parseInt(name[1]) + 1}${name[2] ? `.${name[2]}` : ""}`
      })
      button.parentElement.insertBefore(document.createElement("hr"), button)
      button.parentElement.insertBefore(newSectionFields, button)
      newSectionFields.querySelector("input").focus()

      resumeData[children[0].name.split(".")[0]].push(resumeDataPrototype[children[0].name.split(".")[0]])

      const resume = document.querySelector(".resume-container")
      resume.innerHTML = renderResume(resumeData)
    });
  });
});