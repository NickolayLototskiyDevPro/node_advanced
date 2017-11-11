class User {
    constructor (name, surname) {
        this.name = name;
        this.surname = surname;
      }
}
  
const UserProxy = new Proxy(User, {
    construct: function(target, argumentsList) {
      console.log(`Constructor Invokes With Arguments: ${argumentsList}`);
      const instance = new target(...argumentsList);
      instance.fullName = argumentsList.join(' ');
      
      return instance;
    }
});
  
const user = new UserProxy('Nick', 'Lototskiy');
console.log(user.fullName); 