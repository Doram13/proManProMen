// It uses data_handler.js to visualize elements
let dom = {

    loadBoards: function () {
        dataHandler.getBoards(this.showBoards);
        dom.drag()
        // retrieves boards and makes showBoards called
    },

    drag: function () {
        let column = document.getElementsByClassName('text-center text-white col-3');
        dragula(column, column)
    },


    showBoards: function (boards) {
        let boardCounter = 0;
        for (let board of boards) {

            let newBoard = document.createElement("div");
            newBoard.className = "row bg-dark border border-secondary text-light mb-4";
            newBoard.id = board.id;
            document.getElementById("board").appendChild(newBoard);

            let newTitle = document.createElement("div");
            newTitle.className = "text-light col-10";
            newTitle.innerText = board.title;
            document.getElementById(board.id).appendChild(newTitle);

            let stati = dataHandler.getStatuses();
            for (let status of stati) {
                let statusBar = document.createElement("div");
                statusBar.className = "'text-center text-white col-3";
                statusBar.id = "status" + status.id.toString() + '-' + board['id'].toString();
                statusBar.innerText = status.name;
                document.getElementById(board.id.toString()).appendChild(statusBar);


            }
            dom.loadCards(board.id);
            boardCounter +=1;


            let statusBlock = document.createElement("div");
            statusBlock.className = "collapse";
            statusBlock.id = "collapse" + board.id.toString();
            statusBlock.innerText = ''; //Open/Close Board
            document.getElementById(board.id).appendChild(statusBlock);

            let newDeleteButton = document.createElement("button");
            newDeleteButton.className = "btn btn-outline-dark text-white col-2";
            newDeleteButton.innerText = "delete";
            document.getElementById(board.id).appendChild(newDeleteButton);

            let addCard = document.createElement("button");
            addCard.innerText = "Add New Card";
            addCard.className = "btn btn-outline-dark text-white";
            document.getElementById(board.id).appendChild(addCard);
            addCard.addEventListener("click", function () {
                let titleOfNewCard = prompt("Please enter the name of the card!", "New Task");
                if (titleOfNewCard != null && titleOfNewCard !== "") {
                    dataHandler.createNewCard(titleOfNewCard, board.id, 1, dom.showCard);


                }
            });

            newDeleteButton.addEventListener("click", function() {
                dataHandler.deleteBoard(board.id);
                document.getElementById("board").removeChild(document.getElementById(board.id))
            });
            statusBlock.addEventListener("click", function() {
                //statusBlock.addClass("collapse")
                //I'm not able to add the "collapse" Class it says: "statusBlock.addClass is not a function"; TODO: solve it for hiding boards
            });
            //dom.loadCards(board.id, dom.showCards())
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
