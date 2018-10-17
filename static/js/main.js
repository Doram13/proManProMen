// This function is to initialize the application

function init() {

    dataHandler.init();     // init data

    // loads the boards to the screen

    dom.showBoards(dom.loadBoards(), dataHandler.getStatuses());
    dom.setupCreateBoard()
}

init();
