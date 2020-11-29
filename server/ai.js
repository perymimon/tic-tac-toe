const Arenas = require('./games')
const thinkingTime = 1000;

module.exports =
    function AI(user) {
        user.model.AI = true;
        user.arenas.observe(function (type, gameId) {
            const game = Arenas.get(gameId);
            const play = model => action(user, game, model)
            if (type === 'ADD') {
                game.model.observe(play)
            }
            if(type==='DELETE'){
                clearTimeout(user.playTimer);
                game.model.unobserve(play)
            }
        })
    }

function action(user, game, model) {
    const {stage, playersId, turn} = model;
    const userId = user.id;
    if (stage === 'INVITATION' && playersId[1] === userId) {
        game.approve(user.id);
        return;
    }
    if (stage === 'GAME' && userId === playersId[turn]) {
        user.playTimer = setTimeout(_ => {
            game.selectCell(userId, selectCell(model))
        }, thinkingTime)

        return
    }
    if(['END','CANCEL'].includes(stage)) {
        user.arenas.delete(game.id);
    }
}

function selectCell(model) {
    const {board} = model;
    const rows = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
        [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];
    // if 2 in the row are "1" and the third are '',
    // select the free space and win
    for (const row of rows) {
        const symbols = row.map(i => board[i]);
        if (symbols.join('') === '11') {
            // each index on the row are index on the board
            return row[symbols.indexOf('')];
        }
    }
    // if 2 in the row are "0" and the third are '',
    // select the free space and block
    for (const row of rows) {
        const symbols = row.map(i => board[i]);
        if (symbols.join('') === '00') {
            // each index on the row are index on the board
            return row[symbols.indexOf('')];
        }
    }
    // if center is free select it
    if (board[4] === '') return 4;

    //select the first free space
    return board.indexOf('');

}