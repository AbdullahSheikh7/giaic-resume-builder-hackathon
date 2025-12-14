const storedData = JSON.parse(localStorage.getItem("resumeData"));

let resumeData;

const toQueryString = (obj) => {
  // const query = []
  // for (key in obj) {
  //   if (Array.isArray(obj[key])) {
  //     let i = 0;
  //     for (item of obj[key]) {
  //       query.push(`${encodeURIComponent(key)}-${i}=${encodeURIComponent(JSON.stringify(item))}`)
  //       i++
  //     }
  //   } else {
  //     for (subkey in obj[key]) {
  //       query.push(`${encodeURIComponent(subkey)}=${encodeURIComponent(obj[key][subkey])}`)
  //     }
  //   }
  // }
  // return `${window.location.origin}/resume.html?${query.join("&")}`;
  return `${
    window.location.origin
  }/app/resume.html?resumeData=${encodeURIComponent(JSON.stringify(obj))}`;
};

if (storedData) {
  resumeData = storedData;
} else {
  resumeData = {
    personalInformation: {
      fullName: "",
      jobTitle: "",
      email: "",
      phone: "",
      professionalSummary: "",
    },
    workExperience: [
      {
        jobTitle: "",
        company: "",
        startDate: "",
        endDate: "",
      },
    ],
    education: [
      {
        degree: "",
        institution: "",
        startYear: "",
        endYear: "",
      },
    ],
    skills: [""],
    languages: [
      {
        language: "",
        proficiencyLevel: "",
      },
    ],
  };
}

/* const renderResume = () => {
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
} */

document.addEventListener("DOMContentLoaded", () => {
  const resume = document.querySelector(".resume-container");
  const shareLink = document.getElementById("share-link");

  resume.innerHTML = renderResume(resumeData);
  document.querySelector(".sidebar").innerHTML = renderSidebar();
  shareLink.value = toQueryString(resumeData);

  const sidebar = document.querySelector(".sidebar .sections");

  sidebar.querySelector("select").addEventListener("change", (e) => {
    shareLink.value = toQueryString(resumeData);

    resumeData.languages[e.target.name.split(".")[1]].proficiencyLevel =
      e.target.value;
    resume.innerHTML = renderResume(resumeData);
  });

  sidebar.addEventListener("input", (e) => {
    shareLink.value = toQueryString(resumeData);

    const address = e.target.name.split(".");

    if (address.length === 2) {
      const [section, field] = address;
      resumeData[section][field] = e.target.value;
      resume.innerHTML = renderResume(resumeData);
    } else if (address.length === 3) {
      const [section, index, field] = address;
      resumeData[section][index][field] = e.target.value;
      resume.innerHTML = renderResume(resumeData);
    }
  });

  const btnDownload = document.getElementById("download-resume");
  btnDownload.addEventListener("click", (e) => {
    const element = document.getElementById("resume");
    html2pdf(element, { filename: "resume.pdf" });
  });
});
