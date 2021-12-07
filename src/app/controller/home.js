// module.exports = (app) => {
//   return class Home extends app.Controller {
//     async index() {
//       const { ctx } = this;
//       ctx.body = 'hello world';
//     }
//   };
// };

module.exports = (app) => {
  return {
    async index() {
      console.log('app ==', app);
      const { ctx } = this;
      ctx.body = 'hello world';
    }
  };
};