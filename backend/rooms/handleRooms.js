const db = require('../mongo');

const handleRooms = {
    createRoom: async (data) => {
        const collection = db.dbo.collection('rooms');
        try {
            await collection.updateOne({ name: data.name }, { $set: { inside: [...data.users], messages: [] } }, { upsert: true });
        } catch (err) {
            return { error: err, msg: 'Error creating room! You got placed back in matching!' };
        }
    },
    getDeleteRoom: async (id, soc) => {
        const collection = db.dbo.collection('rooms');
        let deleted;
        try {
            deleted = await collection.findOneAndDelete({ name: { $eq: id }, inside: { $in: [soc] } })
        } catch (err) {
            console.log(err, "ERROR");
        }
        if (deleted) {
            return deleted;
        }
    },
    removeRoom: async (id) => {
        const collection = db.dbo.collection('rooms');

        try {
            await collection.deleteOne({ name: id });
        } catch (err) {
            console.log(err, "Error removing room!")
        }
        return false;
    },
    inAnyRoom: async (socs) => {
        const collection = db.dbo.collection('rooms');
        let room;

        try {
            room = await collection.find({ inside: { $in: socs } });
        } catch (err) {
            return { error: err, msg: 'Error finding user in room!' };
        }
        if (room) {
            return room;
        };
    }
};

module.exports = handleRooms;