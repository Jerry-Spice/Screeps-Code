var Rlimit = 10000;
var Wlimit = 0;
module.exports = function () {
    Creep.prototype.HarvesterRole = function () {
        //logic to switch the working method in the memory
        if (this.store.getFreeCapacity() == 0) {
            //if the capacity is free then work
            this.memory.working = true;
        } else if (this.store.getUsedCapacity() == 0) {
            //if the capacity is full put stuff back
            this.memory.working = false;
        }

        if (this.memory.working == false) {
            var sources = this.room.find(FIND_SOURCES);
            var droppedResources = this.room.find(FIND_DROPPED_RESOURCES);
            if (droppedResources) {
                if (this.pickup(droppedResources[0]) == ERR_NOT_IN_RANGE) {
                    this.moveTo(droppedResources[0]);

                }
            }
            if (this.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                this.moveTo(sources[0]);

            }
        }

        if (this.memory.working == true) {
            if (this.room.name != this.memory.home) {
                var exitDir = this.room.findExitTo(this.memory.home);
                var exit = this.pos.findClosestByRange(exitDir);
                this.moveTo(exit);
            } else {
                var targets = this.room.find(FIND_STRUCTURES, {
                    filter: (s) =>
                        (s.structureType == STRUCTURE_EXTENSION && s.energy < s.energyCapacity)
                        || (s.structureType == STRUCTURE_TOWER && s.energy < s.energyCapacity)
                        || (s.structureType == STRUCTURE_SPAWN && s.energy < s.energyCapacity)
                });
                var target = this.pos.findClosestByRange(targets);
                if (target != undefined) {
                    if (this.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        this.moveTo(target);
                    }
                } else if (target == undefined) {
                    if (this.transfer(this.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        this.moveTo(target);
                    }
                } else {
                    this.RepairerRole();
                }
            }
        }
    },
    Creep.prototype.MinerRole = function () {
        if (this.room.name != this.memory.home) {
            var exitDir = this.room.findExitTo(this.memory.home);
            var exit = this.pos.findClosestByRange(exitDir);
            this.moveTo(exit);
        } else {
            var sources = this.room.find(FIND_SOURCES);
            if (this.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                this.moveTo(sources[0]);
            }
        }
    },
    Creep.prototype.UpgraderRole = function () {
            if (this.store.getFreeCapacity() == 0) {
                this.memory.working = true;
            } else if (this.store.getUsedCapacity() == 0) {
                this.memory.working = false;
            }

            if (this.memory.working == false) {
                var sources = this.room.find(FIND_SOURCES);
                var containers = this.room.find(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_CONTAINER });
                var dropped = this.room.find(FIND_DROPPED_RESOURCES);
                if (dropped[0]) {
                    if (this.pickup(dropped[0]) == ERR_NOT_IN_RANGE) {
                        this.moveTo(dropped[0]);
                    }
                } else if (containers[0]) {
                    if (this.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        this.moveTo(containers[0]);
                    }
                } else if (this.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    this.moveTo(sources[0]);
                }
            }
        if (this.memory.working == true) {
            if (this.room.name != this.memory.home) {
                var exitDir = this.room.findExitTo(this.memory.home);
                var exit = this.pos.findClosestByRange(exitDir);
                this.moveTo(exit);
            } else {
                if (this.room.controller.sign.text != "Jerry Spice Claims this room!") {
                    if (this.signController(this.room.controller, "Jerry Spice Claims this room!") == ERR_NOT_IN_RANGE) {
                        this.moveTo(this.room.controller);
                    }
                } else if (this.upgradeController(this.room.controller) == ERR_NOT_IN_RANGE) {
                    this.moveTo(this.room.controller);
                }
            }
            }
        },
    Creep.prototype.LongHarvesterRole = function () {

            if (this.store.getFreeCapacity() == 0) {
                this.memory.working = true;
            } else if (this.store.getUsedCapacity() == 0) {
                this.memory.working = false;
            }

            if (this.memory.working == false) {

                if (this.room.name != this.memory.target) {
                    var exitDir = this.room.findExitTo(this.memory.target);
                    var exit = this.pos.findClosestByRange(exitDir);
                    this.moveTo(exit);
                }
                if (this.room.name == this.memory.target) {
                    var sources = this.room.find(FIND_SOURCES);
                    if (this.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        this.moveTo(sources[0]);
                    }
                }
            }
            if (this.memory.working == true) {
                if (this.room.name != this.memory.home) {
                    var exitDir = this.room.findExitTo(this.memory.home);
                    var exit = this.pos.findClosestByRange(exitDir);
                    this.moveTo(exit);
                }
                if (this.room.name == this.memory.home) {
                    var storageSpots = this.room.find(FIND_STRUCTURES, {
                        filter: (s) =>
                            (s.structureType == STRUCTURE_EXTENSION
                                || s.structureType == STRUCTURE_CONTAINER
                                || s.structureType == STRUCTURE_TOWER)
                            && s.energy < s.energyCapacity
                    })
                    if (this.transfer(storageSpots[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        this.moveTo(storageSpots[0]);
                    } else {
                            this.BuilderRole();
                        }
                    }
                }
        },
    Creep.prototype.BuilderRole = function () {

            if (this.store.getFreeCapacity() == 0) {
                this.memory.working = true;
            } else if (this.store.getUsedCapacity() == 0) {
                this.memory.working = false;
            }
        if (this.memory.working == false) {
            var sources = this.room.find(FIND_SOURCES);
            var containers = this.room.find(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_CONTAINER })
            var dropped = this.room.find(FIND_DROPPED_RESOURCES);
            if (dropped[0]) {
                if (this.pickup(dropped[0]) == ERR_NOT_IN_RANGE) {
                    this.moveTo(dropped[0]);
                }
            } else if (containers[0]) {
                if (this.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.moveTo(containers[0]);
                }
            } else if (this.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                this.moveTo(sources[0]);
            }
        }
        if (this.memory.working == true) {
            if (this.room.name != this.memory.home) {
                var exitDir = this.room.findExitTo(this.memory.home);
                var exit = this.pos.findClosestByRange(exitDir);
                this.moveTo(exit);
            } else {
                var sites = this.room.find(FIND_CONSTRUCTION_SITES);
                if (sites[0]) {
                    if (this.build(sites[0]) == ERR_NOT_IN_RANGE) {
                        this.moveTo(sites[0]);
                    }
                } else {
                    this.UpgraderRole();
                }
            }
        }
    },
    Creep.prototype.RepairerRole = function () {
            if (this.store.getFreeCapacity() == 0) {
                this.memory.working = true;
            } else if (this.store.getUsedCapacity() == 0) {
                this.memory.working = false;
            }

        if (this.memory.working == false) {
            var sources = this.room.find(FIND_SOURCES);
            var containers = this.room.find(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_CONTAINER })
            if (containers[0]) {
                if (this.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.moveTo(containers[0]);
                }
            } else if (this.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                this.moveTo(sources[0]);
            }
        }
        if (this.memory.working == true) {
            // find closest structure with less than max hits
            // Exclude walls because they have way too many max hits and would keep
            // our repairers busy forever. We have to find a solution for that later.
            var structure = this.pos.findClosestByPath(FIND_STRUCTURES, {
                // the second argument for findClosestByPath is an object which takes
                // a property called filter which can be a function
                // we use the arrow operator to define it
                filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
            });

            // if we find one
            if (structure != undefined) {
                // try to repair it, if it is out of range
                if (this.repair(structure) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    this.moveTo(structure);
                }
            }
            // if we can't fine one
            else {
                // look for construction sites
                this.BuilderRole();
            }
        }
        },
    Creep.prototype.WallRepairerRole = function () {
        if (this.store.getFreeCapacity() == 0) {
            this.memory.working = true;
        } else if (this.store.getUsedCapacity() == 0) {
            this.memory.working = false;
        }

        if (this.memory.working == false) {
            var sources = this.room.find(FIND_SOURCES);
            var containers = this.room.find(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_CONTAINER })
            if (containers[0]) {
                if (this.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.moveTo(containers[0]);
                }
            } else if (this.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                this.moveTo(sources[0]);
            }
        }
        if (this.memory.working == true) {
            var walls = this.room.find(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_WALL
            });

            var target = undefined;

            // loop with increasing percentages
            for (let percentage = 0.0001; percentage <= 1; percentage = percentage + 0.0001){
                // find a wall with less than percentage hits
                for (let wall of walls) {
                    if (wall.hits / wall.hitsMax < percentage) {
                        target = wall;
                        break;
                    }
                }

                // if there is one
                if (target != undefined) {
                    // break the loop
                    break;
                }
            }

            // if we find a wall that has to be repaired
            if (target != undefined) {
                // try to repair it, if not in range
                if (this.repair(target) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    this.moveTo(target);
                }
            }
            // if we can't fine one
            else {
                // look for construction sites
                this.BuilderRole();
            }
        }
    }, 
    Creep.prototype.DefenderRole = function () {
        var enemies = this.room.find(FIND_HOSTILE_CREEPS);
        if (enemies[0]) {
            var closestEnemy = this.pos.findClosestByRange(enemies);
            if (this.rangedAttack(closestEnemy) == ERR_NOT_IN_RANGE && this.attack(closestEnemy) == ERR_NOT_IN_RANGE) {
                this.moveTo(closestEnemy);
            }
        } else {
            this.moveTo(Game.flags[this.memory.targetFlag]);
        }
        };
    Creep.prototype.ScoutRole = function () {
        var flags = this.room.find(FIND_FLAGS);
        if (flags[0]) {
            if (this.pos == flags[0].pos) {
                flags[0].remove();
            } else {
                this.moveTo(flags[0]);
            }
        }
    };
    Creep.prototype.ClaimerRole = function () {
        if (this.room.name != this.memory.target) {
            var exitDir = this.room.findExitTo(this.memory.target);
            var exit = this.pos.findClosestByRange(exitDir);
            this.moveTo(exit);
        } else if (this.room.name == this.memory.target) {
            if (this.room.controller.sign.text != "Jerry Spice Claims this room!") {
                if (this.signController(this.room.controller, "Jerry Spice Claims this room!") == ERR_NOT_IN_RANGE) {
                    this.moveTo(this.room.controller);
                }
            } else if (this.claimController(this.room.controller) == ERR_NOT_IN_RANGE) {
                this.moveTo(this.room.controller);
            }
        }
    };
};
