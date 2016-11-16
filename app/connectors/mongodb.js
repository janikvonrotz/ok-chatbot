import Mongoose from 'mongoose';
import config from '../../config';

Mongoose.Promise = global.Promise;
const mongo = Mongoose.connect(`mongodb://${config.MONGODB.USER}@${config.MONGODB.URL}`);

var Deals = mongo.model('Deals', {
    title: String,
    description: String,
    productDetails: String,
    itemUrl: String,
    imageUrl: String,
    qrImageUrl: String,
    pointOfSale: [String],
    categoryId: {type: mongo.Schema.ObjectId, ref : 'Categories' },
    publishAt: Date,
    expiresAt: Date,
    createdAt: Date
});

var Users = mongo.model('User', {
    facebookId: String,
    firstName: String,
    lastName: String,
    gender: String,
    enabledNotifications: [String],
    savedDeals: [{type : mongo.Schema.ObjectId, ref : 'Deals' }],
    foundPokes: [Number]
});

var Categories = mongo.model('Categories', {
    label: String
});

export { Deals, Users, Categories };
