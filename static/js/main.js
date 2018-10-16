// This function is to initialize the application

function init() {
    dataHandler.init();     // init data

    var x = dom.loadBoards();
    console.log(x);

    dom.showBoards(dom.loadBoards());
    // loads the boards to the screen

}

init();
