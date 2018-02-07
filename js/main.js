import { Point } from './Point';
import { Organism } from './Organism';

const canvas = document.querySelector('#canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context2d = canvas.getContext('2d');

const DEBUG_MODE = true;

let world = [];

const worldConfiguration = [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,1,1,1,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
];

const BLOCK_SIZE = 15;
const MARGIN = 10;
const OUTSIDE_MARGIN = 30;

for (let rowIndex = 0; rowIndex < worldConfiguration.length; rowIndex++) {
    const row = worldConfiguration[rowIndex];
    let worldRow = [];

    for (let colIndex = 0; colIndex < row.length; colIndex++) {
        const alive = row[colIndex];

        const x = OUTSIDE_MARGIN + colIndex * (BLOCK_SIZE + MARGIN);
        const y = OUTSIDE_MARGIN + rowIndex * (BLOCK_SIZE + MARGIN);

        const o = new Organism(context2d, new Point(x, y), BLOCK_SIZE);
        o.setAlive(alive);

        worldRow.push(o);
    }
    world.push(worldRow);
}

update();
if (DEBUG_MODE) {
    document.body.addEventListener('click', tick.bind(this));
} else {
    setInterval(tick, 1500);
}

/**
 * Update all organisms with their state
 */
function determineWorldState() {
    let newWorld = [];

    for(let rowIndex = 0; rowIndex < world.length; rowIndex++) {
        let newRow = [];

        for(let columnIndex = 0; columnIndex < world[rowIndex].length; columnIndex++) {
            let organism = world[rowIndex][columnIndex];

            const numberSurroundingAlive = checkSurroundings(rowIndex, columnIndex);

            if (organism.isAlive() === false && numberSurroundingAlive === 3) {
                newRow.push(1);
            } else {
                if (numberSurroundingAlive < 2 || numberSurroundingAlive > 3) {
                    newRow.push(0);
                } else {
                    newRow.push(organism.isAlive() ? 1 : 0);
                }
            }
        }

        newWorld.push(newRow);
    }
    
    for (let rowIndex = 0; rowIndex < newWorld.length; rowIndex++) {
        const row = newWorld[rowIndex];
    
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            world[rowIndex][colIndex].setAlive(newWorld[rowIndex][colIndex] === 1);
        }
    }
}

/**
 *
 * @param {integer} rowIndex
 * @param {integer} columnIndex
 * @returns {bool}
 */
function checkSurroundings(rowIndex, columnIndex) {
    let surroundingLivingOrganisms = 0;

    //NW
    surroundingLivingOrganisms += checkPosition(rowIndex - 1, columnIndex - 1);
    //N
    surroundingLivingOrganisms += checkPosition(rowIndex - 1, columnIndex);
    //NE
    surroundingLivingOrganisms += checkPosition(rowIndex - 1, columnIndex + 1);
    //W
    surroundingLivingOrganisms += checkPosition(rowIndex, columnIndex - 1);
    //E
    surroundingLivingOrganisms += checkPosition(rowIndex, columnIndex + 1);
    //SW
    surroundingLivingOrganisms += checkPosition(rowIndex + 1, columnIndex - 1);
    //S
    surroundingLivingOrganisms += checkPosition(rowIndex + 1, columnIndex);
    //SE
    surroundingLivingOrganisms += checkPosition(rowIndex + 1, columnIndex + 1);

    return surroundingLivingOrganisms;
}

/**
 * 
 * @param {integer} rowIndex 
 * @param {integer} columnIndex 
 */
function checkPosition(rowIndex, columnIndex) {
    if (rowIndex < 0 || columnIndex < 0 || rowIndex >= world.length || columnIndex >= world[rowIndex].length) {
        return 0;
    }

    const item = world[rowIndex][columnIndex];
    return (item.isAlive()) ? 1 : 0;
}

/**
 * Update render of the world
 */
function update() {
    for(const row of world) {
        for(const organism of row) {
            organism.draw();
        }
    }
}

function tick() {
    determineWorldState();
    update();
}