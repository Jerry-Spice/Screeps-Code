require("prototype.creep")();
require("prototype.spawn")();
require("prototype.tower")();

var targetRooms = ["E3N9"];
var targetRoomSwapper = 0;

var targetFlags = ["P1", "P2"];
var targetFlagSwapper = 0;


var numberOfHarvesters;
var numberOfMiners;
var numberOfUpgraders;
var numberOfLongHarvesters;
var numberOfRepairers;
var numberOfWallRepairers;
var numberOfBuilders;
var numberOfDefenders;

var maxHarvesters = 4;
var maxMiners = 0;
var maxUpgraders = 2;
var maxLongHarvesters = 2;
var maxRepairers = 2;
var maxWallRepairers = 1;
var maxBuilders = 1;
var minDefenders = 2;


module.exports.loop = function () {
    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            if (Game.creeps.length == 0) {
                Game.spawns["Spawn1"].spawnHarvester(300);
            } else {
                delete Memory.creeps[name];
            }
        }
    }

    var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
    // for each tower
    for (let i in towers) {
        // run tower logic
        towers[i].defend();
    }
    

    for (let name in Game.creeps) {
        var creep = Game.creeps[name];
        var fatigueAmount = creep.fatigue;
        //creep.say(fatigueAmount);
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
    for (let SpawnName in Game.spawns) {
        var spawn = Game.spawns[SpawnName];
        var maxEnergy = Game.spawns[SpawnName].room.energyAvailable;


        numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == "harvester" && c.room.name == spawn.room.name);
        numberOfMiners = _.sum(Game.creeps, (c) => c.memory.role == "miner" && c.room.name == spawn.room.name);
        numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == "upgrader" && c.room.name == spawn.room.name);
        numberOfLongHarvesters = _.sum(Game.creeps, (c) => c.memory.role == "longHarvester" && c.memory.home == spawn.room.name);
        numberOfRepairers = _.sum(Game.creeps, (c) => c.memory.role == "repairer");
        numberOfWallRepairers = _.sum(Game.creeps, (c) => c.memory.role == "wallRepairer" && c.room.name == spawn.room.name);
        numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == "builder" && c.room.name == spawn.room.name);
        numberOfDefenders = _.sum(Game.creeps, (c) => c.memory.role == "defender" && c.room.name == spawn.room.name);
        
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
