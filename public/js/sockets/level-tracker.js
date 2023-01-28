const { socket } = window;

const progressBar = document.querySelector('.level-tracker-progress');
const levelStage = document.querySelector('.level-stage');
const levelCurrentXP = document.querySelector('.level-current-experience');
const levelMinXP = document.querySelector('.level-min-experience');

let currentStage = 1;
let currentProgress = 0;
let currentMinimumExperience = levelMinXP.innerText;

socket.on('update-level-info', async ({ experience, minimumExperience, progress, stage }) => {
    if(stage > currentStage) {
        levelCurrentXP.innerText = currentMinimumExperience;
        await moveProgressBarTransition(100);
        progressBar.style.width = '0%';
    }

    currentMinimumExperience = minimumExperience;

    levelCurrentXP.innerText = experience;
    levelMinXP.innerText = minimumExperience;
    levelStage.innerText = stage;

    currentStage = stage;
    setTimeout(async () => {
        await moveProgressBarTransition(progress);
    }, 100)
});

function moveProgressBarTransition(percentage) {
    return new Promise(resolve => {
        progressBar.classList.add('transition');
        progressBar.style.width = percentage + '%';

        progressBar.addEventListener('transitionend', () => {
            progressBar.classList.remove('transition');
            progressBar.removeEventListener('transitionend', this);
            resolve(true);
        })
    })
} 

