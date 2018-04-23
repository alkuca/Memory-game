
    const main = document.getElementsByClassName('main-container')[0];
    var openedCards = [];
    var moveCounter = 0;
    var stepCount = 0;
    var winCount = 0;
    const stepSpan = document.getElementsByClassName('moves')[0];
    const restart = document.getElementsByClassName('restart')[0];
    const timer = document.getElementsByClassName('timer')[0];
    const firstStar = document.getElementsByClassName('fa-star')[3];
    const secondStar = document.getElementsByClassName('fa-star')[4];
    const firstStarModal = document.getElementsByClassName('fa-star')[0];
    const secondStarModal = document.getElementsByClassName('fa-star')[1];
    const displayStatus = document.querySelector('.display-status');
    const displayStats = document.querySelector('.display-stats');
    const displayTime = document.querySelector('.display-time');
    const modalStars = document.querySelector('#modal-stars');
    const modal = document.querySelector(".modal");
    const playAgainButton = document.querySelector('.play-again-button');

    const cards = [
        {
            icon: "fa fa-diamond"
        },
        {
            icon: "fa fa-paper-plane-o"
        },
        {
            icon: "fa fa-anchor"
        },
        {
            icon: "fa fa-bolt"
        },
        {
            icon: "fa fa-cube"
        },
        {
            icon: "fa fa-bomb"
        },
        {
            icon: "fa fa-leaf"
        },
        {
            icon: "fa fa-bicycle"
        }
    ];

    const allCards = cards.concat(cards);

    createGame();

    function createCards() {
        measuring();
        const ul = document.createElement('ul');
        ul.setAttribute("class", "deck");

        for (var i = 0, x = allCards.length; i < x; i++) {
            const li = document.createElement('li');
            li.setAttribute("class", "card");
            ul.appendChild(li);

            const item = document.createElement('i');
            item.setAttribute("class",allCards[i].icon);
            li.appendChild(item);

        }
        main.appendChild(ul);
    }


// Shuffle function from http://stackoverflow.com/a/2450976
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    main.addEventListener('click', revealCard);

    const card = document.querySelectorAll('.card');


    function revealCard (event) {
        if (event.target.classList.contains('card')) {
            moveCounter ++;
            event.target.classList.toggle('open');
            event.target.classList.toggle('show');
            event.target.classList.toggle('pointer-none');
            openedCards.push(event.target);



            if(moveCounter === 2){
                stepCounter();
                starRating();
                toggleNoClicking();
                if ( checkCards() === true) {
                        openedCards[0].classList.add("open", "show");
                        openedCards[1].classList.add("open", "show");
                        winCount += 1;

                        if(winCount === 8){
                            gameWon();
                        }



                } else if (checkCards() === false) {
                    setTimeout(hideCards,500);
                    openedCards[0].classList.toggle("pointer-none");
                    openedCards[1].classList.toggle("pointer-none");

                }
                setTimeout(popCards,501);
                moveCounter = 0;
                toggleClicking();




            }
        }
    }



    function checkCards() {
        if(openedCards[0].firstElementChild.classList.value === openedCards[1].firstElementChild.classList.value){
            return true;
        } else {
            return false;
        }
    }

    function hideCards(){
        openedCards[0].classList.remove("open", "show");
        openedCards[1].classList.remove("open", "show");
    }

    function popCards(){
        openedCards.pop();
        openedCards.pop();
    }


    function toggleNoClicking(){
        main.classList.toggle('pointer-none');
    }

    function toggleClicking(){
        setTimeout(function(){main.classList.toggle('pointer-none')},300)
    }

    function stepCounter(){
        stepCount += 1;
        stepSpan.textContent = stepCount;
    }

    restart.addEventListener('click', function() {
        resetGame();
        createGame();
        resetTime();
    });

    function readyCards(){
        shuffle(allCards);
    }

    function resetMovesCounter(){
        stepCount = 0;
    }

    function removeCards (){
        while(main.firstChild){
            main.removeChild(main.firstChild)
        }
    }

    function resetGame(){
        resetMovesCounter();
        removeCards();
        openedCards = [];
        moveCounter = 0;
        resetStars();
        stepSpan.textContent = stepCount;
        winCount=0;
    }

    function createGame(){
        readyCards();
        createCards();
    }

    function starRating(){
        if (stepCount === 25){
            firstStar.style.visibility ="hidden";
            firstStarModal.style.visibility ="hidden";
        }
        if (stepCount === 35){
            secondStar.style.visibility ="hidden";
            secondStarModal.style.visibility ="hidden";
        }
    }

    function resetStars(){
        firstStar.style.visibility = "visible";
        secondStar.style.visibility = "visible";
    }

    function gameWon(){
        modal.classList.remove("hidden");
        displayStatus.textContent = "Congratulations, you won!";
        displayStats.textContent = "it took you " + stepCount + " moves,";
        displayTime.textContent ="and " + timeElapsed + " seconds";
        modalStars.style.display="block";
    }

    function playAgain(){
        resetGame();
        modal.classList.add("hidden");
        createGame();
        stepSpan.textContent = stepCount;
        winCount = 0;
        modalStars.style.display="none";
        resetTime();
    }

    playAgainButton.addEventListener("click",playAgain);

    var timeElapsed ;
    var time = 0;
    var timeInterval = setInterval(measuring, 1000);

    function measuring(){
            timeElapsed = time;
            timer.textContent = time;
            time ++;
    }

    function resetTime(){
        time = 0;
    }