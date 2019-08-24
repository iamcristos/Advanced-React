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
    }
};

module.exports = Mutations;
