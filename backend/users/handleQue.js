const db = require('../mongo');
const moment = require('moment');

const handleQue = {
    addToQue: async (user) => {
        const collection = db.dbo.collection('que');
        try {
            await collection.updateOne({ chatID: user.chatID }, { $set: { interests: user.interests, nt: false, time: moment().valueOf(), status: true, soc: user.soc } }, { upsert: true });
        } catch (err) {
            return { error: err, msg: 'Error adding you to the queque!' };
        }
        return false;
    },
    removeOneFromQue: async (id) => {
        const collection = db.dbo.collection('que');
        try {
            await collection.deleteOne({ chatID: id })
        } catch (err) {
            return { error: err, msg: 'Error removing you from the queque!' }
        }
        return false;
    },
    isInQue: async (id) => {
        let inQue = false;
        let nt = false;
        const collection = db.dbo.collection('que');
        let found;

        try {
            found = await collection.findOne(
                { chatID: id }
            );
        } catch (err) {
            console.log(err, 'Failed to get!');
        };

        if (found) {
            inQue = true;
            nt = found.nt
        };
        return { inQue: inQue, nt: nt };
    },
    fetchBestMatch: async (user, any) => {
        const collection = db.dbo.collection('que');

        if (!any) {
            if (user.interests.length > 0) {
                try {
                    return await collection.find({ interests: { $in: user.interests }, soc: { $nin: [user.soc] }, status: { $eq: false } });
                } catch (err) {
                    console.log(err, "ERROR");
                };
            } else {
                try {
                    return await collection.find({ interests: { $exists: true, $size: 0 }, soc: { $nin: [user.soc] }, status: { $eq: false } });
                } catch (err) {
                    console.log(err, "ERROR");
                };
            }
        } else {
            try {
                return await collection.find({ nt: { $eq: true }, status: { $eq: false } }).sort({ time: 1 });
            } catch (err) {
                console.log(err, "ERROR");
            };
        };
    },
    bePairable: async (id) => {
        const collection = db.dbo.collection('que');

        try {
            await collection.updateOne({ chatID: id }, { $set: { nt: true } });
        } catch (err) {
            console.log(err, "ERROR");
        };
    },
    setQueStatus: async (id, status) => {
        const collection = db.dbo.collection('que');

        try {
            await collection.updateOne({ chatID: id }, { $set: { status: status } });
        } catch (err) {
            console.log(err, "ERROR");
        };
    }
};

module.exports = handleQue;