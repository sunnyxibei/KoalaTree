document.addEventListener('DOMContentLoaded', () => {
    const koala = document.getElementById('koala');
    const leavesContainer = document.getElementById('leaves-container');
    const scoreDisplay = document.getElementById('score');
    const messageDisplay = document.getElementById('message');
    const gameOverScreen = document.getElementById('game-over-screen');
    const finalScoreDisplay = document.getElementById('final-score');
    const restartBtn = document.getElementById('restart-btn');

    const eatSound = new Audio('eat.mp3');
    const goldSound = new Audio('gold.mp3');

    let score = 0;
    let activeLeaf = null;
    let gameTimer = null;
    const gameDuration = 30000; // 30 seconds

    const leafTypes = ['green', 'yellow', 'red'];
    const leafPositions = [
        { top: '10%', left: '20%' },
        { top: '20%', left: '70%' },
        { top: '30%', left: '40%' },
        { top: '5%', left: '50%' },
        { top: '15%', left: '85%' },
        { top: '25%', left: '10%' },
    ];

    function createLeaves() {
        leavesContainer.innerHTML = '';
        leafPositions.forEach((pos, index) => {
            const leaf = document.createElement('div');
            leaf.classList.add('leaf', leafTypes[index % leafTypes.length]);
            leaf.style.top = pos.top;
            leaf.style.left = pos.left;
            leaf.dataset.index = index;
            leaf.addEventListener('click', () => handleLeafClick(leaf));
            leavesContainer.appendChild(leaf);
        });
    }

    function activateRandomLeaf() {
        if (activeLeaf) {
            activeLeaf.classList.remove('active');
        }
        const leaves = document.querySelectorAll('.leaf:not(.gold)');
        if (leaves.length === 0) return;

        const randomIndex = Math.floor(Math.random() * leaves.length);
        activeLeaf = leaves[randomIndex];
        activeLeaf.classList.add('active');
    }

    function handleLeafClick(leaf) {
        if (leaf !== activeLeaf) return;

        score += 1;
        updateScore();
        showThankYouMessage();
        eatSound.play();

        // Move koala towards the leaf
        const leafRect = leaf.getBoundingClientRect();
        const koalaRect = koala.getBoundingClientRect();
        const gameRect = leavesContainer.getBoundingClientRect();

        const targetX = leafRect.left - gameRect.left + (leafRect.width / 2) - (koalaRect.width / 2);
        koala.style.transform = `translateX(${targetX}px)`;


        leaf.classList.remove('active');
        leaf.style.display = 'none'; // "Eaten"

        if (Math.random() < 0.3) { // 30% chance for a gold leaf
            setTimeout(spawnGoldLeaf, 500);
        } else {
            setTimeout(activateRandomLeaf, 500);
        }
    }

    function spawnGoldLeaf() {
        if (activeLeaf) {
            activeLeaf.classList.remove('active');
        }
        const availableLeaves = Array.from(document.querySelectorAll('.leaf')).filter(l => l.style.display !== 'none');
        if (availableLeaves.length === 0) return;

        const randomLeaf = availableLeaves[Math.floor(Math.random() * availableLeaves.length)];

        const goldLeaf = randomLeaf.cloneNode();
        goldLeaf.className = 'leaf gold';
        goldLeaf.addEventListener('click', handleGoldLeafClick);

        leavesContainer.appendChild(goldLeaf);
        activeLeaf = goldLeaf;
        activeLeaf.classList.add('active');
    }

    function handleGoldLeafClick(event) {
        const goldLeaf = event.target;
        if (goldLeaf !== activeLeaf) return;

        score += 3;
        updateScore();
        showThankYouMessage();
        goldSound.play();

        const leafRect = goldLeaf.getBoundingClientRect();
        const koalaRect = koala.getBoundingClientRect();
        const gameRect = leavesContainer.getBoundingClientRect();

        const targetX = leafRect.left - gameRect.left + (leafRect.width / 2) - (koalaRect.width / 2);
        koala.style.transform = `translateX(${targetX}px)`;

        goldLeaf.remove();
        activeLeaf = null;

        setTimeout(activateRandomLeaf, 500);
    }

    function updateScore() {
        scoreDisplay.textContent = `分数: ${score}`;
    }

    function showThankYouMessage() {
        messageDisplay.textContent = '谢谢你!';
        messageDisplay.style.display = 'block';
        setTimeout(() => {
            messageDisplay.style.display = 'none';
        }, 1000);
    }

    function startGame() {
        score = 0;
        updateScore();
        createLeaves();
        activateRandomLeaf();
        gameOverScreen.classList.add('hidden');
        gameTimer = setTimeout(endGame, gameDuration);
    }

    function endGame() {
        clearTimeout(gameTimer);
        finalScoreDisplay.textContent = score;
        gameOverScreen.classList.remove('hidden');
        if(activeLeaf) {
            activeLeaf.classList.remove('active');
            activeLeaf = null;
        }
    }

    restartBtn.addEventListener('click', startGame);

    startGame();
});
