module.exports = function() {
    StructureTower.prototype.defend = function () {
        var target = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        // if one is found...
        if (target != undefined) {
            // ...FIRE!
            this.attack(target);
        }
    }
};