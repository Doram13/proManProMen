// this object contains the functions which handle the data and its reading/writing
// feel free to extend and change to fit your needs

// (watch out: when you would like to use a property/function of an object from the
// object itself then you must use the 'this' keyword before. For example: 'this._data' below)

let dataHandler = {
    keyInLocalStorage: 'proman-data', // the string that you use as a key in localStorage to save your application data

    _data: {
        "statuses": [
        {
            "id": 1,
            "name": "New"
        },
        {
            "id": 2,
            "name": "In progress"
        },
        {
            "id": 3,
            "name": "Testing"
        },
        {
            "id": 4,
            "name": "Done"
        }
    ],
    "boards": [
        {
            "id": 1,
            "title": "Test Board 1",
            "is_active": true
        },

        {
            "id": 2,
            "title": "Test Board 2",
            "is_active": true
        }
    ],
    "cards": [
        {
            "id": 1,
            "title": "task1",
            "board_id": 1,
            "status_id": 1,
            "order": 3
        },
        {
            "id": 8,
            "title": "task1.5",
            "board_id": 1,
            "status_id": 1,
            "order": 4
        },
        {
            "id": 2,
            "title": "task2",
            "board_id": 1,
            "status_id": 1,
            "order": 7
        },
        {
            "id": 3,
            "title": "task3",
            "board_id": 1,
            "status_id": 1,
            "order": 1
        },
        {
            "id": 4,
            "title": "task4",
            "board_id": 2,
            "status_id": 1,
            "order": 3
        },
        {
            "id": 5,
            "title": "task5",
            "board_id": 2,
            "status_id": 2,
            "order": 2
        },
        {
            "id": 6,
            "title": "task6",
            "board_id": 2,
            "status_id": 3,
            "order": 1
        },
        {
            "id": 7,
            "title": "task7",
            "board_id": 1,
            "status_id": 3,
            "order": 1
        }
    ]
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
    },

    getBoards: function (callback) {
        let boards = this._data['boards'];
        callback(boards)

        // the boards are retrieved and then the callback function is called with the boards
    },

    getBoard: function (boardId, callback) {
        for (let board of this._data.boards) {
            if (board.id === boardId) {
                callback(board)
            }
        }
        // the board is retrieved and then the callback function is called with the board
    },



    getStatuses: function (callback) {
        return this._data.statuses;


        // the statuses are retrieved and then the callback function is called with the statuses
    },

    getStatus: function (statusId, callback) {
        for (let status of this.data.statuses) {
            if (status.id === statusId) {
                callback(status)
            }
        }
        //let status = this._data['statuses']
    },



    getCardsByBoardId: function (boardId, callback) {
        let cards = this._data.cards;

        let cardsOfSpecificBoard = [];

        for (let i = 0; i < cards.length ; i++) {
            let card = cards[i];
            if (card.board_id === boardId ) {
                cardsOfSpecificBoard.push(card)
            }
        }
        callback(cardsOfSpecificBoard, boardId) //TODO: status, idToAppend, boardID);

        //cardsOfSpecificBoard = cardsOfSpecificBoard.sort(function(a,b){
         //   return a.order-b.order
       // })

        // the cards are retrieved and then the callback function is called with the cards
    },

    getCard: function (cardId, callback) {
        let cards = this._data['cards'];

        let specificCard = [];

        for (let i = 0; i < cards.length ; i++) {
            let card = cards[i];
            if (card.id === cardId ) {
                specificCard.push(card)
            }
        }
        callback(specificCard[0])
        // the card is retrieved and then the callback function is called with the card
    },



    createNewBoard: function (boardTitle, callback) {
        let id = this.generateId();
        let newBoardArray = [];
        let newBoard = {
            "id": id,
            "title": boardTitle,
            "is_active": true
        };
        this._data.boards.push(newBoard);
        newBoardArray.push(newBoard);
        this._saveData();

        callback(newBoardArray)

        // creates new board, saves it and calls the callback function with its data
    },

    deleteBoard: function (boardId) {
        let newBoardArray = [];
        for (let board of this._data.boards) {
            if (board.id !== boardId) {
                newBoardArray.push(board)
            }
        }
        this._data.boards = newBoardArray;
        this._saveData();
    },

    createNewCard: function (cardTitle, boardId, statusId, callback) {
        let id = this._data.cards.length + 1;
        let newCard = {
            "id": id,
            "title": cardTitle,
            "board_id": boardId,
            "status_id": statusId,

            "order": 0
        };
        this._data['cards'].push(newCard);
        this._saveData();
        callback(newCard);

        // creates new card, saves it and calls the callback function with its data
    },

    generateId: function (id=1) {
        for (let board of this._data.boards) {
            if (board.id === id) {
                id = this.generateId(id + 1);
                return id
            }
        }
        return id
    },

    changeCardStatus: function (cardId, statusId) {
        let cards = this._data['cards'];

        let specificCard = [];

        for (let card of cards) {
            if (card.id === parseInt(cardId) ) {
                specificCard.push(card)
            }
        }

        let cardToChange = specificCard[0];
        cardToChange.status_id = parseInt(statusId);
        this._saveData()
    },
    // here comes more features
};
