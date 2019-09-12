const {forwardTo} = require('prisma-binding');

const Query = {
    // dog(parentValue, args, context, info){
    //     global.dog = global.dog || []
    //     return global.dog
    // }
    // async getItem(parentValue, args, context, info) {
    //     const item = await context.db.query.items();
    //     return item
    // }
    items: forwardTo('db'),
    item: forwardTo('db'),
    itemsConnection:forwardTo('db')
};

module.exports = Query;
