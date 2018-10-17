// This function is to initialize the application

function init() {

    dataHandler.init();     // init data

    // loads the boards to the screen
    dom.setupCreateBoard()
    var x = dom.loadBoards();

    console.log(x);
    dom.showBoards(dom.loadBoards(), dataHandler.getStatuses());
}

init();
