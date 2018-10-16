// It uses data_handler.js to visualize elements
let dom = {

    loadBoards: function () {
        let loadedBoards = dataHandler.getBoards();
        return loadedBoards
        // retrieves boards and makes showBoards called
    },

    showBoards: function (boards) {


        for (let i = 0; i < boards.length ; i++) {

            let new_board = document.createElement("div");
            new_board.className = "box" ;
            new_board.id = [i];
            document.getElementById("container").appendChild(new_board);


            let newId = document.createElement("div");
            newId.innerText = boards[i]['id'];
            document.getElementById(i).appendChild(newId);

            let newTitle = document.createElement("div");
            newTitle.innerText = boards[i]['title'];
            document.getElementById(i).appendChild(newTitle);

            let newState = document.createElement("div");
            newState.innerText = boards[i]['is_active'];
            document.getElementById(i).appendChild(newState);





        }

        // shows boards appending them to #boards div
        // it adds necessary event listeners also
    },



    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
    },

    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
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
