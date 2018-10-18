// It uses data_handler.js to visualize elements
let dom = {

    loadBoards: function () {
        let loadedBoards = dataHandler.getBoards();
        return loadedBoards
        // retrieves boards and makes showBoards called
    },

    showBoards: function (boards, statuses) {


        for (let i = 0; i < boards.length ; i++) {

            let board = document.createElement("div");
            board.className = "bg-dark border border-secondary row mb-4";
            board.id = boards[i]['id'];

            document.getElementById("container").appendChild(board);

           /* board.addEventListener("click", function () {
                if (boards[i]["is_active"] === true){
                    boards[i]["is_active"] = false;
                    location.reload()
                }
                else{
                    boards[i]["is_active"] = true;
                    location.reload()
                }

                this.innerText = "clicked";
                dataHandler._saveData()
            });*/

            //let newId = document.createElement("div");
            //newId.innerText = boards[i]['id'];
            //document.getElementById(i).appendChild(newId);

            let newTitle = document.createElement("div");
            newTitle.innerText = boards[i]['title'];
            newTitle.className='text-warning header col-12 panel-collapse collapse show';
            newTitle.setAttribute("data-toggle", "collapse");
            newTitle.setAttribute("data-target", ".collapse" + i.toString());
            document.getElementById(i+1).appendChild(newTitle);


            for (let j = 0; j < statuses.length  ; j++) {
                let new_status = document.createElement("div");
                new_status.innerText=statuses[j]['name'];
                new_status.className='text-center text-white col-3 collapse collapse' + i.toString() + " show";
                new_status.id='statuses' + i.toString() + j.toString();
                document.getElementById(i+1).appendChild(new_status);
                dom.showCards(dom.loadCards(i + 1), j + 1, 'statuses' + i.toString() +j.toString(), i);

                dragula([document.getElementById('statuses' + i.toString() + j.toString()),
                    document.getElementById('statuses' + i.toString() + j.toString())]);


            }

        }

        // shows boards appending them to #boards div
        // it adds necessary event listeners also
    },

    setupCreateBoard: function(){

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
        for (let i = 0; i <cards.length ; i++) {
            let card = document.createElement("div");
            card.innerText = cards[i]['title'];
            card.className = "text-center border border-light m-1";

            card.setAttribute("data-order", cards[i]['order']);
            if (cards[i]['status_id'] === status){
                document.getElementById(idToAppend).appendChild(card);
            }
        }
        let addCardButton = document.createElement("div");
        addCardButton.innerText = "Add New Card";
        addCardButton.className = "text-center col-12 btn";
        document.getElementById(idToAppend).appendChild(addCardButton);
        addCardButton.addEventListener("click", function () {
            let titleOfNewCard = prompt("Please enter the name of the card!", "New Task");
            if (titleOfNewCard == null || titleOfNewCard === "") {
            } else {
                dataHandler.createNewCard(titleOfNewCard, boardID+1, status);
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
