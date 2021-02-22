


let mensagem = "Olá, mundo!"



interface User {
  id: number
  firstName: string
  lastName: string
  role: string
}

const user: User = {
  id: 0,
  firstName: 'Maria',
  lastName: 'Silva',
  role: 'Nenhma'
}



console.log(mensagem, user)






function updateUser(id: number, update: Partial<User>) {
  const user: User = getUser(id)
  const newUser = { ...user, ...update }
  saveUser(id, newUser)
}





console.log("numero")F
function getUser(id): User {
  return {} as User;
}
function saveUser(id, User) {

}

updateUser(0, {});