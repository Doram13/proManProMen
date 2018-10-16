// It uses data_handler.js to visualize elements
let dom = {

    loadBoards: function () {
        let loadedBoards = dataHandler.getBoards();
        return loadedBoards
        // retrieves boards and makes showBoards called
    },

    showBoards: function (boards, statuses) {


        for (let i = 0; i < boards.length ; i++) {

            let new_board = document.createElement("div");
            new_board.className = "box row mb-4"; //data-toggle=\"collapse\" data-target=\"statuses\"";
            new_board.id = boards[i]['id'];
            document.getElementById("container").appendChild(new_board);
            new_board.addEventListener("click", function () {
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
            });

            //let newId = document.createElement("div");
            //newId.innerText = boards[i]['id'];
            //document.getElementById(i).appendChild(newId);

            let newTitle = document.createElement("div");
            newTitle.innerText = boards[i]['title'];
            newTitle.className='header col-12';
            document.getElementById(i+1).appendChild(newTitle);


            for (let j = 0; j < statuses.length  ; j++) {
                let new_status = document.createElement("div");
                new_status.innerText=statuses[j]['name'];
                new_status.className='statuses';
//                new_status.id='statuses';
                document.getElementById(i+1).appendChild(new_status)
            }



            //let newState = document.createElement("div");
            //newState.innerText = boards[i]['is_active'];
            //document.getElementById(i).appendChild(newState);





        }

        // shows boards appending them to #boards div
        // it adds necessary event listeners also
    },

    setupCreateBoard: function(){

        const addBoardButton = document.createElement("div");
        addBoardButton.innerText = "Create new board";
        document.body.appendChild(addBoardButton);
        addBoardButton.addEventListener("click", function () {
           let nameOfNewBoard = prompt("Please enter the name of the board!", "New board");
            dataHandler.createNewBoard(nameOfNewBoard);
            location.reload()
        });
    },

    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
    },

    showCards: function (cards) {
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
