var a = 0;
module.exports = function() {
    StructureSpawn.prototype.spawnHarvester = function (energy) {
        var numberOfParts = Math.floor(energy / 200);
        var body = [];
        let i = 0;
        while (i < numberOfParts) {
            body.push(WORK);
            body.push(CARRY);
            body.push(MOVE);
            i++;
        }
        var homeName = this.room.name;
        this.spawnCreep(body, "Harvester" + a, { memory: { role: "harvester", working: false, home: homeName } });
        a++;
    },
    StructureSpawn.prototype.spawnMiner = function (energy) {
        var numberOfParts = Math.floor(energy / 250);
        var body = [];
        let i = 0;
        while (i < numberOfParts) {
            body.push(WORK);
            body.push(MOVE)
            i++;
        }
        var homeName = this.room.name;
        this.spawnCreep(body, "Miner" + a, { memory: { role: "miner", working: false, home: homeName } });
        a++;
    },
    StructureSpawn.prototype.spawnUpgrader = function (energy) {
            var numberOfParts = Math.floor(energy / 200);
            var body = [];
            let i = 0;
            while (i < numberOfParts) {
                body.push(WORK);
                body.push(CARRY);
                body.push(MOVE);
                i++;
            }
        var homeName = this.room.name;
        this.spawnCreep(body, "Upgrader" + a, { memory: { role: "upgrader", working: false, home: homeName } });
            a++;
        },
    StructureSpawn.prototype.spawnLongHarvester = function (energy, target) {
            var numberOfParts = Math.floor(energy / 250);
            var body = [];
            let i = 0;
            while (i < numberOfParts) {
                body.push(WORK);
                body.push(CARRY);
                body.push(MOVE);
                body.push(MOVE);
                i++;
            }
            var homeName = this.room.name;
            this.spawnCreep(body, "LH" + a, { memory: { role: "longHarvester", working: false, home: homeName, target: target } });
            a++;
        },
    StructureSpawn.prototype.spawnRepairer = function (energy) {
            var numberOfParts = Math.floor(energy / 200);
            var body = [];
            let i = 0;
            while (i < numberOfParts) {
                body.push(WORK);
                body.push(CARRY);
                body.push(MOVE);
                i++;
            }
            this.spawnCreep(body, "Repairer" + a, { memory: { role: "repairer", working: false } });
            a++;
        },
    StructureSpawn.prototype.spawnWallRepairer = function (energy) {
            var numberOfParts = Math.floor(energy / 200);
            var body = [];
            let i = 0;
            while (i < numberOfParts) {
                body.push(WORK);
                body.push(CARRY);
                body.push(MOVE);
                i++;
            }
            this.spawnCreep(body, "WallRepairer" + a, { memory: { role: "wallRepairer", working: false } });
            a++;
        },
    StructureSpawn.prototype.spawnBuilder = function (energy) {
            var numberOfParts = Math.floor(energy / 200);
            var body = [];
            let i = 0;
            while (i < numberOfParts) {
                body.push(WORK);
                body.push(CARRY);
                body.push(MOVE);
                i++;
            }
        var homeName = this.room.name;
        this.spawnCreep(body, "Builder" + a, { memory: { role: "builder", working: false, home: homeName } });
            a++;
        },
    StructureSpawn.prototype.spawnDefender = function (energy, targetFlag) {
        var numberOfParts = Math.floor(energy / 290);
        var body = [];
        let i = 0;
        while (i < numberOfParts) {
            body.push(TOUGH);
            body.push(ATTACK);
            body.push(RANGED_ATTACK);
            body.push(MOVE);
            i++;
        }
        this.spawnCreep(body, "Defender" + a, { memory: { role: "defender", targetFlag: targetFlag} });
        a++;
        }; 
    StructureSpawn.prototype.spawnScout = function (energy) {
        var numberOfParts = Math.floor(energy / 50);
        var body = [];
        let i = 0;
        while (i < numberOfParts) {
            body.push(MOVE);
            i++;
        }
        this.spawnCreep(body, "Scout" + a, { memory: { role: "scout" } });
        a++;
    }; 
    StructureSpawn.prototype.spawnClaimer = function (energy, target) {
        var numberOfParts = Math.floor(energy / 650);
        var body = [];
        let i = 0;
        while (i < numberOfParts) {
            body.push(CLAIM)
            body.push(MOVE);
            i++;
        }
        var homeName = this.room.name;
        this.spawnCreep(body, "Claimer" + a, { memory: { role: "claimer", home: homeName, target: target } });
        a++;
    };
};
