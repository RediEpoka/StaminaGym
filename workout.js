 
document.getElementById('form-bmi').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const weight = parseFloat(document.getElementById('weight').value);
    const heightCm = parseFloat(document.getElementById('height').value);
    
    if (!weight || !heightCm) {
        document.getElementById('result').innerHTML = 'Please enter valid numbers.';
        return;
    }
    
    const heightM = heightCm / 100;
    const bmi = weight / (heightM * heightM);
    
    let category = '';
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 25) category = 'Normal weight';
    else if (bmi < 30) category = 'Overweight';
    else category = 'Obese';
    
    document.getElementById('result').innerHTML = `
        <strong>Your BMI:</strong> ${bmi.toFixed(1)}<br>
        <strong>Category:</strong> ${category}
    `;
});

 
document.getElementById('form-1rm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const weight = parseFloat(document.getElementById('rm-weight').value);
    const reps = parseFloat(document.getElementById('reps').value);
    
    if (!weight || !reps) {
        document.getElementById('result-1rm').innerHTML = 'Please enter valid numbers.';
        return;
    }
    
    const oneRM = weight * (1 + reps / 30);
    
    document.getElementById('result-1rm').innerHTML = `
        <strong>Your 1RM:</strong> ${Math.round(oneRM)} kg
    `;
});

 
document.getElementById('form-clorie').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const age = parseFloat(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('cal-weight').value);
    const height = parseFloat(document.getElementById('cal-height').value);
    const activityLevel = document.getElementById('activity-level').value.toLowerCase();
    const goal = document.getElementById('goal').value.toLowerCase();
    
    if (!age || !weight || !height) {
        document.getElementById('result-calc').innerHTML = 'Please enter valid numbers.';
        return;
    }
    
    
    let bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    
    let multiplier = 1.2;
    if (activityLevel.includes('weekly')) multiplier = 1.375;
    if (activityLevel.includes('monthly')) multiplier = 1.2;
    
    let calories = bmr * multiplier;
    
    if (goal.includes('lose')) calories -= 500;
    else if (goal.includes('gain')) calories += 500;
    
    document.getElementById('result-calc').innerHTML = `
        <strong>Daily Calories:</strong> ${Math.round(calories)} kcal<br>
        <strong>Protein:</strong> ${Math.round(calories * 0.3 / 4)}g<br>
        <strong>Carbs:</strong> ${Math.round(calories * 0.4 / 4)}g<br>
        <strong>Fats:</strong> ${Math.round(calories * 0.3 / 9)}g
    `;
});

 
let exerciseData = [];

fetch('./data/exercises.json')
    .then(response => response.json())
    .then(data => {
        exerciseData = data;
        displayExercises(exerciseData);
    })
    .catch(error => {
        document.getElementById('library-container').innerHTML = 
            '<p>Error loading exercises. Make sure exercises.json is in the data folder.</p>';
        console.error('Error:', error);
    });

function displayExercises(exercises) {
    const container = document.getElementById('library-container');
    
    if (!exercises || exercises.length === 0) {
        container.innerHTML = '<p>No exercises found.</p>';
        return;
    }
    
    let html = '';
    const exercisesToShow = exercises.slice(0, 20);
    
    exercisesToShow.forEach(exercise => {
        const muscle = exercise.primaryMuscles ? exercise.primaryMuscles[0] : 'General';
        html += `
            <div style="padding: 10px; margin-bottom: 8px; background: var(--color-bg); border-radius: 6px; border-left: 3px solid var(--color-accent);">
                <strong style="color: var(--color-contrast);">${exercise.name}</strong><br>
                <small style="color: var(--color-accent);">${muscle}</small>
            </div>
        `;
    });
    
    if (exercises.length > 20) {
        html += `<p style="margin-top: 10px; text-align: center;">Showing 20 of ${exercises.length} exercises</p>`;
    }
    
    container.innerHTML = html;
}

function filterExercises() {
    const muscle = document.getElementById('muscle-filter').value;
    const search = document.getElementById('exercise-search').value.toLowerCase();
    
    let filtered = exerciseData;
    
    if (muscle) {
        filtered = filtered.filter(ex => 
            ex.primaryMuscles && ex.primaryMuscles.some(m => m.toLowerCase().includes(muscle))
        );
    }
    
    if (search) {
        filtered = filtered.filter(ex => 
            ex.name.toLowerCase().includes(search)
        );
    }
    
    displayExercises(filtered);
}

document.getElementById('muscle-filter').addEventListener('change', filterExercises);
document.getElementById('exercise-search').addEventListener('input', filterExercises);
 
document.getElementById('generate-plan-btn').addEventListener('click', function() {
    const muscle = document.getElementById('muscle-select').value;
    
    if (!muscle) {
        alert('Please select a muscle group.');
        return;
    }
    
    let filtered = exerciseData.filter(ex => 
        ex.primaryMuscles && ex.primaryMuscles.some(m => m.toLowerCase().includes(muscle))
    );
    
    if (filtered.length === 0) {
        document.getElementById('plan-display').innerHTML = '<p>No exercises found for this muscle group.</p>';
        return;
    }
    
    const selected = [];
    const numberOfExercises = Math.min(5, filtered.length);
    
    for (let i = 0; i < numberOfExercises; i++) {
        const randomIndex = Math.floor(Math.random() * filtered.length);
        selected.push(filtered[randomIndex]);
        filtered.splice(randomIndex, 1);
    }
    
    let html = '<ul style="list-style: none; padding: 0;">';
    selected.forEach(ex => {
        html += `
            <li style="padding: 12px; margin-bottom: 10px; background: var(--color-bg); border-radius: 6px; border-left: 3px solid var(--color-accent);">
                <strong style="color: var(--color-contrast);">${ex.name}</strong><br>
                <small style="color: var(--color-text);">3 sets × 10 reps | 60s rest</small>
            </li>
        `;
    });
    html += '</ul>';
    
    document.getElementById('plan-display').innerHTML = html;
    document.getElementById('plan-actions').style.display = 'block';
});

document.getElementById('save-generated-plan-btn').addEventListener('click', function() {
    const planName = document.getElementById('plan-name-input').value || 'My Workout';
    const planContent = document.getElementById('plan-display').innerHTML;
    
    let savedPlans = JSON.parse(localStorage.getItem('workoutPlans')) || [];
    savedPlans.push({ 
        name: planName, 
        content: planContent, 
        date: new Date().toLocaleDateString() 
    });
    localStorage.setItem('workoutPlans', JSON.stringify(savedPlans));
    
    displaySavedPlans();
    alert('Plan saved!');
});

function displaySavedPlans() {
    const savedPlans = JSON.parse(localStorage.getItem('workoutPlans')) || [];
    const container = document.getElementById('saved-plans-list');
    
    if (savedPlans.length === 0) {
        container.innerHTML = '<p>No saved plans yet.</p>';
        return;
    }
    
    let html = '';
    savedPlans.forEach((plan, index) => {
        html += `
            <div style="padding: 10px; margin-bottom: 10px; background: var(--color-bg); border-radius: 6px;">
                <strong style="color: var(--color-contrast);">${plan.name}</strong> 
                <small style="color: var(--color-text);">(${plan.date})</small><br>
                <button onclick="loadPlan(${index})" style="padding: 5px 15px; margin-top: 8px; margin-right: 5px;">Load</button>
                <button onclick="deletePlan(${index})" style="padding: 5px 15px; margin-top: 8px; background: #c13838;">Delete</button>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function loadPlan(index) {
    const savedPlans = JSON.parse(localStorage.getItem('workoutPlans')) || [];
    const plan = savedPlans[index];
    document.getElementById('plan-display').innerHTML = plan.content;
    document.getElementById('plan-actions').style.display = 'block';
}

function deletePlan(index) {
    let savedPlans = JSON.parse(localStorage.getItem('workoutPlans')) || [];
    savedPlans.splice(index, 1);
    localStorage.setItem('workoutPlans', JSON.stringify(savedPlans));
    displaySavedPlans();
}

displaySavedPlans();

 
let timerInterval;
let timerSeconds = 60;
let isRunning = false;

document.getElementById('timer-start').addEventListener('click', function() {
    if (isRunning) return;
    
    const minutes = parseInt(document.getElementById('timer-minutes').value) || 0;
    const seconds = parseInt(document.getElementById('timer-seconds').value) || 0;
    timerSeconds = minutes * 60 + seconds;
    
    if (timerSeconds <= 0) return;
    
    isRunning = true;
    timerInterval = setInterval(function() {
        if (timerSeconds <= 0) {
            clearInterval(timerInterval);
            isRunning = false;
            alert('Time is up!');
            return;
        }
        
        timerSeconds--;
        updateTimerDisplay();
    }, 1000);
});

document.getElementById('timer-pause').addEventListener('click', function() {
    clearInterval(timerInterval);
    isRunning = false;
});

document.getElementById('timer-reset').addEventListener('click', function() {
    clearInterval(timerInterval);
    isRunning = false;
    const minutes = parseInt(document.getElementById('timer-minutes').value) || 0;
    const seconds = parseInt(document.getElementById('timer-seconds').value) || 0;
    timerSeconds = minutes * 60 + seconds;
    updateTimerDisplay();
});

function updateTimerDisplay() {
    const mins = Math.floor(timerSeconds / 60);
    const secs = timerSeconds % 60;
    document.getElementById('timer-display').textContent = 
        `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

document.querySelectorAll('.preset').forEach(btn => {
    btn.addEventListener('click', function() {
        const mins = parseInt(this.dataset.minutes);
        const secs = parseInt(this.dataset.seconds);
        document.getElementById('timer-minutes').value = mins;
        document.getElementById('timer-seconds').value = secs;
        timerSeconds = mins * 60 + secs;
        updateTimerDisplay();
    });
});

updateTimerDisplay();
 
let progressChart;
let progressData = JSON.parse(localStorage.getItem('staminaGymProgress')) || {
    weight: [],
    chest: [],
    waist: [],
    arms: []
};

const ctx = document.getElementById('progress-chart').getContext('2d');

function updateChart() {
    const type = document.getElementById('progress-type').value;
    const data = progressData[type] || [];
    
    const labels = data.map((entry, i) => `Entry ${i + 1}`);
    const values = data.map(entry => entry.value);
    
    if (progressChart) {
        progressChart.destroy();
    }
    
    progressChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: type.charAt(0).toUpperCase() + type.slice(1),
                data: values,
                borderColor: '#1387c1',
                backgroundColor: 'rgba(19, 135, 193, 0.1)',
                tension: 0.1,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { 
                    beginAtZero: false,
                    grid: { color: '#333' },
                    ticks: { color: '#e7f2f7' }
                },
                x: {
                    grid: { color: '#333' },
                    ticks: { color: '#e7f2f7' }
                }
            },
            plugins: {
                legend: { labels: { color: '#e7f2f7' } }
            }
        }
    });
}

document.getElementById('add-progress-btn').addEventListener('click', function() {
    const type = document.getElementById('progress-type').value;
    const value = parseFloat(document.getElementById('progress-value').value);
    
    if (isNaN(value)) {
        alert('Please enter a valid number.');
        return;
    }
    
    progressData[type].push({ 
        value: value, 
        date: new Date().toLocaleDateString() 
    });
    
    localStorage.setItem('staminaGymProgress', JSON.stringify(progressData));
    updateChart();
    document.getElementById('progress-value').value = '';
});

document.getElementById('progress-type').addEventListener('change', updateChart);

updateChart();
 
console.log('StaminaGym Workout Page Loaded');