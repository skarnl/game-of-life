import { Point } from './Point';
import { Organism } from './Organism';

const canvas = document.querySelector('#canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context2d = canvas.getContext('2d');

const DEBUG_MODE = false;

//a seperate const, so we COULD overwrite it if we want to
const DRAW_NUMBERS = DEBUG_MODE;

let world = [];

const worldConfiguration = [
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,1,1,1,0],
    [0,1,1,1,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
];

const BLOCK_SIZE = 15;
const MARGIN = 7;
const OUTSIDE_MARGIN = 30;
const UPDATE_TICK_TIME = 700;

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

draw();
determineWorldState();
drawNumbers();

if (DEBUG_MODE) {
    document.body.addEventListener('click', tick.bind(this));
} else {
    setInterval(tick, UPDATE_TICK_TIME);
}

/**
 * Update all organisms with their state
 */
function determineWorldState() {
    for(let rowIndex = 0; rowIndex < world.length; rowIndex++) {

        for(let columnIndex = 0; columnIndex < world[rowIndex].length; columnIndex++) {
            const organism = world[rowIndex][columnIndex];
            organism.setNumberSurrounding(checkSurroundings(rowIndex, columnIndex));
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
function draw() {
    for(const row of world) {
        for(const organism of row) {
            organism.setAlive(shouldOrganismBeAlive(organism));
            organism.draw();
        }
    }
}

function drawNumbers() {
    if (DRAW_NUMBERS) {
        for(const row of world) {
            for(const organism of row) {
                organism.drawNumbers();
            }
        }
    }
}

/**
 * 
 * @param {Organism} organism 
 */
function shouldOrganismBeAlive(organism) {
    //this is the initial draw
    if (organism.getNumberSurrounding() === null) {
        return organism.isAlive();
    }
    
    if (organism.isAlive()) {
        if (organism.getNumberSurrounding() === 2 || organism.getNumberSurrounding() === 3) {
            return true;
        } else {
            return false;
        }
    } else if (organism.getNumberSurrounding() === 3) {
        return true;
    } else {
        return false;
    }
}

function tick() {
    draw();
    determineWorldState();
    drawNumbers();
}
