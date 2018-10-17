// It uses data_handler.js to visualize elements
let dom = {

    loadBoards: function () {
        dataHandler.getBoards(this.showBoards)
        // retrieves boards and makes showBoards called
    },

    showBoards: function (boards) {

        for (let board of boards) {

            let newBoard = document.createElement("div");
            newBoard.className = "bg-dark border border-secondary text-light mb-4";
            newBoard.id = board.id;
            document.getElementById("board").appendChild(newBoard);

            let newTitle = document.createElement("div");
            newTitle.className = "text-light";
            newTitle.innerText = board.title;
            document.getElementById(board.id).appendChild(newTitle);

        }

        // shows boards appending them to #boards div
        // it adds necessary event listeners also
    },

    setupCreateBoard: function () {

        const addBoardButton = document.createElement("button");
        addBoardButton.innerText = "Create new board";
        addBoardButton.className = "col-12 btn btn-outline-dark text-white";
        document.getElementById("container").appendChild(addBoardButton);

        addBoardButton.addEventListener("click", function () {

            let nameOfNewBoard = prompt("Please enter the name of the board!", "New board");
            if (nameOfNewBoard == null || nameOfNewBoard == "") {
            } else {
                dataHandler.createNewBoard(nameOfNewBoard);
                location.reload();
            }

        });
    },

    loadCards: function (boardId) {
        let loadedCards = dataHandler.getCardsByBoardId(boardId);
        return loadedCards
        // retrieves cards and makes showCards called
    },

    showCards: function (cards, status, idToAppend, boardID) {
        for (let i = 0; i < cards.length; i++) {
            let card = document.createElement("div");
            card.innerText = cards[i]['title'];
            card.className = "text-center border border-light m-1";
            if (cards[i]['status_id'] === status) {
                document.getElementById(idToAppend).appendChild(card);
            }
        }
        let addCard = document.createElement("div");
        addCard.innerText = "Add New Card";
        addCard.className = "text-center col-12 btn";
        document.getElementById(idToAppend).appendChild(addCard);
        addCard.addEventListener("click", function () {
                let titleOfNewCard = prompt("Please enter the name of the card!", "New Task");
                if (titleOfNewCard == null || titleOfNewCard === "") {
                } else {
                    dataHandler.createNewCard(titleOfNewCard, boardID + 1, status);
                    location.reload();
                }
            }
        )
        // shows the cards of a board
        // it adds necessary event listeners al so
    },

    appendToElement: function (elementToExtend, textToAppend, prepend = false) {
        // function to append new DOM elements (represented by a string) to an existing DOM element
        let fakeDiv = document.createElement('div');
        fakeDiv.innerHTML = textToAppend.trim();

        for (childNode of fakeDiv.childNodes) {
            if (prepend) {
                elementToExtend.prependChild(childNode);
            } else {
                elementToExtend.appendChild(childNode);
            }
        }

        return elementToExtend.lastChild;
    }
    // here comes more features
};
