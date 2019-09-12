const Mutations = {
    // createDog(parent, args, context, info){
    //     global.dog = global.dog || []
    //     const newDog = {name: args.name}
    //     global.dog.push(newDog)
    //     return newDog;
    // }
    async createItem(parent, args, context, info) {
        // TOD: check if they are logged in

        const item = await context.db.mutation.createItem({ 
            data:{...args}
        }, info);
        return item;
    },
    updateItem(parent, args, context, info) {
        const update = {...args}
        delete update.id;
        return context.db.mutation.updateItem({
            data: update,
            where: {id:args.id}
        }, info)
    },
    async deleteItem(parent, args, context, info) {
        const where = {id: args.id};
        // find the item
        const item = await context.db.query.item({where},`{id title}`)
        // check if user has permission to delete the item
        // TODO
        // delete the item
        return context.db.mutation.deleteItem({where}, info);
    }
};

module.exports = Mutations;
