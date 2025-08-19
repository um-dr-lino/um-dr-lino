document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusText = document.getElementById('status');
    const restartBtn = document.getElementById('restart-btn');

    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let isGameActive = true;

    // Condições de vitória
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Função para tratar o clique na célula
    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        // Se a célula já foi preenchida ou o jogo acabou, não faz nada
        if (gameState[clickedCellIndex] !== '' || !isGameActive) {
            return;
        }

        // Atualiza o estado e a interface
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;
        clickedCell.classList.add(currentPlayer.toLowerCase());

        // Verifica se há um vencedor ou empate
        checkResult();
    }

    // Função para verificar o resultado do jogo
    function checkResult() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];

            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusText.innerHTML = `O jogador ${currentPlayer} venceu!`;
            isGameActive = false;
            return;
        }

        // Verifica se houve empate
        let roundDraw = !gameState.includes('');
        if (roundDraw) {
            statusText.innerHTML = `Empate!`;
            isGameActive = false;
            return;
        }

        // Alterna o jogador
        changePlayer();
    }

    // Função para alternar entre os jogadores
    function changePlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.innerHTML = `É a vez do jogador ${currentPlayer}`;
    }

    // Função para reiniciar o jogo
    function restartGame() {
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        statusText.innerHTML = `É a vez do jogador ${currentPlayer}`;
        cells.forEach(cell => {
            cell.innerHTML = '';
            cell.classList.remove('x', 'o');
        });
    }

    // Adiciona os event listeners
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartBtn.addEventListener('click', restartGame);
});