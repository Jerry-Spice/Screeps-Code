//Importing Files for the creeps, spawns, and towers
require("prototype.creep")();
require("prototype.spawn")();
require("prototype.tower")();

//room swapper for the long harvesters
// when a LH spawns it needs a target room and it gets it from this arrary.
var targetRooms = ["E3N9"];
var targetRoomSwapper = 0;

//target flag swapper for defenders
// when a defender spawns it looks for its target flag that it gets from this array.
var targetFlags = ["P1", "P2"];
var targetFlagSwapper = 0;

//variables to track the number of each role
var numberOfHarvesters;
var numberOfMiners;
var numberOfUpgraders;
var numberOfLongHarvesters;
var numberOfRepairers;
var numberOfWallRepairers;
var numberOfBuilders;
var numberOfDefenders;

//Old variables to track the numbers for how many of each role could exist.
//The tracking system for that is now stored in the memory of the spawns.
/*
var maxHarvesters = 4;
var maxMiners = 0;
var maxUpgraders = 2;
var maxLongHarvesters = 2;
var maxRepairers = 2;
var maxWallRepairers = 1;
var maxBuilders = 1;
var minDefenders = 2;
*/

module.exports.loop = function () {
    //for loop to keep the used memory down
    // looks through the Creeps list in Memory
    for (let name in Memory.creeps) {
        // if one of the creeps found doesnt exist anymore
        if (Game.creeps[name] == undefined) {
            // if its because there are no creeps
            if (Game.creeps.length == 0) {
                // spawn a harvester
                Game.spawns["Spawn1"].spawnHarvester(300);
            } else { // otherwise just remove that creep's data
                delete Memory.creeps[name];
            }
        }
    }
    // find all the structures and filter out only the towers
    var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
    // for loop to run the defense code for each tower
    for (let i in towers) {
        // towers defend
        towers[i].defend();
    }
    
    // for loop to loop through all the creeps that are alive
    for (let name in Game.creeps) {
        // setting a creep variable for convenience
        var creep = Game.creeps[name];
        //extra code to have the creeps say how fatigued they are
        //var fatigueAmount = creep.fatigue;
        //creep.say(fatigueAmount);
        //if the creep's role is harvester then do harvester work, if miner role then miner work etc.
        if (creep.memory.role == "harvester") {
            creep.HarvesterRole();
        }
        if (creep.memory.role == "miner") {
            creep.MinerRole();
        }
        if (creep.memory.role == "upgrader") {
            creep.UpgraderRole();
        }
        if (creep.memory.role == "longHarvester") {
            creep.LongHarvesterRole();
        }
        if (creep.memory.role == "repairer") {
            creep.RepairerRole();
        }
        if (creep.memory.role == "wallRepairer") {
            creep.WallRepairerRole();
        }
        if (creep.memory.role == "builder") {
            creep.BuilderRole();
        }
        if (creep.memory.role == "defender") {
            creep.DefenderRole();
        }
        if (creep.memory.role == "scout") {
            creep.ScoutRole();
        }
        if (creep.memory.role == "claimer") {
            creep.ClaimerRole();
        }
    }
    // for loop to loop through all the possible spawns
    for (let SpawnName in Game.spawns) {
        // variables for convenience to have spawn as the current spawn
        // maxEnergy as the total amount of energy the spawn is able to use
        var spawn = Game.spawns[SpawnName];
        var maxEnergy = Game.spawns[SpawnName].room.energyAvailable;

        // trackers to find how many of each role is currently alive
        // there are some bugs, for example the repairers will not track accurately if the && is in with it
        numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == "harvester" && c.room.name == spawn.room.name);
        numberOfMiners = _.sum(Game.creeps, (c) => c.memory.role == "miner" && c.room.name == spawn.room.name);
        numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == "upgrader" && c.room.name == spawn.room.name);
        numberOfLongHarvesters = _.sum(Game.creeps, (c) => c.memory.role == "longHarvester" && c.memory.home == spawn.room.name);
        numberOfRepairers = _.sum(Game.creeps, (c) => c.memory.role == "repairer");
        numberOfWallRepairers = _.sum(Game.creeps, (c) => c.memory.role == "wallRepairer" && c.room.name == spawn.room.name);
        numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == "builder" && c.room.name == spawn.room.name);
        numberOfDefenders = _.sum(Game.creeps, (c) => c.memory.role == "defender" && c.room.name == spawn.room.name);
        
        //logic to determine priority and spawn the necesary creeps.
        // priority:
        /* 1. Harvester
           2. Miner
           3. Upgrader
           4. Long Harvester
           5. Repairer
           6. Wall Repairer
           7. Builder
           8. Defender
        */
        if (numberOfHarvesters < spawn.memory.maxHarvesters) {
            spawn.spawnHarvester(maxEnergy);
        } else if (numberOfMiners < spawn.memory.maxMiners) {
            spawn.spawnMiner(maxEnergy);
        } else  if (numberOfUpgraders < spawn.memory.maxUpgraders) {
           spawn.spawnUpgrader(maxEnergy);
        } else if (numberOfLongHarvesters < spawn.memory.maxLongHarvesters) {
            spawn.spawnLongHarvester(maxEnergy, targetRooms[targetRoomSwapper]);
            targetRoomSwapper++;
            if (targetRoomSwapper > (targetRooms.length - 1)) {
                targetRoomSwapper = 0;
            }
        } else if (numberOfRepairers < spawn.memory.maxRepairers) {
            spawn.spawnRepairer(maxEnergy);
        } else if (numberOfWallRepairers < spawn.memory.maxWallRepairers) {
            spawn.spawnWallRepairer(maxEnergy);
        } else if (numberOfBuilders < spawn.memory.maxBuilders) {
            spawn.spawnBuilder(maxEnergy);
        } else if (numberOfDefenders < spawn.memory.minDefenders) {
            spawn.spawnDefender(maxEnergy, targetFlags[targetFlagSwapper]);
            targetFlagSwapper++;
            if (targetFlagSwapper > targetFlags.length - 1) {
                targetFlagSwapper = 0;
            }
        }
    }
}
