// this object contains the functions which handle the data and its reading/writing
// feel free to extend and change to fit your needs

// (watch out: when you would like to use a property/function of an object from the
// object itself then you must use the 'this' keyword before. For example: 'this._data' below)

let dataHandler = {
    keyInLocalStorage: 'proman-data', // the string that you use as a key in localStorage to save your application data

    _data: {

    }, // it contains the boards and their cards and statuses. It is not called from outside.

    _loadData: function () {

        let read = localStorage.getItem("proman-data");
        this._data = JSON.parse(read);


        // it is not called from outside
        // loads data from local storage, parses it and put into this._data property
    },
    _saveData: function () {


        localStorage.setItem("proman-data", JSON.stringify(this._data));

        // it is not called from outside
        // saves the data from this._data to local storage
    },
    _deleteData: function() {



    },

    init: function () {
        this._loadData();
        //this.getBoards();

    },

    getBoards: function (callback) {
        let boards = this._data['boards'];
        return boards;

        // the boards are retrieved and then the callback function is called with the boards
    },

    getBoard: function (boardId, callback) {
        let board = this._data['boards'];

        for (let i = 0; i < board.length ; i++) {
            let board_data = board[i];
            console.log(board_data);

        }
        return board;
        // the board is retrieved and then the callback function is called with the board
    },



    getStatuses: function (callback) {
        let statuses = this._data['statuses']
        return statuses
        // the statuses are retrieved and then the callback function is called with the statuses
    },

    getStatus: function (statusId, callback) {
        //let status = this._data['statuses']
    },



    getCardsByBoardId: function (boardId, callback) {
        let cards = this._data['cards'];

        let cardsOfSpecificBoard = [];

        for (let i = 0; i < cards.length ; i++) {
            let card = cards[i];
            if (card['board_id'] === boardId ) {
                cardsOfSpecificBoard.push(card)
            }
        }
        cardsOfSpecificBoard = cardsOfSpecificBoard.sort(function(a,b){
            return a.order-b.order
        });
        return cardsOfSpecificBoard
        // the cards are retrieved and then the callback function is called with the cards
    },

    getCard: function (cardId) {
        let cards = this._data['cards'];

        for (let i = 0; i < cards.length ; i++) {
            let card = cards[i];
            if (card['id'] == cardId ) {
                return card
            }
        }

        // the card is retrieved and then the callback function is called with the card
    },



    createNewBoard: function (boardTitle, callback) {
        let id = this._data["boards"].length + 1;
        let newBoard =         {
            "id": id,
            "title": boardTitle,
            "is_active": true
        };
        this._data['boards'].push(newBoard);
        this._saveData()

        // creates new board, saves it and calls the callback function with its data
    },

    createNewCard: function (cardTitle, boardId, statusId, callback) {
        let id = this._data["cards"].length + 1;
        let newCard = {
            "id": id,
            "title": cardTitle,
            "board_id": boardId,
            "status_id": statusId,

            "order": 0
        };
        this._data['cards'].push(newCard);
        this._saveData();

        // creates new card, saves it and calls the callback function with its data
    },

    saveDragData: function (board) {
        let cardsToSave = document.getElementById(board.id).getElementsByClassName('task');

        for (let i = 0; i < cardsToSave.length; i++) {
            let card = cardsToSave[i];
            let dbId = card.dataset.cardId;
            let dbCard = this.getCard(dbId);
            dbCard.order = i;
            this._saveData();
        }


    }
    // here comes more features
};
