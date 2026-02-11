let subjects = [];

function addScore() {
  const scoreInput = document.getElementById('score');
  const creditInput = document.getElementById('credit');
  
  const score = parseFloat(scoreInput.value);
  const credit = parseFloat(creditInput.value);

  if (isNaN(score) || isNaN(credit) || score < 0 || score > 100 || credit <= 0) {
    alert('Zəhmət olmasa bal (0-100) və krediti düzgün daxil edin!');
    return;
  }

  const grade = getGrade(score);
  subjects.push({ score, credit, grade });

  renderSubjects();
  clearInputs();
  calculateAverage();
}

function getGrade(score) {
  if (score >= 91) return 'A';
  if (score >= 81) return 'B';
  if (score >= 71) return 'C';
  if (score >= 61) return 'D';
  if (score >= 51) return 'E';
  return 'F';
}

function renderSubjects() {
  const list = document.getElementById('subjects-list');
  list.innerHTML = '';

  subjects.forEach((sub, index) => {
    const item = document.createElement('div');
    item.className = 'item';
    // DÜZƏLİŞ: Burada ${} istifadə olunmalıdır
    item.innerHTML = `
      <span>Bal: <strong>${sub.score}</strong> – Kredit: <strong>${sub.credit}</strong> → <strong>${sub.grade}</strong></span>
      <button class="delete-btn" onclick="deleteSubject(${index})">✕</button>
    `;
    list.appendChild(item);
  });
}

function deleteSubject(index) {
  subjects.splice(index, 1);
  renderSubjects();
  calculateAverage();
}

function clearInputs() {
  document.getElementById('score').value = '';
  document.getElementById('credit').value = '';
  document.getElementById('score').focus();
}

function calculateAverage() {
  if (subjects.length === 0) {
    document.getElementById('average').textContent = '0.00';
    document.getElementById('totalCredit').textContent = '0';
    return;
  }

  let totalPoints = 0;
  let totalCredits = 0;

  subjects.forEach(sub => {
    totalPoints += sub.score * sub.credit;
    totalCredits += sub.credit;
  });

  const average = totalPoints / totalCredits;
  document.getElementById('average').textContent = average.toFixed(2);
  document.getElementById('totalCredit').textContent = totalCredits;
}

// Particles fonunun işə düşməsi
particlesJS('particles-js', {
  particles: {
    number: { value: 60, density: { enable: true, value_area: 800 } },
    color: { value: '#a855f7' },
    shape: { type: 'circle' },
    opacity: { value: 0.3, random: true },
    size: { value: 3, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#a855f7',
      opacity: 0.2,
      width: 1
    },
    move: {
      enable: true,
      speed: 1.5,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: { enable: true, mode: 'repulse' },
      onclick: { enable: true, mode: 'push' },
      resize: true
    }
  },
  retina_detect: true
});
