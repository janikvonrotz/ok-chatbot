import { Deals, Categories, Users, Profile } from '../connectors';

// don't export
var self = {}
// export
const queries = {}
let now = new Date();
let yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

queries.getCountedCategories = () => new Promise((resolve, reject) => {
  Deals.aggregate([
      {$match:
          { $and: [ { expiresAt: { $gt: yesterday } }, { publishAt: { $lt: now } } ] }},
      {$lookup: {
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category'
      }},
      {$group: {
          _id: { label: '$category.label', category: '$categoryId' },
          count: { $sum: 1 }
      }},
      { $sort : { '_id.label' : 1 } }
  ], (error, categories) => {
      if(error) {
          reject(error);
      } else {
          resolve(categories);
      }
  });
});

queries.getUser = (user) => new Promise((resolve, reject) => {
  Users.findOne({facebookId: user}, (error, dbuser) => {
      if(error) {
          reject(error);
      } else {
          if(dbuser !== null) {
              resolve(dbuser);
          } else {
              self.saveProfile(user, resolve, reject);
          }
      }
  });
});

queries.getDealsById = (dealIds) => new Promise((resolve, reject) => {
    let now = new Date();
    let yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    let match = {
      publishAt: { $lt: now },
      expiresAt: { $gt: yesterday }
    };
    Deals.find(match)
        .where('_id')
        .in(dealIds)
        .exec((error, deals) => {
          if(error) {
              reject(error);
          } else {
              resolve(deals);
          }
    });
});

self.saveProfile = (user, resolve, reject) => {
  Profile.get(user, (error, response, body) => {
    if (error) {
      reject(error);
    } else {
      let profile = JSON.parse(body);
      Users.create({
        facebookId: user,
        firstName: profile.first_name,
        lastName: profile.last_name,
        gender: profile.gender,
        enabledNotifications: ["new_deals", "saved_deals_expire"],
        foundPokes: [],
      }, (error, user) => {
        if(error) {
          reject(error);
        } else {
          user = user.toObject();
          user.isNew = true;
          resolve(user);
        }
      });
    }
  });
}

export default queries;
