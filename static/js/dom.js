// It uses data_handler.js to visualize elements
let dom = {

    loadBoards: function () {
        dataHandler.getBoards(this.showBoards);
        // retrieves boards and makes showBoards called
    },

    dragula: function () {

    },


    showBoards: function (boards) {
        let boardCounter = 0;
        for (let board of boards) {

            let newBoard = document.createElement("div");
            newBoard.className = "row bg-dark border border-secondary text-light mb-4";
            newBoard.id = board.id;
            document.getElementById("board").appendChild(newBoard);

            let newTitle = document.createElement("div");
            newTitle.className = "text-light col-10 collapse collapse show";
            newTitle.setAttribute("data-toggle", "collapse");
            newTitle.setAttribute("data-target", ".collapse" + board.id.toString());
            newTitle.innerText = board.title;
            document.getElementById(board.id).appendChild(newTitle);

            let stati = dataHandler.getStatuses();
            for (let status of stati) {
                let statusBar = document.createElement("div");
                statusBar.className = "text-center text-white col-3 collapse" + board.id.toString() + " show";
                statusBar.id = "status" + status.id.toString() + '-' + board['id'].toString();
                statusBar.setAttribute("data-status", status.id);
                statusBar.innerText = status.name;
                document.getElementById(board.id.toString()).appendChild(statusBar);

            }


            let drake = dragula([document.getElementById("status1" + '-' + board.id.toString()),
            document.getElementById("status2" + '-' + board.id.toString()),
            document.getElementById("status3" + '-' + board.id.toString()),
            document.getElementById("status4" + '-' + board.id.toString())]);

            drake.on('drop', drop);

            function drop (el, target) {
                statusId = target.getAttribute("data-status");
                dataHandler.changeCardStatus(el.id, statusId);
            }

            dom.loadCards(board.id);
            boardCounter +=1;


            let statusBlock = document.createElement("div");
            statusBlock.className = "collapse";
            statusBlock.id = "collapse" + board.id.toString();
            statusBlock.innerText = ''; //Open/Close Board
            document.getElementById(board.id).appendChild(statusBlock);



            let addCard = document.createElement("button");
            addCard.innerText = "Add New Card";
            addCard.className = "btn btn-outline-dark text-white col-6";
            document.getElementById(board.id).appendChild(addCard);
            addCard.addEventListener("click", function () {
                let titleOfNewCard = prompt("Please enter the name of the card!", "New Task");
                if (titleOfNewCard != null && titleOfNewCard !== "") {
                    dataHandler.createNewCard(titleOfNewCard, board.id, 1, dom.showCard);
                }
            });

            let newDeleteButton = document.createElement("button");
            newDeleteButton.className = "btn btn-outline-dark text-white col-6";
            newDeleteButton.innerText = "Delete board " + board.id.toString();
            document.getElementById(board.id).appendChild(newDeleteButton);

            newDeleteButton.addEventListener("click", function() {
                dataHandler.deleteBoard(board.id);
                document.getElementById("board").removeChild(document.getElementById(board.id))
            });
        }

        if (document.getElementById("createBoardButton")) {
            document.getElementById("board").removeChild(document.getElementById("createBoardButton"));
        }
        dom.addBoardButton();



        // shows boards appending them to #boards div
        // it adds necessary event listeners also
    },

    addBoardButton: function () {
        const addBoardButton = document.createElement("button");
        addBoardButton.innerText = "Create new board";
        addBoardButton.className = "col-12 btn btn-outline-dark text-white";
        addBoardButton.id = "createBoardButton";
        document.getElementById("board").appendChild(addBoardButton);

        addBoardButton.addEventListener("click", function () {

            let nameOfNewBoard = prompt("Please enter the name of the board!", "Board " + dataHandler.generateId().toString());
            if (nameOfNewBoard != null && nameOfNewBoard !== "") {
                dataHandler.createNewBoard(nameOfNewBoard, dom.showBoards)

            }

        });
    },

    loadCards: function (boardId) {

        dataHandler.getCardsByBoardId(boardId, dom.showCards)
        // retrieves cards and makes showCards called

    },
    showCard: function (oneCard) {
        let card = document.createElement("div");
        card.innerText = oneCard['title'];
        card.id = oneCard.id;
        card.className = "text-center border border-light m-1";
        let cardsStatus = "status" + oneCard['status_id'].toString() + '-' + oneCard['board_id'].toString();
        document.getElementById(cardsStatus).appendChild(card);
    },


    showCards: function (cards) {

        for (let oneCard of cards) {
            dom.showCard(oneCard)
        }
        //let addCard = document.createElement("div");
//        addCard.innerText = "Add New Card";
  //      addCard.className = "text-center col-12 btn";
    //    document.getElementById(idToAppend).appendChild(addCard);
      //  addCard.addEventListener("click", function () {
        //        let titleOfNewCard = prompt("Please enter the name of the card!", "New Task");
          //      if (titleOfNewCard == null || titleOfNewCard === "") {
            //    } else {
              //      dataHandler.createNewCard(titleOfNewCard, boardID + 1, status);
                //    location.reload();
      //          }
       //     }
        //)
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
